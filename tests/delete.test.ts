import axios from 'axios';
import { createRandomUser } from './data/randomUser';

require('dotenv').config();

describe('API CRUD Tests', () => {
    const url = 'https://gorest.co.in/public/v2/users'; // API URL

    it('should create a new user', async () => {
        // ... (Your code for creating a new user)

        // Your existing test for creating a new user goes here

    });

    it('should delete an existing user', async () => {
        // Create a user to be deleted
        const postData = createRandomUser();
        const headers = {
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        };

        // First, create the user
        const createResponse = await axios.post(url, postData, { headers });

        // Extract the user ID from the response
        const userIdToDelete = createResponse.data.id;

        try {
            // Perform the DELETE request to delete the user
            const deleteResponse = await axios.delete(`${url}/${userIdToDelete}`, {
                headers,
            });

            console.log(deleteResponse.status);

            // Assert that the DELETE request was successful (HTTP status 204 - No Content)
            expect(deleteResponse.status).toBe(204);

            // Optionally, you can check if the user has been deleted by attempting to fetch it again
            // and expecting a 404 status or similar.

        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                // Handle AxiosError
                const errorMessage = `Request failed: ${error.message}`;
                throw new Error(errorMessage);
            }
            // Handle other types of errors
            throw error; // Rethrow the original error if not an AxiosError
        }
    });
});
