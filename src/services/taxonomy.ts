
import axios from 'axios';
import qs from 'querystring';

const TAXONOMY_CHECK_API = 'https://cors-anywhere.herokuapp.com/https://amplitude.com/api/2/taxonomy/enabled';
const TAXONOMY_ADD_EVENT_API = 'https://cors-anywhere.herokuapp.com/https://amplitude.com/api/2/taxonomy/event';

export const isTaxonomyEnabled = async (
  apiKey: string,
  secrectKey: string,
): Promise<boolean> => {
  try {
    const response = await axios
      .get(
        TAXONOMY_CHECK_API,
        {
          auth: {
            username: apiKey,
            password: secrectKey,
          },
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
    console.log('Created an event type', response);
    return response.status === 200;
  } catch (err) {
    console.log('issue with creating event', err);
    return false;
  }
};

export const createEventType = async (
  apiKey: string,
  secrectKey: string,
  eventType: string,
  description: string
): Promise<void> => {
  const requestBody = {
    event_type: eventType,
    description,
  };
  try {
    const response = await axios
      .post(
        TAXONOMY_ADD_EVENT_API,
        qs.stringify(requestBody),
        {
          auth: {
            username: apiKey,
            password: secrectKey,
          },
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
    console.log('Created an event type', response);
  } catch (err) {
    console.log('issue with creating event', err);
  }
};
