/** @jsx h */
import { Container, Divider, Button, VerticalSpace, Text } from '@create-figma-plugin/ui';
import { h, JSX } from 'preact';

import { EventMetadata } from 'src/types/event';
import { CsvDataService } from 'src/services/csv.service';
import { ApiService } from 'src/services/api.service';

export interface Props {
  events: EventMetadata[];
}

function EventsRow({ event }: {event: EventMetadata}): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <VerticalSpace />
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ width: '30%' }}>
          <Text>{event.name} </Text>
        </div>
        <div style={{ width: '70%' }}>
          <Text>{event.description} </Text>
        </div>
      </div>
      <VerticalSpace />
      <Divider />
    </div>
  );
}

function AllEvents({ events }: Props): JSX.Element {
  const onClickCsvExport = (): void => {
    // CsvDataService.exportToCsv('taxonomy.csv', events as any[]);

    ApiService.createEventType("9862ba8f60bb7b9c97adec8dd88d0153", "cf582a1547675a7bc806907994a48e09", "hack type", "hack desc")
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '89%' }}>
      <Container style={{ height: '100%', display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
        <VerticalSpace space='medium' />
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <div style={{ width: '30%' }}>
            <Text bold>Event Name </Text>
          </div>
          <div style={{ width: '70%' }}>
            <Text bold>Description </Text>
          </div>
        </div>
        <VerticalSpace />
        {events.map(event => <EventsRow event={event} />)}
        <VerticalSpace space="medium" />
      </Container>
      <Divider />
      <VerticalSpace />
      <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'end', width: '100%' }}>
        <Button onClick={onClickCsvExport}>Export to CSV</Button>
      </div>
      <VerticalSpace space='small' />
    </div>
  );
}

export default AllEvents;
