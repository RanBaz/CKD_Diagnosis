import React, { useState } from 'react';
import './Prediction.css';

const Prediction = () => {
  const [formData, setFormData] = useState({
    age: '',
    bp: '',
    sg: '',
    al: '',
    su: '',
    rbc: '',
    pc: '',
    pcc: '',
    ba: '',
    bgr: '',
    bu: '',
    sc: '',
    sod: '',
    pot: '',
    hemo: '',
    pcv: '',
    wbcc: '',
    rbcc: '',
    htn: '',
    dm: '',
    cad: '',
    appet: '',
    pe: '',
    ane: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Labels for fields to use in the prompt
  const fieldLabels = {
    age: "Age",
    bp: "Blood Pressure",
    sg: "Specific Gravity",
    al: "Albumin",
    su: "Sugar",
    rbc: "Red Blood Cells",
    pc: "Pus Cell",
    pcc: "Pus Cell Clumps",
    ba: "Bacteria",
    bgr: "Blood Glucose Random",
    bu: "Blood Urea",
    sc: "Serum Creatinine",
    sod: "Sodium",
    pot: "Potassium",
    hemo: "Hemoglobin",
    pcv: "Packed Cell Volume",
    wbcc: "White Blood Cell Count",
    rbcc: "Red Blood Cell Count",
    htn: "Hypertension",
    dm: "Diabetes Mellitus",
    cad: "Coronary Artery Disease",
    appet: "Appetite",
    pe: "Pedal Edema",
    ane: "Anemia"
  };

  // Transform yes/no and normal/abnormal fields to human-readable format
  const getReadableValue = (name, value) => {
    if (['rbc', 'pc'].includes(name)) {
      return value === '1' ? 'Normal' : 'Abnormal';
    }
    if (['pcc', 'ba'].includes(name)) {
      return value === '1' ? 'Present' : 'Not Present';
    }
    if (['htn', 'dm', 'cad', 'pe', 'ane'].includes(name)) {
      return value === '1' ? 'Yes' : 'No';
    }
    if (name === 'appet') {
      return value === '1' ? 'Good' : 'Poor';
    }
    return value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Convert form data to readable format for the prompt
      const patientData = Object.entries(formData).map(([key, value]) => {
        return `${fieldLabels[key]}: ${getReadableValue(key, value)}${getUnit(key)}`;
      }).join('\n');

      // Create the prompt for Gemini API
      const prompt = `
You are a medical AI assistant specializing in kidney health analysis. I'm providing patient data to assess the likelihood of Chronic Kidney Disease (CKD).

Patient Data:
${patientData}

Please provide a concise analysis (250-300 words) that includes:
1. A clear diagnosis (CKD or Not CKD)
2. The most significant abnormal values that support your conclusion
3. Brief recommendations based on the findings

Structure your response as follows:
- Diagnosis: State if CKD is likely or not
- Key Findings: List 2-3 most significant abnormal values
- Recommendations: 2-3 key actionable steps

Keep your response focused and direct, avoiding technical jargon where possible.
`;

      console.log('Sending request to Gemini API with prompt');
      
      // Replace with your actual Gemini API endpoint and key
      const API_KEY = 'AIzaSyBjTvXHlFStQbzCOg88jjbe1cAaxlaE9M8';
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2, // Lower temperature for more focused medical responses
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Gemini response:', data);
      
      // Extract the response text from Gemini API response
      // The exact path depends on Gemini API response structure
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      // Set the full AI response as prediction
      setPrediction(aiResponse);

      // Save to MongoDB
      const saveResponse = await fetch('http://localhost:5000/save-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientData: formData,
          aiResponse
        })
      });

      if (!saveResponse.ok) {
        console.error('Error saving analysis to database');
      }
      
    } catch (error) {
      console.error('Error connecting to Gemini API:', error);
      setError(`Error: ${error.message || 'Failed to connect to the AI service'}`);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to add units to measurements
  const getUnit = (key) => {
    const units = {
      bp: " mm/Hg",
      bgr: " mgs/dl",
      bu: " mgs/dl",
      sc: " mgs/dl",
      sod: " mEq/L",
      pot: " mEq/L",
      hemo: " gms",
      pcv: "%",
      wbcc: " cells/cumm",
      rbcc: " millions/cmm"
    };
    return units[key] || "";
  };

  return (
    <div className="diagnostic-page p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
        Chronic Kidney Disease Diagnostic Tool
      </h2>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Numerical Inputs */}
            <div>
              <label className="block mb-1 font-medium">Age (years)</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="1"
                max="100"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Blood Pressure (mm/Hg)</label>
              <input
                type="number"
                name="bp"
                value={formData.bp}
                onChange={handleChange}
                min="50"
                max="200"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Specific Gravity</label>
              <input
                type="number"
                name="sg"
                value={formData.sg}
                onChange={handleChange}
                step="0.001"
                min="1.000"
                max="1.030"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Albumin (0-5)</label>
              <select
                name="al"
                value={formData.al}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                {[0, 1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Sugar (0-5)</label>
              <select
                name="su"
                value={formData.su}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                {[0, 1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Red Blood Cells</label>
              <select
                name="rbc"
                value={formData.rbc}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="1">Normal</option>
                <option value="0">Abnormal</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Pus Cell</label>
              <select
                name="pc"
                value={formData.pc}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="1">Normal</option>
                <option value="0">Abnormal</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Pus Cell Clumps</label>
              <select
                name="pcc"
                value={formData.pcc}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="1">Present</option>
                <option value="0">Not Present</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Bacteria</label>
              <select
                name="ba"
                value={formData.ba}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="1">Present</option>
                <option value="0">Not Present</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Blood Glucose Random (mgs/dl)</label>
              <input
                type="number"
                name="bgr"
                value={formData.bgr}
                onChange={handleChange}
                min="70"
                max="500"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Blood Urea (mgs/dl)</label>
              <input
                type="number"
                name="bu"
                value={formData.bu}
                onChange={handleChange}
                min="10"
                max="400"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Serum Creatinine (mgs/dl)</label>
              <input
                type="number"
                name="sc"
                value={formData.sc}
                onChange={handleChange}
                step="0.1"
                min="0.4"
                max="50"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Other Medical Parameters */}
            <div>
              <label className="block mb-1 font-medium">Sodium (mEq/L)</label>
              <input
                type="number"
                name="sod"
                value={formData.sod}
                onChange={handleChange}
                min="110"
                max="165"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Potassium (mEq/L)</label>
              <input
                type="number"
                name="pot"
                value={formData.pot}
                onChange={handleChange}
                step="0.1"
                min="2.5"
                max="7.5"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Hemoglobin (gms)</label>
              <input
                type="number"
                name="hemo"
                value={formData.hemo}
                onChange={handleChange}
                step="0.1"
                min="3.0"
                max="18.0"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Packed Cell Volume (%)</label>
              <input
                type="number"
                name="pcv"
                value={formData.pcv}
                onChange={handleChange}
                min="9"
                max="55"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">WBC Count (cells/cumm)</label>
              <input
                type="number"
                name="wbcc"
                value={formData.wbcc}
                onChange={handleChange}
                min="2000"
                max="30000"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">RBC Count (millions/cmm)</label>
              <input
                type="number"
                name="rbcc"
                value={formData.rbcc}
                onChange={handleChange}
                step="0.1"
                min="2.0"
                max="7.0"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Medical Conditions */}
            <div>
              <label className="block mb-1 font-medium">Hypertension</label>
              <select
                name="htn"
                value={formData.htn}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Diabetes Mellitus</label>
              <select
                name="dm"
                value={formData.dm}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Coronary Artery Disease</label>
              <select
                name="cad"
                value={formData.cad}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Appetite</label>
              <select
                name="appet"
                value={formData.appet}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="1">Good</option>
                <option value="0">Poor</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Pedal Edema</label>
              <select
                name="pe"
                value={formData.pe}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Anemia</label>
              <select
                name="ane"
                value={formData.ane}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <button 
            type="submit"
            className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 px-4 rounded-lg transition duration-200`}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Get Analysis'}
          </button>
        </form>

        {prediction && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="font-bold text-lg mb-2">AI Analysis:</h3>
            <div className="prose max-w-none">
              {/* Display the AI response in formatted markdown */}
              <div dangerouslySetInnerHTML={{ __html: formatMarkdown(prediction) }} />
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-bold">Important Notice:</span> This analysis is for informational purposes only and should not be used as a substitute for professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Simple function to format markdown - you may want to use a proper markdown library
const formatMarkdown = (text) => {
  if (!text) return '';
  
  // Convert markdown headings
  text = text.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  text = text.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  text = text.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  
  // Convert bold text
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert italic text
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert lists
  text = text.replace(/^\s*\-\s+(.*$)/gm, '<li>$1</li>');
  text = text.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  
  // Convert paragraphs
  text = text.replace(/^([^<].*)\n$/gm, '<p>$1</p>');
  
  // Convert line breaks
  text = text.replace(/\n/g, '<br>');
  
  return text;
};

export default Prediction;