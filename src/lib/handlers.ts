
import { on } from '@create-figma-plugin/utilities';

import { EventMetadata } from 'src/types/event';
import { Message } from 'src/types/message';
import { Tab, TAB_OPTIONS } from 'src/types/tab';

function createLabel(event: EventMetadata): void {
  console.log(event);
  console.log(figma.currentPage.selection);
  const container = figma.createFrame();
  const rect = figma.createRectangle();
  const name = figma.createText();
  const description = figma.createText();
  const notes = figma.createText();
  figma.loadFontAsync({ family: 'Roboto', style: 'Regular' }).then(() => {
    name.insertCharacters(0, event.name);
    description.insertCharacters(0, event.description);
    notes.insertCharacters(0, event.notes);
    container.appendChild(rect);
    container.appendChild(name);
    container.appendChild(description);
    container.appendChild(notes);
    figma.currentPage.appendChild(container);
  }).catch(() => console.error('problem loading font'));
}

export function attachHandlers(): void {
  on(Message.ADD_EVENT, (event: EventMetadata) => {
    if (figma.currentPage.selection.length === 0) {
      figma.notify('Please select an element');
    } else if (figma.currentPage.selection.length > 1) {
      figma.notify('Please group multiple elements into a single frame');
    } else {
      createLabel(event);
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
