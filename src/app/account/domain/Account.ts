import {Message} from "./Message";

export interface Account {
  id: string
  fullName: string
  color: string
  status: string
  messages: Message[]
}
