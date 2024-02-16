import { useCallback, useEffect } from 'react';
import axios from 'axios';

const useFetchEmails = (url, action, dependencies) => {
  const fetchData = useCallback(async () => {
    try {
      const response = await axios(url);

      if (response.data) {
        const emailArray = [];
        for (const key in response.data) {
          emailArray.push({ id: key, ...response.data[key] });
        }
        // Sort emails based on the timestamp in descending order
        emailArray.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
        action(emailArray);
      }
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  }, [url, action]);

  useEffect(() => {
    fetchData();
  }, dependencies);
};

export default useFetchEmails;