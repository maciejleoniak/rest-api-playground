import axios from 'axios';
import { createRandomUser, getRandomEmail } from './data/randomUser';

require('dotenv').config();

describe('API CRUD Tests - update user', () => {
    const url = 'https://gorest.co.in/public/v2/users'; // API base URL
    const createHeaders = {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`
    };
    let userId: number; // Store the ID of the created user

    beforeAll(async () => {
        // Create a user before any test case
        const createData = createRandomUser();
        const createResponse = await axios.post<any>(url, createData, { headers: createHeaders });
        expect(createResponse.status).toBe(201);
        userId = createResponse.data.id; // Store the ID for later use
    });

    it('should update an existing user email', async () => {
        const emailUpdate = getRandomEmail();

        // Prepare data for updating the user
        const updateData = {
            email: emailUpdate
        };

        const updateHeaders = {
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`
        };

        // Update the user
        const updateResponse = await axios.put<any>(`${url}/${userId}`, updateData, { headers: updateHeaders });
        expect(updateResponse.status).toBe(200);

        // Check if the data was updated as expected
        expect(updateResponse.data).toMatchObject(updateData);
    });

    it('should update an existing user status', async () => {
        // Retrieve the initial status of the user
        const initialStatus = 'active'; // Assuming it's initially active

        // Calculate the new status (opposite of the initial status)
        const newStatus = initialStatus === 'active' ? 'inactive' : 'active';

        // Prepare data for updating the user's status
        const updateData = {
            status: newStatus
        };

        const updateHeaders = {
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`
        };

        // Update the user
        const updateResponse = await axios.put<any>(`${url}/${userId}`, updateData, { headers: updateHeaders });
        expect(updateResponse.status).toBe(200);

        // Check if the data was updated as expected
        expect(updateResponse.data.status).toBe(newStatus);
    });
});
