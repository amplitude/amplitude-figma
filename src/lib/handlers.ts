
import { on } from '@create-figma-plugin/utilities';

import { createLabel } from 'src/lib/draw';
import { EventMetadata, } from 'src/types/event';
import { Message } from 'src/types/message';
import { Tab, TAB_OPTIONS } from 'src/types/tab';

export function attachHandlers(): void {
  on(Message.ADD_EVENT, (event: EventMetadata) => {
    if (figma.currentPage.selection.length === 0) {
      figma.notify('Please select an element');
    } else if (figma.currentPage.selection.length > 1) {
      figma.notify('Please group multiple elements into a single frame');
    } else {
      createLabel(event, figma.currentPage.selection[0]).then(
        () => figma.notify(`✔️ Event '${event.name}' added!`),
        () => figma.notify(`✗ Issue creating event: '${event.name}'`)
      );
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
