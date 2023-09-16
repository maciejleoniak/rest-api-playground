import axios from 'axios';
import { createRandomUser } from './data/randomUser';

require('dotenv').config();

describe('API CRUD Tests - delete user', () => {
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

    it('should return an error when trying to delete a non-existent user', async () => {
        // Specify an ID that is not expected to exist
        const nonExistentUserId = 0o7007007; // Replace with a non-existent user ID
    
        const headers = {
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        };
    
        try {
            // Perform the DELETE request to delete the non-existent user
            const deleteResponse = await axios.delete(`${url}/${nonExistentUserId}`, { headers });
    
            // This line should not be reached because the user doesn't exist
            expect(deleteResponse.status).toBe(204); // You can change the expected status code
    
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                // If an error occurs, we expect it to be an AxiosError
                expect(axios.isAxiosError(error)).toBe(true);
                console.log(error.message);
                // We can also expect the error response to have a 404 status code
                expect(error.response?.status).toBe(404);
            }
        }
    });
    
});
