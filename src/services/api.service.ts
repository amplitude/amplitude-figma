export class ApiService {
  static async createEventType(
    apiKey: string,
    secrectKey: string,
    eventType: string,
    description: string
  ): Promise<void> {

    console.log("GOING TO CREATE AN EVENT TYPE!!");
    const axios = require("axios");
    const qs = require("querystring");

    const requestBody = {
      event_type: eventType,
      description: description,
    };

    axios
      .post(
        "https://amplitude.com/api/2/taxonomy/event",
        qs.stringify(requestBody),
        {
          auth: {
            username: apiKey,
            password: secrectKey,
          },
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log("Created an event type");
        console.log(response);
      })
      .catch((err) => {
        console.log("Fail to create event type: " + eventType);
      });
  }
}
