import { showUI, on } from '@create-figma-plugin/utilities'

import { Message } from 'src/types/message';
import { EventMetadata } from 'src/types/event';


export default function () {
  const options = { width: 400, height: 400 }
  on(Message.ADD_EVENT, (event: EventMetadata) => {
    console.log(event)
  })
  showUI(options, {})
}
