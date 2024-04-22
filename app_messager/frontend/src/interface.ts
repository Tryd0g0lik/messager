// app_messager\frontend\src\interface.ts
interface Post {
  postId: string
}

export interface ChatMessage extends Post {
  authorId: string
  dataTime: string
  message: string
  groupId?: string
  filesId?: number[]
}
export interface OldData extends Post {
  userId: string
}

export interface WSData {
  open: []
  close: []
  data: []
}

export interface PostCorrector {
  postIndex: string
  postMessage: string
}
