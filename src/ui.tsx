import { render, Container, Tabs } from '@create-figma-plugin/ui';
import { h } from 'preact';
import { useState } from 'preact/hooks';

import AddEvent from './views/AddEvent/AddEvent';
import Settings from './views/Settings/Settings';

enum Tab {
  ADD_EVENT = 'Create Event Label',
  ALL_EVENTS = 'All Events',
  SETTINGS = 'Settings',
}

const TAB_OPTIONS = [
  { value: Tab.ADD_EVENT, view: <AddEvent /> },
  { value: Tab.ALL_EVENTS, view: <AddEvent /> }, // TODO - add a view
  { value: Tab.SETTINGS, view: <Settings /> }
];

function Plugin (props) {
  const [state, setState] = useState({ tab: props.initialTab ?? Tab.ADD_EVENT });

  return (
    <Container space='medium'>
      <Tabs
        name="tab"
        onChange={setState}
        options={TAB_OPTIONS}
        value={state.tab}
      />
    </Container>
  );
}

export default render(Plugin);
