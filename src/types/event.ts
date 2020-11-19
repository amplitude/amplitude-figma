export enum Trigger {
  ON_CLICK = 'On click',
  ON_HOVER = 'On hover',
  ON_LOAD = 'On load',
}

export interface EventMetadata {
  name: string;
  trigger: Trigger;
  description: string;
  notes: string;
}

// Markers put on the nodes of an event label to show which nodes are
// showing the data of an event. Used to load the events back into the "view events" UI.
export enum NodeMarker {
  NAME = 'name',
  TRIGGER = 'trigger',
  DESCRIPTION = 'description',
  NOTES = 'notes',
}

export type PluginData = {
  [key in NodeMarker]: string
};

export const MOCK_EVENTS: EventMetadata[] = [
  {
    name: 'Checkout Clicked',
    trigger: Trigger.ON_CLICK,
    description: 'When the checkout button is clicked',
    notes: 'Should have A/B test information'
  },
  {
    name: 'Add to Cart',
    trigger: Trigger.ON_CLICK,
    description: 'Ex: “user clicks on the Add to Cart button”',
    notes: 'Ex: “user clicks on the Add to Cart button”'
  },
];
