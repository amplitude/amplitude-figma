export enum Tab {
  ADD_EVENT = 'Create Event Label',
  ALL_EVENTS = 'All Events',
  SETTINGS = 'Settings',
  TUTORIAL = 'Tutorial',
}
interface UIOption {
  width: number,
  height: number
}

export const REGULAR_TAB_SIZE: UIOption = { width: 687, height: 400 };
export const TUTORIAL_TAB_SIZE: UIOption = { width: 687, height: 475 };

export const TAB_OPTIONS: { [key in Tab]: UIOption} = {
  [Tab.ADD_EVENT]: REGULAR_TAB_SIZE,
  [Tab.ALL_EVENTS]: REGULAR_TAB_SIZE,
  [Tab.SETTINGS]: REGULAR_TAB_SIZE,
  [Tab.TUTORIAL]: TUTORIAL_TAB_SIZE,
};
