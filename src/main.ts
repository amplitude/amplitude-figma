import { showUI, on } from '@create-figma-plugin/utilities'

import { Message } from './message';


export default function () {
  const options = { width: 400, height: 400 }
  console.log('starting')
  on(Message.ADD_EVENT, () => {
    console.log('heyyyyyyyyyy')
  })
  showUI(options, {})
}
