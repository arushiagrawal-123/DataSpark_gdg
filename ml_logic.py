import pandas as pd
import re

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler
from scipy.sparse import hstack


# ---------------- Text Cleaning ----------------
def clean_text(text):
    if pd.isna(text):
        return ""
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def extract_location(text):
    if pd.isna(text):
        return "Unknown"
    match = re.search(r'near\s+(.*)', text.lower())
    return match.group(1) if match else "Unknown"


# ---------------- Main ML Pipeline ----------------
def run_smart_campus_pipeline(df):
    """
    Production-safe Smart Campus ML pipeline.
    Takes a dataframe and returns enriched dataframe
    with priority, severity, and hotspot info.
    """

    df = df.copy()

    # ---------- Case 1: Text-based complaints dataset ----------
    required_cols = {'description', 'repeat_count', 'unsafe_flag'}

    if required_cols.issubset(df.columns):

        # Clean text
        df['clean_description'] = df['description'].apply(clean_text)

        # TF-IDF
        tfidf = TfidfVectorizer(
            max_features=3000,
            ngram_range=(1, 2),
            stop_words='english'
        )
        X_text = tfidf.fit_transform(df['clean_description'])

        # Numeric features
        df['repeat_count'] = pd.to_numeric(df['repeat_count'], errors='coerce').fillna(0)
        df['unsafe_flag'] = pd.to_numeric(df['unsafe_flag'], errors='coerce').fillna(0)

        X_numeric = df[['repeat_count', 'unsafe_flag']].astype(float).values
        X = hstack([X_text, X_numeric])

        # Clustering
        kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
        df['cluster'] = kmeans.fit_predict(X)

        # Priority mapping
        cluster_priority = (
            df.groupby('cluster')[['repeat_count', 'unsafe_flag']]
            .mean()
            .sum(axis=1)
            .sort_values()
        )

        priority_map = {
            cluster_priority.index[0]: 'Low',
            cluster_priority.index[1]: 'Medium',
            cluster_priority.index[2]: 'High'
        }

        df['priority_label'] = df['cluster'].map(priority_map)

        # Location + severity
        df['location'] = df['description'].apply(extract_location)

        priority_weight = {'Low': 1, 'Medium': 2, 'High': 3}
        df['severity_score'] = df['priority_label'].map(priority_weight)

        hotspot_df = df.groupby('location').agg(
            total_issues=('description', 'count'),
            repeat_sum=('repeat_count', 'sum'),
            unsafe_sum=('unsafe_flag', 'sum'),
            severity_sum=('severity_score', 'sum')
        ).reset_index()

        hotspot_df['hotspot_score'] = (
            0.4 * hotspot_df['severity_sum'] +
            0.3 * hotspot_df['repeat_sum'] +
            0.3 * hotspot_df['unsafe_sum']
        )

        scaler = MinMaxScaler()
        hotspot_df['hotspot_score'] = scaler.fit_transform(
            hotspot_df[['hotspot_score']]
        )

        threshold = hotspot_df['hotspot_score'].quantile(0.75)
        hotspot_df['is_hotspot'] = hotspot_df['hotspot_score'] >= threshold

        return hotspot_df.sort_values(by='hotspot_score', ascending=False)

    # ---------- Case 2: ML / Image-service numeric input ----------
    elif {'feature1', 'feature2'}.issubset(df.columns):

        df['hotspot_score'] = df['feature1'] * 0.6 + df['feature2'] * 0.4
        df['is_hotspot'] = df['hotspot_score'] >= 0.5

        df['priority'] = df['hotspot_score'].rank(ascending=False)
        df['severity'] = pd.cut(
            df['hotspot_score'],
            bins=[-1, 0.3, 0.6, 1],
            labels=['Low', 'Medium', 'High']
        )

        return df

    # ---------- Unsupported input ----------
    else:
        raise ValueError("Input DataFrame does not have required columns.")
