import axios from 'axios';
import { createRandomUser } from './data/randomUser';


require('dotenv').config();

describe('API CRUD Tests', () => {
    const url = 'https://gorest.co.in/public/v2/users'; // API base URL

    it('should update an existing user', async () => {
        // Prepare data for creating a new user
        const createData = createRandomUser();

        const createHeaders = {
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`
        };

        try {
            // Create a user
            const createResponse = await axios.post(url, createData, { headers: createHeaders });
            expect(createResponse.status).toBe(201);

            // Get the ID of the newly created user
            const userId = createResponse.data.id;

            // Prepare data for updating the user
            const updateData = {
                name: 'PUT THIS22',
                email: 'put22@this.com'
               
            };

            const updateHeaders = {
                Authorization: `Bearer ${process.env.AUTH_TOKEN}`
            };

            // Update the user
            const updateResponse = await axios.put(`${url}/${userId}`, updateData, { headers: updateHeaders });
            expect(updateResponse.status).toBe(200);

            // Check if the data was updated as expected
            expect(updateResponse.data).toMatchObject(updateData);

        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                // Handle Axios errors
                const errorMessage = `Request failed: ${error.message}`;
                // throw new Error(errorMessage);
            }
            // Handle other types of errors
            throw error; // Throw the original error if it's not an Axios error
        }
    });
});
