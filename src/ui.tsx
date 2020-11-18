import { render, Container, Tabs } from '@create-figma-plugin/ui';
import { h, JSX } from 'preact';
import { useState, useMemo } from 'preact/hooks';

import AddEvent from 'src/views/AddEvent/AddEvent';
import Settings from 'src/views/Settings/Settings';
import Tutorial from 'src/views/Tutorial/Tutorial';

enum Tab {
  ADD_EVENT = 'Create Event Label',
  ALL_EVENTS = 'All Events',
  SETTINGS = 'Settings',
  TUTORIAL = 'Tutorial',
}

interface Props {
  initialTab?: Tab;
  initialApiKey?: string;
  initialSecretKey?: string;
}

interface State {
  tab: Tab;
}

function Plugin (props: Props): JSX.Element {
  const { initialTab, initialApiKey = '', initialSecretKey = '' } = props;
  const [state, setState] = useState<State>({ tab: initialTab ?? Tab.ADD_EVENT });

  const tabOptions = useMemo(() => {
    return [
      { value: Tab.ADD_EVENT, view: <AddEvent /> },
      { value: Tab.ALL_EVENTS, view: <AddEvent /> }, // TODO - add a view
      { value: Tab.SETTINGS, view: <Settings initialApiKey={initialApiKey} initialSecretKey={initialSecretKey} /> },
      { value: Tab.TUTORIAL, view: <Tutorial /> }
    ];
  }, [initialApiKey, initialSecretKey]);

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
