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
})