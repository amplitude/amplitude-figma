/** @jsx h */
import { Button, Container, Divider, LoadingIndicator, VerticalSpace, Text } from '@create-figma-plugin/ui';
import { h, JSX } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import amplitude from 'amplitude-js';

import { AMPLITUDE_API_KEY } from 'src/constants';
import { EventMetadata } from 'src/types/event';
import { exportToCsv } from 'src/services/csv';
import { createEventType, getIsTaxonomyEnabled, getEventTypes, updateEventType } from 'src/services/taxonomy';

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

type TaxonomyHook = [{
  isEnabled: boolean,
  isLoading: boolean,
  plannedEvents: string[],
}, () => Promise<void>];

function useTaxonomy(apiKey: string, secretKey: string): TaxonomyHook {
  const [isLoading, setIsLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const [plannedEvents, setPlannedEvents] = useState<string[]>([]);

  const refreshData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const responseIsEnabled = await getIsTaxonomyEnabled(apiKey, secretKey);
      setIsEnabled(responseIsEnabled);
      if (responseIsEnabled) {
        const responsePlannedEvents = await getEventTypes(apiKey, secretKey);
        setPlannedEvents(responsePlannedEvents);
      }
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, secretKey]);

  useEffect(() => {
    // Note(Kelvin): I can't pass refresh data directly in here
    // because useEffect requires a func that returns void or a cleanup func
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refreshData();
  }, [refreshData]);

  return [{ isEnabled, isLoading, plannedEvents }, refreshData];
}

function AllEvents({ events, apiKey, secretKey }: Props): JSX.Element {
  useEffect(() => {
    amplitude.getInstance().init(AMPLITUDE_API_KEY);
    amplitude.getInstance().logEvent('All Events Tab Visited');
  });
  const [isSavingTaxonomy, setIsSavingTaxonomy] = useState(false);
  const [
    { isEnabled, isLoading, plannedEvents },
    refreshTaxonomy
  ] = useTaxonomy(apiKey, secretKey);
  const onClickCsvExport = (): void => {
    const eventsCsv = events.map((event) => {
      return {
        Event: event.name,
        'Event Description': event.description,
      };
    });

    exportToCsv('taxonomy.csv', [...eventsCsv]);
  };

  const onClickTaxonomyExport = async (): Promise<void> => {
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
      <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'end', width: '100%' }}>
        <Button onClick={onClickCsvExport} disabled={events.length === 0}>
          Export to CSV
        </Button>
        <div style={{ width: '8px' }} />
        {!isLoading && isEnabled && (
          <Button
            onClick={onClickTaxonomyExport}
            disabled={events.length === 0}
            loading={isSavingTaxonomy}
          >
          Export to Amplitude Planner
          </Button>
        )}
      </div>
      <VerticalSpace space='small' />
    </div>
  );
}

export default AllEvents;
