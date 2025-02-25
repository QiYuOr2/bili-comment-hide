import type { Reply } from "./reply"

export interface BiliResponse<T> {
  code: number
  message: string
  ttl?: number
  data: T
}

export type ReplyWbiMainResponse = BiliResponse<{
  replies: Reply[]
}>

export type ReplyReplyResponse = BiliResponse<{
  replies: Reply[]
}>