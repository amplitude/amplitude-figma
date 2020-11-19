
import { on } from '@create-figma-plugin/utilities';

import { EventMetadata, NodeMarker } from 'src/types/event';
import { Message } from 'src/types/message';
import { Tab, TAB_OPTIONS } from 'src/types/tab';

const PADDING_X = 16;

/**
 * Creates event label and adds it to the page
 * @param event event that label represents
 * @param clientNode associated Figma node that event is attached to
 */
async function createLabel(event: EventMetadata, clientNode: SceneNode): Promise<void> {
  console.log(event);
  console.log(figma.currentPage.selection);
  await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
  const container = figma.createFrame();
  container.x = clientNode.x + clientNode.width + PADDING_X;
  container.y = clientNode.y;

  const name = figma.createText();
  const triggerTitle = figma.createText();
  const trigger = figma.createText();
  const descriptionTitle = figma.createText();
  const description = figma.createText();
  const notesTitle = figma.createText();
  const notes = figma.createText();

  container.name = `event: ${event.name}`;
  container.layoutMode = 'VERTICAL';
  console.log('color');
  console.log(container.fills);

  name.insertCharacters(0, event.name);
  name.setPluginData(NodeMarker.NAME, NodeMarker.NAME);

  triggerTitle.insertCharacters(0, 'Trigger');
  trigger.insertCharacters(0, event.trigger);
  name.setPluginData(NodeMarker.TRIGGER, NodeMarker.TRIGGER);

  descriptionTitle.insertCharacters(0, 'Description');
  description.insertCharacters(0, event.description);
  name.setPluginData(NodeMarker.DESCRIPTION, NodeMarker.DESCRIPTION);

  notesTitle.insertCharacters(0, 'Dev Note');
  notes.insertCharacters(0, event.notes);
  name.setPluginData(NodeMarker.NOTES, NodeMarker.NOTES);

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
