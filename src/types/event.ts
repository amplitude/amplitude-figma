export enum Trigger {
  ON_CLICK = 'On click',
  ON_HOVER = 'On hover',
  ON_LOAD = 'On load',
}

export interface EventMetadata {
  name: string;
  triggerType: Trigger;
  description: string;
  notes: string;
}
