import { EventMetadata } from 'src/types/event';

export interface InitialData {
  initialApiKey: string;
  initialSecretKey: string;
  initialEvents: EventMetadata[]
}

type ExpectedLabelChildren = [TextNode, TextNode, TextNode, TextNode];

export function loadEvents(): EventMetadata[] {
  const events: EventMetadata[] = [];
  figma.currentPage.children.forEach((child) => {
    try {
      // Indicator that the frame belongs to us
      const potentialPluginData = child.getPluginData('event');
      if (potentialPluginData.length !== 0 && 'children' in child) {
        const pluginData = JSON.parse(potentialPluginData) as EventMetadata;
        const [nameNode, , descriptionNode, notesNode] = child.children as ExpectedLabelChildren;
        const event: EventMetadata = {
          name: nameNode.characters,
          trigger: pluginData.trigger,
          description: descriptionNode.characters,
          notes: notesNode.characters,
        };

        events.push(event);
      }
    } catch (err) {
      console.log('caught error loading data', err);
    }
  });

  return events;
}

export async function loadInitialData(): Promise<InitialData> {
  const initialApiKey: string = (await figma.clientStorage.getAsync('API_KEY')) as string;
  const initialSecretKey: string = (await figma.clientStorage.getAsync('SECRET_KEY')) as string;
  return {
    initialApiKey,
    initialSecretKey,
    initialEvents: loadEvents(),
  };
}
