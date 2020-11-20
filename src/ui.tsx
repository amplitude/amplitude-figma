import { render, Container, Tabs } from '@create-figma-plugin/ui';
import { emit } from '@create-figma-plugin/utilities';

import { h, JSX } from 'preact';
import { useCallback, useMemo, useState } from 'preact/hooks';

import { EventMetadata } from 'src/types/event';
import { Message } from 'src/types/message';
import { Tab } from 'src/types/tab';

import AddEvent from 'src/views/AddEvent/AddEvent';
import AllEvents from 'src/views/AllEvents/AllEvents';
import Settings from 'src/views/Settings/Settings';
import Tutorial from 'src/views/Tutorial/Tutorial';

interface Props {
  initialTab?: Tab;
  initialEvents?: EventMetadata[];
  initialApiKey?: string;
  initialSecretKey?: string;
}

function Plugin (props: Props): JSX.Element {
  const {
    initialTab = Tab.ADD_EVENT,
    initialEvents = [] as EventMetadata[],
    initialApiKey = '',
    initialSecretKey = ''
  } = props;
  const [tab, setTab] = useState<Tab>(initialTab);
  const [events, setEvents] = useState<EventMetadata[]>(initialEvents);
  const [apiKey, setApiKey] = useState<string>(initialApiKey);
  const [secretKey, setSecretKey] = useState<string>(initialSecretKey);

  const onAddEvent = useCallback((newEvent: EventMetadata) => {
    setEvents((oldEvents) => [...oldEvents, newEvent]);
  }, []);

  const onTabChange = useCallback(({ tab: newTab }: {tab: Tab}) => {
    if (newTab !== tab) {
      emit(Message.CHANGE_TAB, tab, newTab);
      setTab(newTab);
    }
  }, [tab]);

  const tabOptions = useMemo(() => {
    return [
      { value: Tab.ADD_EVENT, view: <AddEvent onAddEvent={onAddEvent} /> },
      { value: Tab.ALL_EVENTS, view: <AllEvents events={events} apiKey={apiKey} secretKey={secretKey} /> },
      {
        value: Tab.SETTINGS,
        view: <Settings
          apiKey={apiKey}
          secretKey={secretKey}
          onChangeApiKey={setApiKey}
          onChangeSecretKey={setSecretKey} />
      },
      { value: Tab.TUTORIAL, view: <Tutorial /> }
    ];
  }, [onAddEvent, events, apiKey, secretKey]);

  return (
    <Container space='medium'>
      <Tabs
        name="tab"
        onChange={onTabChange}
        options={tabOptions}
        value={tab}
      />
    </Container>
  );
}

export default render(Plugin);
