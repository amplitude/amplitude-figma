
import { on } from '@create-figma-plugin/utilities';

import { EventMetadata, NodeMarker } from 'src/types/event';
import { Message } from 'src/types/message';
import { Tab, TAB_OPTIONS } from 'src/types/tab';

const PADDING_HORIZONTAL = 18;
const PADDING_VERTICAL = 16;
function createFillsColor(r: number, g: number, b: number): readonly SolidPaint[] {
  return [{
    blendMode: 'NORMAL',
    color: { r, g, b },
    opacity: 1,
    type: 'SOLID',
    visible: true
  }];
}

function createLogo(): VectorNode {
  const logo = figma.createVector();
  logo.vectorPaths = [{
    windingRule: 'NONZERO',
    data: 'M 7.0666649 3.97077822 C 7.17578342 4.12965661 7.36439686 4.48637425 7.64353824 5.28304235 C 7.83449568 5.82811514 8.04287168 6.50331034 8.26329114 7.29113926 C 7.42707936 7.27907539 6.58096621 7.27000858 5.76172844 7.26135904 L 5.34683544 7.25692045 C 5.81551979 5.5369519 6.38730094 4.23185775 6.80518451 3.92369893 C 6.83189837 3.90761382 6.87332301 3.8886076 6.91870822 3.8886076 C 6.97359085 3.8886076 7.02309837 3.91687034 7.0666649 3.97077822 Z M 13.63739 8.15010848 C 13.636818 8.1506016 13.6362461 8.15105357 13.6356332 8.15158765 C 13.6270945 8.15853178 13.6183105 8.16510598 13.6092815 8.17139258 C 13.6063399 8.17344704 13.6034392 8.1755015 13.6004976 8.17751482 C 13.5944101 8.18145939 13.5881592 8.18519846 13.5818675 8.18885536 C 13.5761478 8.19226579 13.5704688 8.1956761 13.5645857 8.19884 C 13.5642588 8.19900435 13.5638911 8.19912762 13.5635643 8.19929197 C 13.5051411 8.23010874 13.438751 8.24773581 13.3681937 8.24773581 L 9.61047616 8.24773581 C 9.64054573 8.37297498 9.67335264 8.51522496 9.70901939 8.67013024 C 9.91497158 9.56447238 10.4620255 11.9403177 11.0432347 11.9403177 L 11.0545924 11.9406054 L 11.0609251 11.9397014 L 11.0720378 11.9397425 C 11.526023 11.9397014 11.757755 11.2796074 12.2655878 9.83339955 L 12.2717161 9.81589568 C 12.3533044 9.58366093 12.4453924 9.3215545 12.544998 9.04428621 L 12.5703692 8.97357222 L 12.5708186 8.97373651 C 12.5967209 8.90458387 12.6629476 8.85531821 12.740818 8.85531821 C 12.8412406 8.85531821 12.9226246 8.93716736 12.9226246 9.03816403 C 12.9226246 9.05648973 12.9198872 9.07415795 12.9148621 9.09084006 L 12.9149437 9.09088115 L 12.8938215 9.1619239 C 12.8407912 9.33412774 12.7845741 9.56854022 12.7194506 9.83993274 C 12.4167937 11.1014046 11.9595399 13.0071923 10.7864175 13.0071923 L 10.7778787 13.0071512 C 10.0198474 13.0011112 9.56631149 11.7824129 9.37261594 11.2619802 C 9.01035098 10.2888706 8.73629286 9.25199091 8.47199923 8.24773581 L 5.01297564 8.24773581 L 4.29494171 10.5590716 L 4.284401 10.5507305 C 4.21874636 10.6546444 4.10357495 10.7212086 3.97647375 10.7212086 C 3.77599624 10.7212086 3.61208432 10.5571404 3.6111855 10.3555169 L 3.61163491 10.3429848 L 3.65510508 10.0815768 C 3.75430202 9.48767712 3.87315042 8.87113741 4.00866783 8.24773581 L 2.54792336 8.24773581 L 2.54253044 8.24214778 C 2.27737881 8.2037296 2.07375543 7.96857754 2.07375543 7.6943088 C 2.07375543 7.42538163 2.2629977 7.19647507 2.52373695 7.14996237 C 2.54771909 7.14688064 2.59596933 7.14273069 2.69463516 7.14273069 C 2.7157574 7.14273069 2.73937183 7.14289504 2.76560101 7.14334707 C 3.22865627 7.15140045 3.71973834 7.15879648 4.25853954 7.16569939 C 5.02106496 4.05004752 5.90411389 2.46845161 6.88362246 2.46397292 C 7.93479136 2.46397292 8.7144761 4.87104588 9.33858336 7.2256071 L 9.34107558 7.23497542 C 10.6234452 7.2607792 11.9903857 7.29837562 13.3190446 7.39407181 L 13.3747306 7.39929011 C 13.3961388 7.39961888 13.416975 7.40175546 13.4374845 7.40516582 L 13.445247 7.40590541 C 13.4475757 7.4062752 13.4497411 7.40697376 13.452029 7.40738458 C 13.4531729 7.40763117 13.4543578 7.40791878 13.4555018 7.40816531 C 13.6489112 7.44711763 13.7924363 7.61784224 13.7924363 7.82271174 C 13.7924363 7.9539088 13.7320111 8.07212173 13.63739 8.15010848 M 7.93307546 0.0267817784 C 3.55178173 0.0267817784 1.63421655e-05 3.59884975 1.63421655e-05 8.00518778 C 1.63421655e-05 12.4115258 3.55178173 15.9835938 7.93307546 15.9835938 C 12.3143692 15.9835938 15.8661754 12.4115258 15.8661754 8.00518778 C 15.8661754 3.59884975 12.3143692 0.0267817784 7.93307546 0.0267817784'
  }];

  return logo;
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
  container.x = clientNode.x + clientNode.width + PADDING_HORIZONTAL;
  container.y = clientNode.y;
  container.horizontalPadding = PADDING_HORIZONTAL;
  container.verticalPadding = PADDING_VERTICAL;
  container.name = `event: ${event.name}`;
  container.layoutMode = 'VERTICAL';

  const name = createTextNode(event.name);
  name.fontSize = 16;
  name.setPluginData(NodeMarker.NAME, NodeMarker.NAME);

  const triggerTitle = createTextNode('Trigger');
  const trigger = createTextNode(event.trigger);
  trigger.fontSize = 14;
  trigger.setPluginData(NodeMarker.TRIGGER, NodeMarker.TRIGGER);

  const descriptionTitle = createTextNode('Description');
  const description = createTextNode(event.description);
  description.fontSize = 14;
  description.setPluginData(NodeMarker.DESCRIPTION, NodeMarker.DESCRIPTION);

  const notesTitle = createTextNode('Dev Note');
  const notes = createTextNode(event.notes);
  notes.fontSize = 14;
  notes.setPluginData(NodeMarker.NOTES, NodeMarker.NOTES);

  // #60758B
  const gray = createFillsColor(0.37647, 0.45882, 0.54510);

  triggerTitle.fills = gray;
  descriptionTitle.fills = gray;
  notesTitle.fills = gray;

  container.appendChild(createLogo());
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
