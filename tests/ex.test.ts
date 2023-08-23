import axios, { AxiosError } from 'axios';

describe('API Tests', () => {
  it('should fetch data from the API and validate user IDs', async () => {
    const url = 'https://gorest.co.in/public/v2/users'; // API URL
    
    try {
      const response = await axios.get(url);

      // Assertions
      expect(response.status).toBe(200); // Check response status

      const users = response.data.data; // Assuming the user objects are in the 'data' property
      expect(Array.isArray(users)).toBe(true); // Check if users is an array

      // Check each user's ID format
      for (const user of users) {
        expect(user.id).toMatch(/^\d+$/); // Validate ID format (numeric)
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Handle AxiosError
        throw new Error(`Request failed with an unknown error`);
      }
    }
  });
});
