import { render, Container, Tabs } from '@create-figma-plugin/ui';
import { h, JSX } from 'preact';
import { useCallback, useMemo, useState } from 'preact/hooks';

import { EventMetadata } from 'src/types/event';

import AddEvent from 'src/views/AddEvent/AddEvent';
import AllEvents from 'src/views/AllEvents/AllEvents';
import Settings from 'src/views/Settings/Settings';
import Tutorial from 'src/views/Tutorial/Tutorial';

export enum Tab {
  ADD_EVENT = 'Create Event Label',
  ALL_EVENTS = 'All Events',
  SETTINGS = 'Settings',
  TUTORIAL = 'Tutorial',
}

interface Props {
  initialTab?: Tab;
  initialEvents?: EventMetadata[];
  initialApiKey?: string;
  initialSecretKey?: string;
}

interface State {
  tab: Tab;
}

function Plugin (props: Props): JSX.Element {
  const {
    initialTab = Tab.ADD_EVENT,
    initialEvents = [] as EventMetadata[],
    initialApiKey = '',
    initialSecretKey = ''
  } = props;
  const [state, setState] = useState<State>({ tab: initialTab });
  const [events, setEvents] = useState<EventMetadata[]>(initialEvents);

  const onAddEvent = useCallback((newEvent: EventMetadata) => {
    setEvents((oldEvents) => [...oldEvents, newEvent]);
  }, []);

  const tabOptions = useMemo(() => {
    return [
      { value: Tab.ADD_EVENT, view: <AddEvent onAddEvent={onAddEvent} /> },
      { value: Tab.ALL_EVENTS, view: <AllEvents events={events} /> },
      { value: Tab.SETTINGS, view: <Settings initialApiKey={initialApiKey} initialSecretKey={initialSecretKey} /> },
      { value: Tab.TUTORIAL, view: <Tutorial /> }
    ];
  }, [initialApiKey, initialSecretKey, events, onAddEvent]);

  return (
    <Container space='medium'>
      <Tabs
        name="tab"
        onChange={setState}
        options={tabOptions}
        value={state.tab}
      />
    </Container>
  );
}

export default render(Plugin);
