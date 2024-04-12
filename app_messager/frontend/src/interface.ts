// app_messager\frontend\src\interface.ts

export interface ChatMessage {
  userId: string
  dataTime: string
  messageSender: string
  message: string
}

export interface WSData {
  open: []
  close: []
  data: []
}
