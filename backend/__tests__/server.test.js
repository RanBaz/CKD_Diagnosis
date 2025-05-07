const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
    test('GET /analyses should return 200', async () => {
        const response = await request(app).get('/analyses');
        expect(response.statusCode).toBe(200);
    });

    test('POST /save-analysis should save analysis', async () => {
        const mockData = {
            patientData: { age: 45, bloodPressure: 80 },
            aiResponse: "Test response"
        };

        const response = await request(app)
            .post('/save-analysis')
            .send(mockData);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    });
});