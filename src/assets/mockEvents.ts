import { EventMetadata } from 'src/types/event';

export const MOCK_EVENTS: EventMetadata[] = [
  {
    name: 'Checkout Clicked',
    description: 'When the checkout button is clicked',
    notes: 'Should have A/B test information'
  },
  {
    name: 'Add to Cart',
    description: 'Ex: “user clicks on the Add to Cart button”',
    notes: 'Ex: “user clicks on the Add to Cart button”'
  },
];
