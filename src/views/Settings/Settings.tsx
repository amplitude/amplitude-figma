/** @jsx h */
import { VerticalSpace, Text, Textbox } from '@create-figma-plugin/ui';
import { emit } from '@create-figma-plugin/utilities';
import { h, JSX } from 'preact';
import { useCallback, useEffect } from 'preact/hooks';
import amplitude from 'amplitude-js';

import { AMPLITUDE_API_KEY } from 'src/constants';
import { InfoIcon } from 'src/assets/InfoIcon';
import { Message } from 'src/types/message';

export interface Props {
  apiKey: string;
  secretKey: string;
  onChangeApiKey: (newKey: string) => void;
  onChangeSecretKey: (newKey: string) => void;
}

function Settings(props: Props): JSX.Element {
  const { apiKey, secretKey, onChangeApiKey, onChangeSecretKey } = props;

  useEffect(() => {
    amplitude.getInstance().logEvent('Tab Visited: Settings');
  }, []);

  const onChange = useCallback((newState: Partial<Props>) => {
    if (newState.apiKey !== undefined) {
      onChangeApiKey(newState.apiKey);
      emit(Message.API_KEY, newState.apiKey);
    }
    if (newState.secretKey !== undefined) {
      onChangeSecretKey(newState.secretKey);
      emit(Message.SECRET_KEY, newState.secretKey);
    }
  }, [onChangeApiKey, onChangeSecretKey]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <VerticalSpace space='medium' />
      <Text bold>API Key</Text>
      <VerticalSpace space='extraSmall' />
      <Textbox name="apiKey" onChange={onChange} value={apiKey} />
      <VerticalSpace space='medium' />
      <Text bold>Secret Key </Text>
      <VerticalSpace space='extraSmall' />
      <Textbox name="secretKey" onChange={onChange} value={secretKey} type="password" />
      <div style={{ height: '100px' }} />
      <a
        href="https://help.amplitude.com/hc/articles/235649848-Settings#h_01EHZSMMDAXC77MH5K65DKZSHF"
        target="_blank"
        rel="noreferrer"
        style={{ display: 'flex', fill: '#007FD2', alignItems: 'center' }}
      >
        <InfoIcon />
        <div style={{ width: '4px' }} />
        <Text style={{ textDecoration: 'underline #007FD2', color: '#007FD2' }}>How can I find the API and Secret Keys?</Text>
      </a>
    </div>
  );
}

export default Settings;
