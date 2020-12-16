
import axios from 'axios';
import qs from 'querystring';

const TAXONOMY_CHECK_API = 'https://cors-anywhere.herokuapp.com/https://amplitude.com/api/2/taxonomy/enabled';
const TAXONOMY_EVENT_API = 'https://cors-anywhere.herokuapp.com/https://amplitude.com/api/2/taxonomy/event';

export const getIsTaxonomyEnabled = async (
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
    return response.data.data.map(event => event.event_type);
  } catch (err) {
    return [];
  }
};

export const createEventType = async (
  apiKey: string,
  secretKey: string,
  eventType: string,
  description: string
): Promise<boolean> => {
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

    return response.status === 200;
  } catch (err) {
    return false;
  }
};

export const updateEventType = async (
  apiKey: string,
  secretKey: string,
  eventType: string,
  description: string
): Promise<boolean> => {
  const requestBody = {
    description,
  };
  try {
    const response = await axios
      .put(
        `${TAXONOMY_EVENT_API}/${eventType}`,
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

    return response.status === 200;
  } catch (err) {
    return false;
  }
};
