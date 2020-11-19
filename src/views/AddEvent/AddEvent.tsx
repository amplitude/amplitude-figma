/** @jsx h */
import { Divider, Button, Inline, VerticalSpace, Text, Textbox } from '@create-figma-plugin/ui';
import { emit } from '@create-figma-plugin/utilities';
import { h, JSX } from 'preact';
import { useState, useCallback } from 'preact/hooks';

import { EventMetadata, Trigger } from 'src/types/event';
import { Message } from 'src/types/message';

export interface Props {
  onAddEvent: (event: EventMetadata) => void;
}

const INITIAL_STATE: EventMetadata = { name: '', trigger: Trigger.ON_CLICK, description: '', notes: '' };

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
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '80%' }}>
      <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
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
        <Button onClick={onClickAdd}>Add Event</Button>
      </div>
      <VerticalSpace space='small' />
    </div>
  );
}

export default AddEvent;
