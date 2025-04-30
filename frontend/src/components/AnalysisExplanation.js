import React from 'react';

const AnalysisExplanation = () => {
  return (
    <div className="analysis-container" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>📊 Analysis Explanation</h2>

      <section className="data-description">
        <h3>🔍 Dataset Overview</h3>
        <p>
          The analysis is based on the Chronic Kidney Disease dataset containing medical records of {400} patients. 
          The dataset includes various medical parameters such as:
        </p>
        <ul>
          <li><strong>Demographic Data:</strong> Age, Blood Pressure</li>
          <li><strong>Blood Tests:</strong> Hemoglobin, Blood Glucose Random, Blood Urea, Serum Creatinine</li>
          <li><strong>Urine Tests:</strong> Specific Gravity, Albumin, Sugar</li>
          <li><strong>Other Parameters:</strong> Hypertension, Diabetes Mellitus, Appetite, Anemia</li>
        </ul>
      </section>

      <section className="model-comparison">
        <h3>📈 Model Performance Analysis</h3>
        
        <div className="result-cards" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px', backgroundColor: '#f0f7ff', padding: '20px', borderRadius: '10px' }}>
            <h4>Random Forest Results</h4>
            <p>
              The Random Forest model achieved perfect performance across all metrics:
            </p>
            <ul>
              <li><strong>Accuracy: 100%</strong> - Correctly classified all test cases</li>
              <li><strong>Precision: 100%</strong> - No false positive predictions</li>
              <li><strong>Recall: 100%</strong> - No false negative predictions</li>
              <li><strong>F1-Score: 100%</strong> - Perfect harmony between precision and recall</li>
            </ul>
          </div>
          
          <div style={{ flex: 1, minWidth: '300px', backgroundColor: '#f0fff4', padding: '20px', borderRadius: '10px' }}>
            <h4>Support Vector Machine (SVM) Results</h4>
            <p>
              The SVM model showed strong but slightly lower performance:
            </p>
            <ul>
              <li><strong>Accuracy: 91.3%</strong> - Correctly classified 42 out of 46 test cases</li>
              <li><strong>Precision: 86.7%</strong> - Some false positives present</li>
              <li><strong>Recall: 100%</strong> - No false negatives</li>
              <li><strong>F1-Score: 92.9%</strong> - Strong overall performance</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="confusion-matrix-explanation">
        <h3>🎯 Understanding the Confusion Matrices</h3>
        
        <div className="confusion-cards" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px', backgroundColor: '#f5f0ff', padding: '20px', borderRadius: '10px' }}>
            <h4>Random Forest Confusion Matrix</h4>
            <p>
              The confusion matrix shows:
            </p>
            <ul>
              <li><strong>True Negatives (20)</strong> - Correctly identified non-CKD cases</li>
              <li><strong>True Positives (26)</strong> - Correctly identified CKD cases</li>
              <li><strong>False Positives (0)</strong> - No healthy patients misclassified as having CKD</li>
              <li><strong>False Negatives (0)</strong> - No CKD patients misclassified as healthy</li>
            </ul>
          </div>

          <div style={{ flex: 1, minWidth: '300px', backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '10px' }}>
            <h4>SVM Confusion Matrix</h4>
            <p>
              The SVM confusion matrix reveals:
            </p>
            <ul>
              <li><strong>True Negatives (16)</strong> - Correctly identified non-CKD cases</li>
              <li><strong>True Positives (26)</strong> - Correctly identified CKD cases</li>
              <li><strong>False Positives (4)</strong> - 4 healthy patients incorrectly classified as having CKD</li>
              <li><strong>False Negatives (0)</strong> - No CKD patients misclassified as healthy</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="clinical-implications">
        <h3>🏥 Clinical Implications</h3>
        <p>
          Based on these results:
        </p>
        <ul>
          <li>The Random Forest model shows exceptional potential for clinical application due to its perfect accuracy</li>
          <li>The SVM model's high recall (100%) ensures no CKD cases are missed, though it has a slightly higher false positive rate</li>
          <li>Both models demonstrate strong potential for supporting clinical decision-making in CKD diagnosis</li>
          <li>The Random Forest model might be preferred in practice due to its superior overall performance</li>
        </ul>
      </section>

      <section className="model-comparison">
        <h3>📈 Why Random Forest Performs Better</h3>
        <div className="explanation-card">
          <h4>1. Complex Feature Relationships</h4>
          <ul>
            <li>The dataset contains multiple interdependent medical parameters</li>
            <li>Random Forest can capture non-linear relationships through multiple decision trees</li>
            <li>Parameters like blood pressure, glucose, and creatinine have complex interactions</li>
          </ul>

          <h4>2. Handling Missing Values</h4>
          <ul>
            <li>The chronic kidney disease dataset contains numerous missing values (marked as '?')</li>
            <li>Random Forest inherently handles missing values through its ensemble nature</li>
            <li>Each tree can work with different subsets of available features</li>
          </ul>
        
          <h4>3. Feature Importance</h4>
          <ul>
            <li>Medical data typically has varying levels of feature importance</li>
            <li>Random Forest automatically determines feature importance</li>
            <li>Less relevant or noisy features get lower weights in the final prediction</li>
          </ul>

          <h4>4. Preventing Overfitting</h4>
          <ul>
            <li>Random Forest uses bagging (bootstrap aggregating)</li>
            <li>Each tree is trained on a different subset of the data</li>
            <li>The final prediction is an averaged vote from all trees, reducing overfitting</li>
          </ul>

          <h4>5. Performance Metrics Comparison</h4>
          <div className="metrics-comparison">
            <p><strong>Random Forest vs SVM:</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '5px' }}>Accuracy: <strong>100% vs 91.3%</strong></div>
              <div style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '5px' }}>Precision: <strong>100% vs 86.7%</strong></div>
              <div style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '5px' }}>Recall: <strong>100% vs 100%</strong></div>
              <div style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '5px' }}>F1-Score: <strong>100% vs 92.9%</strong></div>
            </div>
          </div>

          <h4>6. Confusion Matrix Analysis</h4>
          <div className="matrix-comparison">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <p><strong>Random Forest:</strong></p>
                <ul>
                  <li>Perfect classification with no errors</li>
                  <li>20 true negatives, 26 true positives</li>
                  <li>No false positives or false negatives</li>
                </ul>
              </div>
              
              <div style={{ flex: 1, minWidth: '250px' }}>
                <p><strong>SVM:</strong></p>
                <ul>
                  <li>Good but imperfect classification</li>
                  <li>16 true negatives, 26 true positives</li>
                  <li>4 false positives - misclassified healthy patients as having CKD</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="important-note">
            <p><strong>Important Note:</strong> While Random Forest shows perfect performance on this dataset, 
            it's important to validate these results with larger test sets to ensure generalizability. 
            Perfect scores might indicate potential overfitting, although Random Forest's ensemble nature 
            helps mitigate this risk.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalysisExplanation;