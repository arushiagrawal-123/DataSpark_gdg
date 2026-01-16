import pandas as pd
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler
from scipy.sparse import hstack

def clean_text(text):
    if pd.isna(text):
        return ""
    text = str(text).lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    return re.sub(r'\s+', ' ', text).strip()

def extract_location(text):
    match = re.search(r'near\s+([a-zA-Z\s]+)', str(text).lower())
    return match.group(1).strip() if match else "Unknown"

def run_smart_campus_pipeline(df):
    df = df.copy()

    df['clean_description'] = df['description'].apply(clean_text)

    if df['clean_description'].str.len().sum() == 0:
        df['priority_label'] = 'Low'
        df['severity_score'] = 1
        df['location'] = 'Unknown'
        df['is_hotspot'] = False
        return df

    tfidf = TfidfVectorizer(max_features=1000, stop_words='english')
    X_text = tfidf.fit_transform(df['clean_description'])

    X_numeric = df[['repeat_count', 'unsafe_flag']].astype(float).values
    X = hstack([X_text, X_numeric])

    n_clusters = min(3, len(df))
    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
    df['cluster'] = kmeans.fit_predict(X)

    priority_map = {0: 'Low', 1: 'Medium', 2: 'High'}
    df['priority_label'] = df['cluster'].map(priority_map).fillna('Low')

    severity_weight = {'Low': 1, 'Medium': 2, 'High': 3}
    df['severity_score'] = df['priority_label'].map(severity_weight)

    df['location'] = df['description'].apply(extract_location)
    df['is_hotspot'] = df['severity_score'] >= 3

    return df
