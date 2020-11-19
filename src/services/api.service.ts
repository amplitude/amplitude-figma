
import axios from 'axios';
import qs from 'querystring';

const TAXONOMY_ADD_EVENT_ENDPOINT = 'https://cors-anywhere.herokuapp.com/https://amplitude.com/api/2/taxonomy/event';
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ApiService {
  // eslint-disable-next-line @typescript-eslint/require-await
  static async createEventType(
    apiKey: string,
    secrectKey: string,
    eventType: string,
    description: string
  ): Promise<void> {
    const requestBody = {
      event_type: eventType,
      description,
    };

    const response = await axios
      .post(
        TAXONOMY_ADD_EVENT_ENDPOINT,
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
  }
}
