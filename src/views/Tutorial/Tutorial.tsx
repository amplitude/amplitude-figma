/** @jsx h */
import { VerticalSpace } from '@create-figma-plugin/ui';
import { h, JSX } from 'preact';
import { AmplitudeLogo } from 'src/assets/amplitudeLogo';

function AddEvent(): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <VerticalSpace space='medium' />
      <AmplitudeLogo />
      {/* <Text bold>API Key</Text>
      <VerticalSpace space='extraSmall' />
      <Textbox name="event" onChange={setState} value={state.apiKey} />
      <VerticalSpace space='medium' />
      <Text bold>Secret Key </Text>
      <VerticalSpace space='extraSmall' />
      <Textbox name="description" onChange={setState} value={state.secretKey} />
      <VerticalSpace space='medium' /> */}
    </div>
  );
}

export default AddEvent;
