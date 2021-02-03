/** @jsx h */
import { Button, Divider, VerticalSpace, Text, Textbox } from '@create-figma-plugin/ui';
import { emit } from '@create-figma-plugin/utilities';
import { h, JSX, } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import amplitude from 'amplitude-js';

import { InfoIcon } from 'src/assets/InfoIcon';
import { getIsTaxonomyEnabled } from 'src/services/taxonomy';
import { Message } from 'src/types/message';

export interface Props {
  apiKey: string;
  secretKey: string;
  onChangeApiKey: (newKey: string) => void;
  onChangeSecretKey: (newKey: string) => void;
}

export interface ButtonProps {
  apiKey: string;
  secretKey: string;
}

function EligibilityButton(props: ButtonProps): JSX.Element {
  const { apiKey, secretKey } = props;
  const [hasQueried, setHasQueried] = useState(false);

  useEffect(() => {
    // when the api or secret has changed, reset state to allow button pressing
    setHasQueried(false);
  }, [apiKey, secretKey]);

  const checkEligibility = async (): Promise<void> => {
    try {
      const isEligibleResponse = await getIsTaxonomyEnabled(apiKey, secretKey);
      if (isEligibleResponse) {
        emit(Message.NOTIFY_MESSAGE, '✔️ Your Org is eligible and has Amplitude’s Schema Planner!');
      } else {
        emit(Message.NOTIFY_MESSAGE, '✗ Sorry, your Org does not have Amplitude’s Taxonomy Add-on.');
      }
      setHasQueried(true);
    } catch (err) {
      figma.notify('✗ Sorry, your Org does not have Amplitude’s Taxonomy Add-on.');
    }
  };

  return (
    <Button onClick={checkEligibility} disabled={hasQueried}>
        Check Eligibility
    </Button>
  );
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
      <Text>Provide a project’s API and Secret keys to upload your events to Amplitude’s Schema Planner. </Text>
      <VerticalSpace space='extraSmall' />
      <Text muted> Note: Only Orgs with the Taxonomy Add-on can plan events, enter your keys to check. </Text>
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
      <VerticalSpace />
      <Divider />
      <VerticalSpace />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
        <EligibilityButton apiKey={apiKey} secretKey={secretKey} />
      </div>
      <VerticalSpace space='small' />
    </div>
  );
}

export default Settings;
