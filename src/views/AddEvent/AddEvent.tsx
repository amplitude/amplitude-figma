/** @jsx h */
import { Divider, Button, Inline, VerticalSpace, Text, Textbox } from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useState, useEffect, useCallback } from 'preact/hooks'

import { EventMetadata } from 'src/types/event';
import { Message } from 'src/types/message';

function AddEvent() {
  const [state, setState] = useState<EventMetadata>({ name: '', description: '', notes: '' })
  const onChange = useCallback((newState) => {
    setState((oldState) => {
      return {
        ...oldState,
        ...newState,
      }
    })
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '80%' }}>
      <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
        <VerticalSpace space='medium' />
        <Text bold>Name</Text>
        <VerticalSpace space='extraSmall' />
        <Textbox name="name" onChange={onChange} value={state.name} placeholder="button.clicked" />
        <VerticalSpace space='medium' />
        <Inline space="extraSmall">
          <Text bold>Description </Text>
          <Text muted>(optional)</Text>
        </Inline>
        <VerticalSpace space='extraSmall' />
        <Textbox name="description" onChange={onChange} value={state.description} placeholder="Ex: “user clicks on the Add to Cart button”" />
        <VerticalSpace space='medium' />
        <Inline space="extraSmall">
          <Text bold>Note for Developer </Text>
          <Text muted>(optional)</Text>
        </Inline>
        <VerticalSpace space='extraSmall' />
        <Textbox name="notes" onChange={onChange} value={state.notes} placeholder="Ex: “user clicks on the Add to Cart button”" />
        <VerticalSpace space='medium' />
      </div>
      <Divider />
      <VerticalSpace space='small' />
      <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'end', width: '100%' }}>
        <Button onClick={() => {
          emit(Message.ADD_EVENT, { ...state });
          setState({ name: '', description: '', notes: '' }) // reset state
        }}>Add Event</Button>
      </div>
      <VerticalSpace space='small' />
    </div>
  )
}

export default AddEvent;
