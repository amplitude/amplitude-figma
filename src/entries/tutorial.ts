import { showUI } from '@create-figma-plugin/utilities';

import { Tab, TUTORIAL_TAB_SIZE } from 'src/types/tab';
import { loadInitialData } from 'src/lib/loader';
import { attachHandlers } from 'src/lib/handlers';

export default async function (): Promise<void> {
  attachHandlers();
  const initialData = await loadInitialData();
  showUI(TUTORIAL_TAB_SIZE, { ...initialData, initialTab: Tab.TUTORIAL });
}
