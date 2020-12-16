
import axios from 'axios';
import qs from 'querystring';

const TAXONOMY_CHECK_API = 'https://cors-anywhere.herokuapp.com/https://amplitude.com/api/2/taxonomy/enabled';
const TAXONOMY_EVENT_API = 'https://cors-anywhere.herokuapp.com/https://amplitude.com/api/2/taxonomy/event';

export const isTaxonomyEnabled = async (
  apiKey: string,
  secretKey: string,
): Promise<boolean> => {
  try {
    const response = await axios
      .get(
        TAXONOMY_CHECK_API,
        {
          auth: {
            username: apiKey,
            password: secretKey,
          },
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
    return response.status === 200;
  } catch (err) {
    return false;
  }
};

interface TaxonomyMetadata {
  event_type: string,
  description: string,
  category: string,
}

interface TaxonomyGetEventsData {
  success: boolean,
  data: TaxonomyMetadata[],
}

export const getEventTypes = async (apiKey: string, secretKey: string): Promise<string[]> => {
  try {
    const response = await axios
      .get<TaxonomyGetEventsData>(
      TAXONOMY_EVENT_API,
      {
        auth: {
          username: apiKey,
          password: secretKey,
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    console.log('Created an event type', response);
    return response.data.data.map(event => event.event_type);
  } catch (err) {
    console.log('issue with fetching events', err);
    return [];
  }
};

export const createEventType = async (
  apiKey: string,
  secretKey: string,
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
        TAXONOMY_EVENT_API,
        qs.stringify(requestBody),
        {
          auth: {
            username: apiKey,
            password: secretKey,
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
