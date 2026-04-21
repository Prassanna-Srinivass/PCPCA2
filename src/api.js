const API_BASE_URL = 'https://t4e-testserver.onrender.com/api';
const PASSWORD = '405506';

export const fetchActivities = async () => {
  try {
    const url = `${API_BASE_URL}/activities`;
    console.log('Fetching from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': PASSWORD
      }
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    console.log('API Response Keys:', Object.keys(data));

    return data;
  } catch (error) {
    console.error('Failed to fetch activities:', error);
    throw error;
  }
};
