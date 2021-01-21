/** @jsx h */
import { Button, Container, Divider, LoadingIndicator, VerticalSpace, Text } from '@create-figma-plugin/ui';
import { h, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import amplitude from 'amplitude-js';

import { useTaxonomy } from 'src/hooks/taxonomy';
import { EventMetadata } from 'src/types/event';
import { exportToCsv } from 'src/services/csv';
import { createEventType, updateEventType } from 'src/services/taxonomy';

export interface Props {
  apiKey: string,
  secretKey: string,
  events: EventMetadata[];
}

interface RowProps {
  event: EventMetadata,
  isEnabled: boolean,
  isLoading: boolean,
  isPlanned: boolean,
}

function EventsRow(props: RowProps): JSX.Element {
  const { event, isEnabled, isLoading, isPlanned } = props;

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
        {isEnabled && (
          <div style={{ width: '30%' }}>
            {isLoading ? <LoadingIndicator /> : <Text>{isPlanned ? 'Yes' : 'No'} </Text>}
          </div>
        )}
      </div>
      <VerticalSpace />
      <Divider />
    </div>
  );
}

function AllEvents({ events, apiKey, secretKey }: Props): JSX.Element {
  const [isSavingTaxonomy, setIsSavingTaxonomy] = useState(false);
  useEffect(() => {
    amplitude.getInstance().logEvent('Tab Visited: All Events');
  });
  const [
    { isEnabled, isLoading, plannedEvents },
    refreshTaxonomy
  ] = useTaxonomy(apiKey, secretKey);
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

  const onClickTaxonomyExport = async (): Promise<void> => {
    amplitude.logEvent('Export Taxonomy clicked');
    try {
      setIsSavingTaxonomy(true);
      await Promise.all(events.map(async (event) => {
        if (plannedEvents.includes(event.name)) {
          return await updateEventType(
            apiKey,
            secretKey,
            event.name,
            event.description
          );
        }
        return await createEventType(
          apiKey,
          secretKey,
          event.name,
          event.description
        );
      }));
      await refreshTaxonomy();
    } finally {
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
          <div style={{ width: '40%' }}>
            <Text bold>Description </Text>
          </div>
          {isEnabled && (
            <div style={{ width: '30%' }}>
              <Text bold>In Schema </Text>
            </div>
          )}
        </div>
        <VerticalSpace />
        {events.map(event =>
          <EventsRow
            event={event}
            isEnabled={isEnabled}
            isLoading={isLoading}
            isPlanned={plannedEvents.includes(event.name)}
          />
        )}
        <VerticalSpace space="medium" />
      </Container>
      <Divider />
      <VerticalSpace />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
        {!isLoading && isEnabled && (
          <Button
            onClick={onClickTaxonomyExport}
            disabled={events.length === 0}
            loading={isSavingTaxonomy}
          >
          Export to Amplitude Planner
          </Button>
        )}
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
