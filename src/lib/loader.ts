import { EventMetadata, MOCK_EVENTS } from 'src/types/event';

export interface InitialData {
  initialApiKey: string;
  initialSecretKey: string;
  initialEvents: EventMetadata[]
}

export async function loadInitialData(): Promise<InitialData> {
  const initialApiKey: string = (await figma.clientStorage.getAsync('API_KEY')) as string;
  const initialSecretKey: string = (await figma.clientStorage.getAsync('SECRET_KEY')) as string;
  return {
    initialApiKey,
    initialSecretKey,
    initialEvents: MOCK_EVENTS, // TODO load and don't mock
  };
}
