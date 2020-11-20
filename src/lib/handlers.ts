
import { on } from '@create-figma-plugin/utilities';

import { EventMetadata, NodeMarker } from 'src/types/event';
import { Message } from 'src/types/message';
import { Tab, TAB_OPTIONS } from 'src/types/tab';

const OFFSET_X = 32;
const OFFSET_Y = 16;
const PADDING_HORIZONTAL = 18;
const PADDING_VERTICAL = 16;

function createPaint(r: number, g: number, b: number, opacity = 1): readonly SolidPaint[] {
  return [{
    blendMode: 'NORMAL',
    color: { r, g, b },
    opacity,
    type: 'SOLID',
    visible: true
  }];
}

const BRACKET_PADDING = 12;
const BRACKET_WIDTH = 16;

function createBracket(node: SceneNode): VectorNode {
  const bracket = figma.createVector();
  const maxX = BRACKET_WIDTH + BRACKET_PADDING;
  const maxY = node.height + 2 * BRACKET_PADDING;
  bracket.vectorPaths = [{ windingRule: 'NONZERO', data: `M 0 ${maxY} L ${maxX} ${maxY} L ${maxX} 0 L 0 0` }];
  bracket.strokes = createPaint(0, 0.49803921580314636, 0.8235294222831726);
  bracket.strokeCap = 'NONE';
  bracket.strokeWeight = 2;
  bracket.x = node.x + node.width - BRACKET_WIDTH;
  bracket.y = node.y - BRACKET_PADDING;

  return bracket;
}

function createLogo(): VectorNode {
  const logo = figma.createVector();
  // Note(Kelvin): Taken by finding the Amplitude Asset and printing its SVG node attributes
  logo.vectorPaths = [{ windingRule: 'EVENODD', data: 'M 6.680889213394365 3.707499816781527 C 6.784052194696425 3.8568528897808543 6.962363498365654 4.192179783260579 7.226230818026929 4.941080917080751 C 7.40678117562303 5.453465768669198 7.60378919583337 6.088148664157556 7.81217236626427 6.828747376227316 C 7.021599038242192 6.817436851296278 6.22170802027766 6.808893671224962 5.447174872504867 6.800771751398772 L 5.054925522530969 6.796620648102262 C 5.498024159640025 5.179763045346534 6.038591765432036 3.9529260355917377 6.433660600012848 3.6632442361151383 C 6.458891665255743 3.648125433177574 6.498100004734063 3.6302574521723288 6.540998864786492 3.6302574521723288 C 6.592852633209188 3.6302574521723288 6.639684527145201 3.6568250556459176 6.680889213394365 3.707499816781527 Z M 12.892873313480882 7.636246841106973 C 12.892328758148865 7.636667977664613 12.891784869375696 7.637089272158426 12.89124031404368 7.637630733456826 C 12.883132490321016 7.644128269317777 12.874842761893488 7.650324993852117 12.866311394720007 7.656220905939232 C 12.863528111802356 7.658146101651313 12.860805041625346 7.660071108400292 12.858021758707695 7.661996304112372 C 12.85227367473362 7.665726371005887 12.846344973105639 7.669215905661852 12.840415370429284 7.6726451606684485 C 12.834969817250004 7.675833766053449 12.829645017513329 7.679082656971029 12.824078451678027 7.682030613014586 C 12.823775920918452 7.682211100125725 12.823412723407346 7.682331423019228 12.823110192647771 7.682451747751233 C 12.767868076618544 7.711450008943615 12.705123346095188 7.727994543379021 12.638385065498857 7.727994543379021 L 9.08582710363603 7.727994543379021 C 9.11426499271161 7.845732299445962 9.145243653367642 7.979473148610799 9.178945578610746 8.125066077225936 C 9.373654362301217 8.96577501394985 9.890861348538245 11.199182118856234 10.440378209594035 11.199182118856234 L 10.451087916150383 11.199423095136058 L 10.457077504192135 11.198580825662766 L 10.467606022825063 11.198640495979674 C 10.896776126836933 11.198580333613672 11.115869256275507 10.578066474798549 11.595985552667406 9.218577419864678 L 11.601793952785735 9.20215316513546 C 11.678878784197297 8.983823940081134 11.765947163956989 8.737458505462435 11.860155236888783 8.476774973901886 L 11.884114743118994 8.410295929581682 L 11.88453828431578 8.410476088038504 C 11.909043274749559 8.345440570525495 11.971667261409934 8.299176029423894 12.04524273988454 8.299176029423894 C 12.14017688987948 8.299176029423894 12.217141608556378 8.376063438124483 12.217141608556378 8.471059819798704 C 12.217141608556378 8.488266256816857 12.2145397110715 8.504871182122313 12.209820231574323 8.520573560266179 L 12.209880242861061 8.520573560266179 L 12.189913795325351 8.587353824936164 C 12.139754196197861 8.749250762192673 12.086629200104847 8.969625273422016 12.025033939075465 9.224713708704508 C 11.738900358327008 10.410574118527894 11.306644451591087 12.202088675292956 10.197566773135408 12.202088675292956 L 10.189459479109725 12.202029004976046 C 9.472824672601886 12.196373742510527 9.044077695045338 11.050702360748987 8.860925574079126 10.561522162244204 C 8.518460779738959 9.646753397344794 8.25937351775007 8.67206243794861 8.009483129711704 7.727994543379021 L 4.739295005868411 7.727994543379021 L 4.0604582938868115 9.900758317927426 L 4.0504929580986575 9.892877246071054 C 3.988425748330647 9.990580935287847 3.879539086870569 10.053149422276583 3.759373878394821 10.053149422276583 C 3.5698444221817103 10.053149422276583 3.4148819675243725 9.898953470138755 3.4140288308070246 9.70938184152696 L 3.4144523720038116 9.697590068900857 L 3.4555543331034184 9.451886637719934 C 3.5493328150227104 8.893579883177761 3.6616925440496306 8.314036161627305 3.789814315076951 7.727994543379021 L 2.4088159753892175 7.727994543379021 L 2.4037153045322754 7.722760194329393 C 2.15303833225749 7.686662774622833 1.9605320962288677 7.46556610329345 1.9605320962288677 7.207770360468385 C 1.9605320962288677 6.954968097991819 2.1394426922986667 6.739767158331113 2.3859447507627394 6.696029116360638 C 2.4086224556693066 6.693141322582403 2.4542380458767052 6.689230716504336 2.5475143209626734 6.689230716504336 C 2.567487399853761 6.689230716504336 2.589808066455816 6.689411446893211 2.6146095361781505 6.689832583450851 C 3.0523836141682033 6.6974130417685265 3.516659275052116 6.704331540352273 4.026042397974081 6.7108290762132246 C 4.746942910608957 3.7820168544165145 5.581782785300774 2.295260498931 6.507841474800453 2.291049133074446 C 7.501594482577685 2.291049133074446 8.238740995421832 4.553785704843379 8.828736443123342 6.767141216537001 L 8.831095925349036 6.775985046006579 C 10.043457644533913 6.800230480394198 11.335809071398428 6.8355457940134 12.591916710489011 6.925548695339121 L 12.644556995527235 6.930422153722059 C 12.664826555960909 6.930722965573959 12.68449030083206 6.932767970230373 12.7039127743641 6.935956575615373 L 12.711234151346156 6.9366789307018015 C 12.713412372674219 6.936979742553701 12.715470213319838 6.937641112740966 12.7176484346479 6.938062249298606 C 12.718737545311932 6.938242736409745 12.71982647692148 6.938543954921024 12.72091558758551 6.9387846043850345 C 12.903765163669243 6.975363324455398 13.039479732918998 7.135876127309987 13.039479732918998 7.328455871429133 C 13.039479732918998 7.451788723774131 12.982361908042513 7.5629089152908895 12.892873313480882 7.636246841106973 Z M 7.4999607618509785 0 C 3.3578672104099576 0 0 3.357877946814776 0 7.499978771137254 C 0 11.64209766868072 3.3578672104099576 15.000000000000002 7.4999607618509785 15.000000000000002 C 11.642090666283003 15.000000000000002 15 11.64209766868072 15 7.499978771137254 C 15 3.357877946814776 11.642090666283003 0 7.4999607618509785 0 Z' }];
  logo.strokes = createPaint(1, 1, 1);
  logo.strokeCap = 'NONE';
  logo.strokeWeight = 0.25;
  logo.fills = createPaint(0, 0.49803921580314636, 0.8235294222831726);

  return logo;
}

function createTextNode(str: string): TextNode {
  const text = figma.createText();
  text.fontName = { family: 'Inter', style: 'Regular' };
  text.insertCharacters(0, str);
  return text;
}

function createDetailFrame(title: string, data: string): FrameNode {
  const gray = createPaint(0.37647, 0.45882, 0.54510);
  const container = figma.createFrame();
  const titleTextNode = createTextNode(title);
  const dataTextNode = createTextNode(data);
  titleTextNode.fills = gray;
  dataTextNode.fontSize = 14;

  container.layoutMode = 'VERTICAL';
  container.name = `${title} group`;
  container.itemSpacing = 4;

  // Lets content stretch to fill parent container
  container.layoutAlign = 'STRETCH';
  titleTextNode.layoutAlign = 'STRETCH';
  dataTextNode.layoutAlign = 'STRETCH';

  container.appendChild(titleTextNode);
  container.appendChild(dataTextNode);
  return container;
}

function createDivider(): LineNode {
  const blue = createPaint(0.77647, 0.81569, 0.85098);
  const divider = figma.createLine();
  divider.strokes = blue;
  divider.layoutAlign = 'STRETCH';
  return divider;
}

function addToAmplitudeGroup(newLabel: GroupNode): void {
  let groupedLabels = figma.currentPage.findOne(n => n.name === 'Amplitude Event Labels') as (GroupNode | null);
  if (groupedLabels === null) {
    groupedLabels = figma.group([newLabel], figma.currentPage);
    groupedLabels.name = 'Amplitude Event Labels';
    groupedLabels.locked = true;
    groupedLabels.expanded = false;
    figma.currentPage.setPluginData('event_group', groupedLabels.id);
  } else {
    groupedLabels.appendChild(newLabel);
  }
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
  container.horizontalPadding = PADDING_HORIZONTAL;
  container.verticalPadding = PADDING_VERTICAL;
  container.itemSpacing = 16;
  container.name = 'Label';
  container.layoutMode = 'VERTICAL';

  container.x = clientNode.x + clientNode.width + OFFSET_X;
  container.y = clientNode.y - OFFSET_Y;
  container.strokes = createPaint(0, 0.49804, 0.82353);
  container.strokeWeight = 2;

  const pluginData: {[key: string]: string} = {};

  const name = createTextNode(event.name);
  name.fontSize = 16;
  name.setPluginData(NodeMarker.NAME, NodeMarker.NAME);

  const nameContainer = figma.createFrame();
  nameContainer.layoutMode = 'HORIZONTAL';
  nameContainer.itemSpacing = 4;
  nameContainer.appendChild(createLogo());
  nameContainer.appendChild(name);
  nameContainer.counterAxisSizingMode = 'AUTO';
  pluginData[NodeMarker.NAME] = name.id;

  const trigger = createDetailFrame('Trigger', event.trigger);
  pluginData[NodeMarker.TRIGGER] = trigger.children[1].id;

  const description = createDetailFrame('Description', event.description);
  pluginData[NodeMarker.DESCRIPTION] = description.children[1].id;

  const notes = createDetailFrame('Dev Notes', event.notes);
  pluginData[NodeMarker.NOTES] = notes.children[1].id;

  container.appendChild(nameContainer);
  container.appendChild(trigger);
  container.appendChild(description);
  container.appendChild(createDivider());
  container.appendChild(notes);
  container.resize(250, container.height);
  const group = figma.group([container, createBracket(clientNode)], figma.currentPage);
  group.name = `${event.name}`;
  addToAmplitudeGroup(group);

  // Store label with event data and associated client node id
  group.setPluginData('eventMetadata', JSON.stringify(pluginData));
  group.setPluginData('clientNodeId', clientNode.id);
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
