import axios from 'axios';

describe('API CRUD Tests - read user', () => {
  it('should fetch data from the API and validate user IDs', async () => {
    const url = 'https://gorest.co.in/public/v2/users'; // API URL

    try {
      const response = await axios.get(url);

      console.log(response.data);
      console.log(response.status);

      // Assertions
      expect(response.status).toBe(200); // Check response status

      const users = response.data; // Assuming the user objects are in the 'data' property
      expect(Array.isArray(users)).toBe(true); // Check if users is an array

      // Check each user's ID format
      for (const user of users) {
        expect(user.id.toString()).toMatch(/^\d+$/); // Validate ID format (numeric)
      }
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
