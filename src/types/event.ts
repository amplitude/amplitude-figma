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
