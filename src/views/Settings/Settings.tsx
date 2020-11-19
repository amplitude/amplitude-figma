/** @jsx h */
import { Container, VerticalSpace, Text, Textbox } from '@create-figma-plugin/ui';
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
      <Textbox name="apiKey" onChange={onChange} value={state.apiKey} />
      <VerticalSpace space='medium' />
      <Text bold>Secret Key </Text>
      <VerticalSpace space='extraSmall' />
      <Textbox name="secretKey" onChange={onChange} value={state.secretKey} />
      <div style={{ height: '100px' }} />
      <a href="https://help.amplitude.com/hc/articles/235649848-Settings#h_01EHZSMMDAXC77MH5K65DKZSHF" target="_blank" rel="noreferrer">
        <Text style={{ color: '#007FD2', textDecoration: 'underline #007FD2' }}>How can I find the API and Secret Keys?</Text>
      </a>
    </div>
  );
}

export default AddEvent;
