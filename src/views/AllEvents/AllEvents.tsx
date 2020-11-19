/** @jsx h */
import { Divider, Button, Inline, VerticalSpace, Text } from '@create-figma-plugin/ui';
import { h, JSX } from 'preact';

import { EventMetadata } from 'src/types/event';

export interface Props {
  events: EventMetadata[];
}

function AllEvents({ events }: Props): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '89%' }}>
      <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
        <VerticalSpace space='medium' />
        <Text bold>Name</Text>
        <VerticalSpace space='extraSmall' />
        <VerticalSpace space='medium' />
        <Inline space="extraSmall">
          <Text bold>Description </Text>
          <Text muted>(optional)</Text>
        </Inline>
        <VerticalSpace space='extraSmall' />
        <VerticalSpace space='medium' />
        <Inline space="extraSmall">
          <Text bold>Note for Developer </Text>
          <Text muted>(optional)</Text>
        </Inline>
        <VerticalSpace space='extraSmall' />
        <VerticalSpace space='medium' />
      </div>
      <Divider />
      <VerticalSpace space='small' />
      <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'end', width: '100%' }}>
        <Button onClick={() => {
          // noop for rn
        }}>Add Event</Button>
      </div>
      <VerticalSpace space='small' />
    </div>
  );
}

export default AllEvents;
