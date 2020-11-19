/** @jsx h */
import { Divider, Button, Inline, moveDownIcon, VerticalSpace, Text, Textbox, DropdownMenu } from '@create-figma-plugin/ui';
import { emit } from '@create-figma-plugin/utilities';
import { h, JSX } from 'preact';
import { useState, useCallback } from 'preact/hooks';

import { EventMetadata, Trigger } from 'src/types/event';
import { Message } from 'src/types/message';

export interface Props {
  onAddEvent: (event: EventMetadata) => void;
}

const noop = (..._: any[]): any => {
  // Do nothing
};

const INITIAL_STATE: EventMetadata = { name: '', trigger: Trigger.ON_CLICK, description: '', notes: '' };

const TRIGGER_OPTIONS = [
  { value: Trigger.ON_CLICK },
  { value: Trigger.ON_HOVER },
  { value: Trigger.ON_LOAD }
];

function AddEvent({ onAddEvent }: Props): JSX.Element {
  const [state, setState] = useState(INITIAL_STATE);

  const onChange = useCallback((newState: Partial<EventMetadata>) => {
    setState((oldState: EventMetadata): EventMetadata => {
      return {
        ...oldState,
        ...newState,
      };
    });
  }, []);

  const onClickAdd = (): void => {
    const event = { ...state };
    emit(Message.ADD_EVENT, event);
    onAddEvent(event);
    setState(INITIAL_STATE); // reset state
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '89%' }}>
      <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
        <VerticalSpace space='medium' />
        <Text bold>Event Trigger</Text>
        <VerticalSpace space='extraSmall' />
        <DropdownMenu name="trigger" onChange={onChange} options={TRIGGER_OPTIONS} value={state.trigger}>
          <Button secondary onClick={noop}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              {state.trigger}
              {moveDownIcon}
            </div>
          </Button>
        </DropdownMenu>
        <VerticalSpace space='medium' />
        <Text bold>Name</Text>
        <VerticalSpace space='extraSmall' />
        <Textbox name="name" onChange={onChange} value={state.name} placeholder="button.clicked" />
        <VerticalSpace space='medium' />
        <Inline space="extraSmall">
          <Text bold>Description </Text>
          <Text muted>(optional)</Text>
        </Inline>
        <VerticalSpace space='extraSmall' />
        <Textbox name="description" onChange={onChange} value={state.description} placeholder="Ex: “user clicks on the Add to Cart button”" />
        <VerticalSpace space='medium' />
        <Inline space="extraSmall">
          <Text bold>Note for Developer </Text>
          <Text muted>(optional)</Text>
        </Inline>
        <VerticalSpace space='extraSmall' />
        <Textbox name="notes" onChange={onChange} value={state.notes} placeholder="Ex: “user clicks on the Add to Cart button”" />
        <VerticalSpace space='medium' />
      </div>
      <Divider />
      <VerticalSpace space='small' />
      <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'end', width: '100%' }}>
        <Button disabled={state.name.length === 0} onClick={onClickAdd}>Add Event</Button>
      </div>
      <VerticalSpace space='small' />
    </div>
  );
}

export default AddEvent;
