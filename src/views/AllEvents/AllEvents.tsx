/** @jsx h */
import { Button, Container, Divider, VerticalSpace, Text } from '@create-figma-plugin/ui';
import { h, JSX } from 'preact';
import { useEffect } from 'preact/hooks';
import amplitude from 'amplitude-js';

import { EventMetadata } from 'src/types/event';
import { exportToCsv } from 'src/services/csv';

export interface Props {
  events: EventMetadata[];
}

interface RowProps {
  event: EventMetadata,
}

function EventsRow(props: RowProps): JSX.Element {
  const { event } = props;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <VerticalSpace />
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ width: '30%' }}>
          <Text>{event.name} </Text>
        </div>
        <div style={{ width: '40%' }}>
          <Text>{event.description} </Text>
        </div>
      </div>
      <VerticalSpace />
      <Divider />
    </div>
  );
}

function AllEvents({ events }: Props): JSX.Element {
  useEffect(() => {
    amplitude.getInstance().logEvent('Tab Visited: All Events');
  });
  const onClickCsvExport = (): void => {
    const eventsCsv = events.map((event) => {
      return {
        Event: event.name,
        Trigger: event.trigger,
        'Event Description': event.description,
        'Dev Notes': event.notes
      };
    });
    amplitude.logEvent('Export to CSV clicked');
    exportToCsv('taxonomy.csv', [...eventsCsv]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '89%' }}>
      <Container style={{ height: '100%', display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
        <VerticalSpace space='medium' />
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <div style={{ width: '30%' }}>
            <Text bold>Event Name </Text>
          </div>
          <div style={{ width: '40%' }}>
            <Text bold>Description </Text>
          </div>
        </div>
        <VerticalSpace />
        {events.map(event =>
          <EventsRow
            event={event}
          />
        )}
        <VerticalSpace space="medium" />
      </Container>
      <Divider />
      <VerticalSpace />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
        <div style={{ width: '8px' }} />
        <Button onClick={onClickCsvExport} disabled={events.length === 0}>
          Export to CSV
        </Button>
      </div>
      <VerticalSpace space='small' />
    </div>
  );
}

export default AllEvents;
