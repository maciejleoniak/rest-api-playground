import axios from 'axios';

describe('API CRUD Tests', () => {
    const apiUrl = 'https://gorest.co.in/public/v2/users'; // API URL

    it('should create a new user', async () => {
        const newUser = {
            name: 'test',
            email: 'test@test.com',
            gender: 'male',
        };

        const response = await axios.post(apiUrl, newUser);
        expect(response.status).toBe(201);
        expect(response.data.code).toBe(201); // Assuming the API returns a code
        expect(response.data.data).toMatchObject(newUser); // Assuming the API returns the created user
    });
})