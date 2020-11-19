import { EventMetadata, NodeMarker } from 'src/types/event';

export interface InitialData {
  initialApiKey: string;
  initialSecretKey: string;
  initialEvents: EventMetadata[]
}

const MARKERS = [NodeMarker.NAME, NodeMarker.TRIGGER, NodeMarker.DESCRIPTION, NodeMarker.NOTES];

export function findLabelsForEvent(eventNode: FrameNode): TextNode[] {
  return MARKERS.map((marker): TextNode => {
    const markedNode = eventNode.children.find((child) => {
      return child.getPluginData(marker) === marker;
    }) as TextNode | null;

    return markedNode ?? figma.createText();
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
        const [nameNode, triggerNode, descriptionNode, notesNode] = findLabelsForEvent(eventNode);

        // Create the event metadata from the gathered nodes
        const event: EventMetadata = {
          name: nameNode.characters,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          trigger: triggerNode.characters as any,
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
