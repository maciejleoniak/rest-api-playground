import axios from 'axios';

require('dotenv').config();


describe('API CRUD Tests', () => {
    const url = 'https://gorest.co.in/public/v2/users'; // API URL

    it('should create a new user', async () => {

        const postData = {
            name: 'Pitusia Cat2',
            email: 'pitex_kot2@kot.kot',
            gender: 'female',
            status: 'active'
        };

        const headers = {
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`
        };

        try {

            const response = await axios.post(url, postData, { headers });

            console.log(response.data);
            console.log(response.status);

            expect(response.status).toBe(201);
            expect(response.data).toBe(201); // Assuming the API returns a code
            expect(response.data).toMatchObject(postData); // Assuming the API returns the created user

        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                // Handle AxiosError
                // You can extract information from the error object here
                const errorMessage = `Request failed: ${error.message}`;
                // throw new Error(errorMessage);
            }
            // Handle other types of errors
            throw error; // Rethrow the original error if not an AxiosError
        }
    });
})