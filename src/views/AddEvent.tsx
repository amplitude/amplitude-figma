import { Container, Button, Inline, VerticalSpace, Text, Textbox } from '@create-figma-plugin/ui'
import { h }  from 'preact'
import { useState } from 'preact/hooks'


 function AddEvent() {
  const [state, setState] = useState({ event: '', })

    return (
      <Container>
        <VerticalSpace space='medium' />
        <Inline space="small">
        <Text>Add an Event: </Text>
        <Textbox name="event" onChange={setState} value={state.event} placeholder="button.clicked"/>
        </Inline>
        <VerticalSpace space='medium' />
        <Button onClick={() => {}}>Add Event</Button>
      </Container>
    )
 }

 export default AddEvent;
