import pandas as pd
import json
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

# Load and clean data
df = pd.read_csv("chronic_kidney_disease.csv")
df.replace('?', pd.NA, inplace=True)
df.dropna(inplace=True)
df = df.apply(LabelEncoder().fit_transform)

X = df.drop('class', axis=1)
y = df['class']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Train models
rf = RandomForestClassifier(random_state=42)
svm = SVC(random_state=42)
rf.fit(X_train, y_train)
svm.fit(X_train, y_train)

rf_pred = rf.predict(X_test)
svm_pred = svm.predict(X_test)

def get_metrics(y_true, y_pred):
    return {
        'accuracy': round(accuracy_score(y_true, y_pred), 3),
        'precision': round(precision_score(y_true, y_pred), 3),
        'recall': round(recall_score(y_true, y_pred), 3),
        'f1_score': round(f1_score(y_true, y_pred), 3),
        'confusion_matrix': confusion_matrix(y_true, y_pred).tolist()
    }

results = {
    'RandomForest': get_metrics(y_test, rf_pred),
    'SVM': get_metrics(y_test, svm_pred)
}

# Save the Random Forest model
with open('random_forest_model.pkl', 'wb') as file:
    pickle.dump(rf, file)

# Output the result
print(json.dumps(results))