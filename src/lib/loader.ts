import { EventMetadata, NodeMarker, PluginData } from 'src/types/event';

export interface InitialData {
  initialApiKey: string;
  initialSecretKey: string;
  initialEvents: EventMetadata[]
}

const MARKERS = [NodeMarker.NAME, NodeMarker.TRIGGER, NodeMarker.DESCRIPTION, NodeMarker.NOTES];

export function findLabelsForEvent(pluginData: PluginData): string[] {
  return MARKERS.map((marker): string => {
    const markedNode = figma.getNodeById(pluginData[marker]);

    if (markedNode !== null && 'characters' in markedNode) {
      return markedNode.characters;
    }
    return '';
  });
}

export function loadEvents(): EventMetadata[] {
  const events: EventMetadata[] = [];
  const eventGroup = figma.getNodeById(figma.currentPage.getPluginData('event_group')) as GroupNode | null;
  eventGroup?.children.forEach((child) => {
    try {
      // Indicator that the frame belongs to us
      const potentialPluginData = child.getPluginData('eventMetadata');
      if (potentialPluginData.length !== 0) {
        const pluginData = JSON.parse(potentialPluginData) as PluginData;
        const [name, trigger, description, notes] = findLabelsForEvent(pluginData);

        // Create the event metadata from the gathered nodes
        const event: EventMetadata = {
          name,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          trigger: trigger as any,
          description,
          notes,
        };

        events.push(event);
      }
    } catch (err) {
      return null;
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
