import axios from 'axios';
import { createRandomUser } from './data/randomUser';

require('dotenv').config();

describe('API CRUD Tests', () => {
    const url = 'https://gorest.co.in/public/v2/users'; // API URL

    it('should delete an existing user', async () => {
        // Create a user to be deleted
        const postData = createRandomUser();
        const headers = {
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        };

        // create the user
        const createResponse = await axios.post(url, postData, { headers });
        console.log(createResponse);

        // Extract the user ID from the response
        const userIdToDelete = createResponse.data.id;

        try {
            // Perform the DELETE request to delete the user
            const deleteResponse = await axios.delete(`${url}/${userIdToDelete}`,  { headers });

            console.log(deleteResponse.status);

            // Assert that the DELETE request was successful (HTTP status 204 - No Content)
            expect(deleteResponse.status).toBe(204);

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
