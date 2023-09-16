import axios from 'axios';

describe('API CRUD Tests - read user', () => {
  const url = 'https://gorest.co.in/public/v2/users'; // API URL

  it('should fetch data from the API and validate user IDs', async () => {
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

  it('should handle fetching a non-existent user', async () => {
    const nonExistentUserId = 0o7007007; // Replace with a non-existent user ID

    try {
      const response = await axios.get(`${url}/${nonExistentUserId}`);

      // If you reach this point, it means the user exists, which is not expected
      expect(response.status).toBe(404); // Expect a 404 status for non-existent users
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
