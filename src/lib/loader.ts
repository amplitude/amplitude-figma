import { EventMetadata, NodeMarker } from 'src/types/event';

export interface InitialData {
  initialApiKey: string;
  initialSecretKey: string;
  initialEvents: EventMetadata[]
}

const MARKERS = [NodeMarker.NAME, NodeMarker.TRIGGER, NodeMarker.DESCRIPTION, NodeMarker.NOTES];

export function findLabelsForEvent(eventNode: FrameNode): string[] {
  return MARKERS.map((marker): string => {
    const markedNode = eventNode.children.find((child) => {
      return child.getPluginData(marker) === marker;
    }) as TextNode | null;

    if (markedNode !== null && 'characters' in markedNode) {
      return markedNode.characters;
    }
    return '';
  });
}

export function loadEvents(): EventMetadata[] {
  const events: EventMetadata[] = [];
  figma.currentPage.children.forEach((child) => {
    try {
      // Indicator that the frame belongs to us
      const potentialPluginData = child.getPluginData('event');
      if (potentialPluginData.length !== 0 && 'children' in child) {
        const eventNode = child as FrameNode;
        // const pluginData = JSON.parse(potentialPluginData) as EventMetadata;
        const [name, trigger, description, notes] = findLabelsForEvent(eventNode);

        // Create the event metadata from the gathered nodes
        const event: EventMetadata = {
          name,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          trigger: trigger as any,
          description,
          notes,
        };
        console.log(event);

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
