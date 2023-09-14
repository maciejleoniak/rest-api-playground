import axios from 'axios';
import { createRandomUser } from './data/randomUser';


require('dotenv').config();


describe('API CRUD Tests - create user', () => {
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

            // If the user creation succeeded, we expect an HTTP status 201
            expect(response.status).toBe(201);
            fail('Expected a 422 status code ("user without a name"), but received 201');
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                // If an error occurs, we expect it to be an AxiosError
                expect(axios.isAxiosError(error)).toBe(true);
                console.log(error.message);
                // We can also expect the error response to have a 422 status code
                expect(error.response?.status).toBe(422);
            }
        }
    });

    it('should not create a new user without a email', async () => {
        const postData = createRandomUser();
        postData.email = ''; // Remove the email (set it to an empty string)

        const headers = {
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`
        };

        try {
            const response = await axios.post(url, postData, { headers });

            // If the user creation succeeded, we expect an HTTP status 201
            expect(response.status).toBe(201);
            fail('Expected a 422 status code ("user without a email"), but received 201');
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                // If an error occurs, we expect it to be an AxiosError
                expect(axios.isAxiosError(error)).toBe(true);
                console.log(error.message);
                // We can also expect the error response to have a 422 status code
                expect(error.response?.status).toBe(422);
            }
        }
    });

    it('should not create a new user without a gender', async () => {
        const postData = createRandomUser();
        postData.gender = ''; // Remove the gender (set it to an empty string)

        const headers = {
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`
        };

        try {
            const response = await axios.post(url, postData, { headers });

            // If the user creation succeeded, we expect an HTTP status 201
            expect(response.status).toBe(201);
            fail('Expected a 422 status code ("user without a gender"), but received 201');
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                // If an error occurs, we expect it to be an AxiosError
                expect(axios.isAxiosError(error)).toBe(true);
                console.log(error.message);
                // We can also expect the error response to have a 422 status code
                expect(error.response?.status).toBe(422);
            }
        }
    });

    it('user gender should be: "male", "female"', async () => {
        const postData = createRandomUser();

        const headers = {
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`
        };

        try {
            const response = await axios.post(url, postData, { headers });
            console.log(response.data);
            // If the user creation succeeded, we expect an HTTP status 201
            expect(['male', 'female']).toContain(postData.gender);
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

    it('user status should be: "active", "inactive"', async () => {
        const postData = createRandomUser();

        const headers = {
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`
        };

        try {
            const response = await axios.post(url, postData, { headers });
            console.log(response.data);
            // If the user creation succeeded, we expect an HTTP status 201
            expect(['active', 'inactive']).toContain(postData.status);
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
