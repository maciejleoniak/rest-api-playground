import axios from 'axios';
import { createRandomUser } from './data/randomUser';


require('dotenv').config();


describe('API CRUD Tests', () => {
    const url = 'https://gorest.co.in/public/v2/users'; // API URL

    it('should create a new user', async () => {

        const postData = createRandomUser();

        const headers = {
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`
        };

        try {

            const response = await axios.post(url, postData, { headers });

            console.log(response.data);
            console.log(response.status);


            expect(response.status).toBe(201);
            expect(response.data).toMatchObject(postData); // Assuming the API returns the created user


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

    it('should not create a new user without a name', async () => {
        const postData = createRandomUser();
        postData.name = ''; // Remove the name (set it to an empty string)

        const headers = {
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`
        };

        try {
            const response = await axios.post(url, postData, { headers });
            
            // If the user creation succeeded, we expect an HTTP error status 422
            expect(response.status).toBe(422);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                // Handle AxiosError
                const errorMessage = `Request failed: ${error.message}`;
                console.log(errorMessage)
                // throw new Error(errorMessage);
                
            }
            // Handle other types of errors
            throw error; // Rethrow the original error if not an AxiosError
        }
    });
})