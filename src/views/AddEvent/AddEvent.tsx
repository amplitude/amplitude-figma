import { Container, Divider, Button, Inline, VerticalSpace, Text, Textbox } from '@create-figma-plugin/ui'
import { h }  from 'preact'
import { useState } from 'preact/hooks'

import styles from './AddEvent.scss'

 function AddEvent() {
  const [state, setState] = useState({ event: '', description: '', note: ''})

  return (
    <div>
      <Container>
        <VerticalSpace space='medium' />
        <Text bold>Name</Text>
        <VerticalSpace space='extraSmall' />
        <Textbox name="event" onChange={setState} value={state.event} placeholder="button.clicked"/>
        <VerticalSpace space='medium' />
        <Inline space="small">
          <Text bold>Description </Text>
          <Text muted>(optional)</Text>
        </Inline>
        <VerticalSpace space='extraSmall' />
        <Textbox name="description" onChange={setState} value={state.description} placeholder="Ex: “user clicks on the Add to Cart button”"/>
        <VerticalSpace space='medium' />
        <Inline space="small">
          <Text bold>Note for Developer </Text>
          <Text muted>(optional)</Text>
        </Inline>
        <VerticalSpace space='extraSmall' />
        <Textbox name="note" onChange={setState} value={state.note} placeholder="Ex: “user clicks on the Add to Cart button”"/>
        <VerticalSpace space='medium' />
      </Container>
      <Divider/>
      <VerticalSpace space='medium' />
      <div class={styles['right-align']}>
      <Button onClick={() => {}}>Add Event</Button>
      </div>
    </div>

  )
 }

 export default AddEvent;
