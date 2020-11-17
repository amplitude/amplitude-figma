/** @jsx h */
import { VerticalSpace, Text, Textbox } from '@create-figma-plugin/ui'
import { h } from 'preact'
import { useState } from 'preact/hooks'

function AddEvent() {
  const [state, setState] = useState({ apiKey: '', secretKey: '' })

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <VerticalSpace space='medium' />
      <Text bold>API Key</Text>
      <VerticalSpace space='extraSmall' />
      <Textbox name="event" onChange={setState} value={state.apiKey} />
      <VerticalSpace space='medium' />
      <Text bold>Secret Key </Text>
      <VerticalSpace space='extraSmall' />
      <Textbox name="description" onChange={setState} value={state.secretKey} />
      <VerticalSpace space='medium' />
    </div>
  )
}

export default AddEvent;
