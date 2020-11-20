/** @jsx h */
import { Container, Divider, Button, VerticalSpace, Text } from '@create-figma-plugin/ui';
import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';

import { EventMetadata } from 'src/types/event';
import { CsvDataService } from 'src/services/csv.service';
import { ApiService } from 'src/services/api.service';

export interface Props {
  apiKey: string,
  secretKey: string,
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

function AllEvents({ events, apiKey, secretKey }: Props): JSX.Element {
  const [isSavingTaxonomy, setIsSavingTaxonomy] = useState(false);
  const onClickCsvExport = (): void => {
    const eventsCsv = events.map((event) => {
      return {
        Event: event.name,
        'Event Description': event.description,
      };
    });

    CsvDataService.exportToCsv('taxonomy.csv', [...eventsCsv]);
  };

  const onClickTaxonomyExport = async (): Promise<void> => {
    try {
      setIsSavingTaxonomy(true);
      await Promise.all(events.map(async (event) => {
        return await ApiService.createEventType(
          apiKey,
          secretKey,
          event.name,
          event.description
        );
      }));
    } finally {
      // TODO(Kelvin) don't always say success. better messaging if it actually errored!
      setIsSavingTaxonomy(false);
    }
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
        <Button
          onClick={onClickTaxonomyExport}
          disabled={events.length === 0}
          loading={isSavingTaxonomy}
        >
          Export to Amplitude Planner
        </Button>
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
