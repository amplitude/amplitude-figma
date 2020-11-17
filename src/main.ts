import { showUI, on } from '@create-figma-plugin/utilities'

import { Message } from 'src/types/message';


export default function () {
  const options = { width: 400, height: 400 }
  on(Message.ADD_EVENT, (...args) => {
    console.log(args)
  })
  showUI(options, {})
}
