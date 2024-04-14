// app_messager\frontend\src\interface.ts

export interface ChatMessage {
  authorId: string
  dataTime: string
  message: string
  groupId?: string
}

export interface WSData {
  open: []
  close: []
  data: []
}
