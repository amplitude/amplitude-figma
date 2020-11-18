import { showUI, on } from '@create-figma-plugin/utilities';

import { MOCK_EVENTS } from 'src/assets/mockEvents';
import { Message } from 'src/types/message';
import { EventMetadata } from 'src/types/event';

export default async function (): Promise<void> {
  on(Message.ADD_EVENT, (event: EventMetadata) => {
    console.log(event);
  });

  on(Message.API_KEY, (apiKey: string) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    figma.clientStorage.setAsync('API_KEY', apiKey);
  });

  on(Message.SECRET_KEY, (secretKey: string) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    figma.clientStorage.setAsync('SECRET_KEY', secretKey);
  });

  const options = { width: 687, height: 725 };

  const initialApiKey: string = (await figma.clientStorage.getAsync('API_KEY')) as string;
  const initialSecretKey: string = (await figma.clientStorage.getAsync('SECRET_KEY')) as string;
  showUI(options, { initialApiKey, initialSecretKey, initialEvents: MOCK_EVENTS });
}
