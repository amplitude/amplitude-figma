/** @jsx h */
import { Divider, Button, Inline, VerticalSpace, Text, Textbox } from '@create-figma-plugin/ui'
import { h }  from 'preact'
import { useState } from 'preact/hooks'


function AddEvent() {
  const [state, setState] = useState({ event: '', description: '', note: ''})

  return (
    <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, height: '80%'}}>
      <div style={{display: 'flex', flexGrow: 1, flexDirection: 'column'}}>
        <VerticalSpace space='medium' />
        <Text bold>Name</Text>
        <VerticalSpace space='extraSmall' />
        <Textbox name="event" onChange={setState} value={state.event} placeholder="button.clicked"/>
        <VerticalSpace space='medium' />
        <Inline space="extraSmall">
          <Text bold>Description </Text>
          <Text muted>(optional)</Text>
        </Inline>
        <VerticalSpace space='extraSmall' />
        <Textbox name="description" onChange={setState} value={state.description} placeholder="Ex: “user clicks on the Add to Cart button”"/>
        <VerticalSpace space='medium' />
        <Inline space="extraSmall">
          <Text bold>Note for Developer </Text>
          <Text muted>(optional)</Text>
        </Inline>
        <VerticalSpace space='extraSmall' />
        <Textbox name="note" onChange={setState} value={state.note} placeholder="Ex: “user clicks on the Add to Cart button”"/>
        <VerticalSpace space='medium' />
      </div>
      <Divider/>
      <VerticalSpace space='small' />
      <div style={{display: 'flex', flexDirection: 'row-reverse', justifyContent: 'end', width: '100%'}}>
        <Button onClick={() => {}}>Add Event</Button>
      </div>
      <VerticalSpace space='small' />
    </div>

  )
 }

 export default AddEvent;
