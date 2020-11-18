/** @jsx h */
import { VerticalSpace, Text, Textbox } from '@create-figma-plugin/ui';
import { emit } from '@create-figma-plugin/utilities';
import { h, JSX } from 'preact';
import { useState, useCallback } from 'preact/hooks';

import { Message } from 'src/types/message';

export interface Props {
  initialApiKey: string;
  initialSecretKey: string;
}

export interface State {
  apiKey: string;
  secretKey: string;
}

function AddEvent({ initialApiKey, initialSecretKey }: Props): JSX.Element {
  const [state, setState] = useState({ apiKey: initialApiKey, secretKey: initialSecretKey });
  const onChange = useCallback((newState: Partial<State>) => {
    if ('apiKey' in newState) {
      emit(Message.API_KEY, newState.apiKey);
    }
    if ('secretKey' in newState) {
      emit(Message.SECRET_KEY, newState.secretKey);
    }

    setState((oldState) => {
      return {
        ...oldState,
        ...newState,
      };
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <VerticalSpace space='medium' />
      <Text bold>API Key</Text>
      <VerticalSpace space='extraSmall' />
      <Textbox name="event" onChange={onChange} value={state.apiKey} />
      <VerticalSpace space='medium' />
      <Text bold>Secret Key </Text>
      <VerticalSpace space='extraSmall' />
      <Textbox name="description" onChange={onChange} value={state.secretKey} />
      <VerticalSpace space='medium' />
    </div>
  );
}

export default AddEvent;
