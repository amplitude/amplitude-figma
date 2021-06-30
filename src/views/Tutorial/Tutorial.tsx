/** @jsx h */
import { VerticalSpace, Text, Divider } from '@create-figma-plugin/ui';
import { h, JSX } from 'preact';
import { useEffect } from 'preact/hooks';
import amplitude from 'amplitude-js';

import { AmplitudeLogo } from 'src/assets/AmplitudeLogo';
import { AMPLITUDE_API_KEY } from 'src/constants';

function Tutorial(): JSX.Element {
  useEffect(() => {
    amplitude.getInstance().logEvent('Tab Visited: Tutorial');
  });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <VerticalSpace space='large' />
        <AmplitudeLogo />
        <VerticalSpace space='medium' />
        <Text bold>Welcome to Amplitude's Event Tracker for Figma!</Text>
        <VerticalSpace space='medium' />
        <Text>We hope this plugin helps designers clearly label events for their developers.</Text>
        <VerticalSpace space='large' />
        <Divider />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <VerticalSpace space='large' />
        <Text bold>Create Event Label</Text>
        <VerticalSpace space='medium' />
        <Text>To create an event label, you must first select the layer you’d like the label to reference. All event labels will be created and organized into a framed called “Event Labels”. This will let you easily display, hide, and edit your event labels. </Text>
        <br />
        <Text>Note: Figma users with “viewer” permission are unable to edit the visibility of layers, so if your developers will only have viewer permission, you might want to duplicate your Figma page with one page having the Event Label layer visible and one without.</Text>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <VerticalSpace space='large' />
        <Text bold>Export Events</Text>
        <VerticalSpace space='medium' />
        <Text>You can export your event labels into a CSV file</Text>
        <br />
      </div>
    </div>
  );
}

export default Tutorial;
