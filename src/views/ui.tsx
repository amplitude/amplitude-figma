import { render, Container, Tabs } from '@create-figma-plugin/ui';
import { emit } from '@create-figma-plugin/utilities';
import amplitude from 'amplitude-js';

import { h, JSX } from 'preact';
import { useCallback, useMemo, useState, useEffect } from 'preact/hooks';

import { EventMetadata, Trigger } from 'src/types/event';
import { Message } from 'src/types/message';
import { Tab } from 'src/types/tab';
import { AMPLITUDE_API_KEY } from 'src/constants';

import AddEvent from 'src/views/AddEvent/AddEvent';
import AllEvents from 'src/views/AllEvents/AllEvents';
import Tutorial from 'src/views/Tutorial/Tutorial';

interface Props {
  initialTab?: Tab;
  initialEvents?: EventMetadata[];
}

const INITIAL_EVENT_INPUT: EventMetadata = { name: '', trigger: Trigger.ON_CLICK, description: '', notes: '' };

/*
 * The main entry point for the UI of the figma plugin
 */
function Plugin (props: Props): JSX.Element {
  const {
    initialTab = Tab.ADD_EVENT,
    initialEvents = [] as EventMetadata[],
  } = props;
  const [tab, setTab] = useState<Tab>(initialTab);
  // Inputted by the AddEvents tab
  const [events, setEvents] = useState<EventMetadata[]>(initialEvents);
  const [eventInput, setEventInput] = useState<EventMetadata>(INITIAL_EVENT_INPUT);

  useEffect(() => {
    amplitude.getInstance().init(AMPLITUDE_API_KEY);
    amplitude.getInstance().logEvent('Plugin Opened');
  }, []);

  const onAddEvent = useCallback(() => {
    const newEvent = { ...eventInput };
    amplitude.getInstance().logEvent('Add Event button clicked', {
      'has description': newEvent.description !== '',
      'has notes': newEvent.notes !== '',
      'trigger type': newEvent.trigger,
    });
    emit(Message.ADD_EVENT, newEvent);
    setEvents((oldEvents) => [...oldEvents, newEvent]);
    setEventInput(INITIAL_EVENT_INPUT);
  }, [eventInput]);

  const onTabChange = useCallback(({ tab: newTab }: {tab: Tab}) => {
    if (newTab !== tab) {
      emit(Message.CHANGE_TAB, tab, newTab);
      setTab(newTab);
    }
  }, [tab]);

  const tabOptions = useMemo(() => {
    return [
      { value: Tab.ADD_EVENT, view: <AddEvent event={eventInput} setEvent={setEventInput} onAddEvent={onAddEvent} /> },
      { value: Tab.ALL_EVENTS, view: <AllEvents events={events} /> },
      { value: Tab.TUTORIAL, view: <Tutorial /> }
    ];
  }, [eventInput, onAddEvent, events]);

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
