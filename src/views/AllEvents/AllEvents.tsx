/** @jsx h */
import { Container, Divider, Button, VerticalSpace, Text } from '@create-figma-plugin/ui';
import { h, JSX } from 'preact';

import { EventMetadata } from 'src/types/event';
import { CsvDataService } from 'src/services/csv.service';

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
    // TODO: Pass events here! And delete following example
    const data = [
      {
        make: 'Toyota',
        model: 'Celica',
        price: 35000,
        soldOn: new Date(2019, 2, 1),
        lease: false,
        address: '100 main st, Mars'
      },
      {
        make: 'Porsche',
        model: 'Boxter',
        price: 72000,
        soldOn: new Date(2018, 12, 3),
        lease: true,
        address: '100 main st, Mars'
      },
      {
        make: 'Ford',
        model: 'Mondeo',
        price: 32000,
        soldOn: new Date(2018, 7, 23),
        lease: false,
        address: '100 main st, Mars'
      }
    ];
    CsvDataService.exportToCsv('taxonomy.csv', data);
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
