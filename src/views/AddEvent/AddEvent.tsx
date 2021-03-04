/** @jsx h */
import { Divider, Button, Inline, VerticalSpace, Text, Textbox, DropdownMenu } from '@create-figma-plugin/ui';
import { h, JSX } from 'preact';
import { StateUpdater, useCallback, useEffect } from 'preact/hooks';
import amplitude from 'amplitude-js';

import { CaretDown } from 'src/assets/CaretDown';
import { EventMetadata, Trigger } from 'src/types/event';
import { AMPLITUDE_API_KEY } from 'src/constants';

export interface Props {
  event: EventMetadata;
  setEvent: StateUpdater<EventMetadata>;
  onAddEvent: () => void;
}

const noop = (..._: any[]): any => {
  // Do nothing
};

const TRIGGER_OPTIONS = [
  { value: Trigger.ON_CLICK },
  { value: Trigger.ON_HOVER },
  { value: Trigger.ON_LOAD }
];

function AddEvent(props: Props): JSX.Element {
  const { event, setEvent, onAddEvent } = props;

  useEffect(() => {
    amplitude.getInstance().init(AMPLITUDE_API_KEY);
    amplitude.getInstance().logEvent('Tab Visited: Add Event');
  }, []);

  const onChange = useCallback((newState: Partial<EventMetadata>) => {
    setEvent((oldState: EventMetadata): EventMetadata => {
      return {
        ...oldState,
        ...newState,
      };
    });
  }, [setEvent]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '89%' }}>
      <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
        <VerticalSpace space='medium' />
        <Text bold>Event Trigger</Text>
        <VerticalSpace space='small' />
        <DropdownMenu name="trigger" onChange={onChange} options={TRIGGER_OPTIONS} value={event.trigger}>
          <Button secondary onClick={noop} style={{ borderRadius: '3px', width: '100px', }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              {event.trigger}
              <CaretDown />
            </div>
          </Button>
        </DropdownMenu>
        <VerticalSpace space='medium' />
        <Text bold>Name</Text>
        <VerticalSpace space='extraSmall' />
        <Textbox name="name" onChange={onChange} value={event.name} placeholder="button.clicked" />
        <VerticalSpace space='medium' />
        <Inline space="extraSmall">
          <Text bold>Description </Text>
          <Text muted>(optional)</Text>
        </Inline>
        <VerticalSpace space='extraSmall' />
        <Textbox name="description" onChange={onChange} value={event.description} placeholder="Ex: “user clicks on the Add to Cart button”" />
        <VerticalSpace space='medium' />
        <Inline space="extraSmall">
          <Text bold>Note for Developer </Text>
          <Text muted>(optional)</Text>
        </Inline>
        <VerticalSpace space='extraSmall' />
        <Textbox name="notes" onChange={onChange} value={event.notes} placeholder="Ex: “user clicks on the Add to Cart button”" />
        <VerticalSpace space='medium' />
      </div>
      <Divider />
      <VerticalSpace space='small' />
      <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'end', width: '100%' }}>
        <Button disabled={event.name.length === 0} onClick={onAddEvent}>Add Event</Button>
      </div>
      <VerticalSpace space='small' />
    </div>
  );
}

export default AddEvent;
