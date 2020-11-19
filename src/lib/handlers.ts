
import { on } from '@create-figma-plugin/utilities';

import { EventMetadata, NodeMarker } from 'src/types/event';
import { Message } from 'src/types/message';
import { Tab, TAB_OPTIONS } from 'src/types/tab';

const PADDING_X = 16;
function createFillsColor(r: number, g: number, b: number): readonly SolidPaint[] {
  return [{
    blendMode: 'NORMAL',
    color: { r, g, b },
    opacity: 1,
    type: 'SOLID',
    visible: true
  }];
}

function createTextNode(str: string): TextNode {
  const text = figma.createText();
  text.fontName = { family: 'Inter', style: 'Regular' };
  text.insertCharacters(0, str);
  return text;
}

/**
 * Creates event label and adds it to the page
 * @param event event that label represents
 * @param clientNode associated Figma node that event is attached to
 */
async function createLabel(event: EventMetadata, clientNode: SceneNode): Promise<void> {
  console.log(event);
  console.log(figma.currentPage.selection);
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  const container = figma.createFrame();
  container.x = clientNode.x + clientNode.width + PADDING_X;
  container.y = clientNode.y;

  container.name = `event: ${event.name}`;
  container.layoutMode = 'VERTICAL';

  const name = createTextNode(event.name);
  name.setPluginData(NodeMarker.NAME, NodeMarker.NAME);

  const triggerTitle = createTextNode('Trigger');
  const trigger = createTextNode(event.trigger);
  trigger.setPluginData(NodeMarker.TRIGGER, NodeMarker.TRIGGER);

  const descriptionTitle = createTextNode('Description');
  const description = createTextNode(event.description);
  description.setPluginData(NodeMarker.DESCRIPTION, NodeMarker.DESCRIPTION);

  const notesTitle = createTextNode('Dev Note');
  const notes = createTextNode(event.notes);
  notes.setPluginData(NodeMarker.NOTES, NodeMarker.NOTES);

  // #60758B
  const gray = createFillsColor(0.37647, 0.45882, 0.54510);

  triggerTitle.fills = gray;
  descriptionTitle.fills = gray;
  notesTitle.fills = gray;

  container.appendChild(name);
  container.appendChild(triggerTitle);
  container.appendChild(trigger);
  container.appendChild(descriptionTitle);
  container.appendChild(description);
  container.appendChild(notesTitle);
  container.appendChild(notes);

  // Store label with event data and associated client node id
  container.setPluginData('event', JSON.stringify(event));
  container.setPluginData('clientNodeId', clientNode.id);

  figma.currentPage.appendChild(container);
}

export function attachHandlers(): void {
  on(Message.ADD_EVENT, (event: EventMetadata) => {
    if (figma.currentPage.selection.length === 0) {
      figma.notify('Please select an element');
    } else if (figma.currentPage.selection.length > 1) {
      figma.notify('Please group multiple elements into a single frame');
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      createLabel(event, figma.currentPage.selection[0]).then(() => {
        figma.notify(`✔️ Event '${event.name}' added!`);
      });
    }
  });

  on(Message.API_KEY, (apiKey: string) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    figma.clientStorage.setAsync('API_KEY', apiKey);
  });

  on(Message.SECRET_KEY, (secretKey: string) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    figma.clientStorage.setAsync('SECRET_KEY', secretKey);
  });

  on(Message.CHANGE_TAB, (previousTab: Tab, nextTab: Tab) => {
    const previousOptions = TAB_OPTIONS[previousTab];
    const nextOptions = TAB_OPTIONS[nextTab];

    if (previousOptions !== nextOptions) {
      figma.ui.resize(nextOptions.width, nextOptions.height);
    }
  });
}
