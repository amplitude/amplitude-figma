import { Message } from 'src/types/message';
import { EventMetadata } from 'src/types/event';

declare module '@create-figma-plugin/utilities' {
  function on(event: Message.ADD_EVENT, onData: (data: EventMetadata) => void | Promise<void>);
  function on(event: Message.API_KEY, onData: (data: string) => void | Promise<void>);
  function on(event: Message.SECRET_KEY, onData: (data: string) => void | Promise<void>);
}
