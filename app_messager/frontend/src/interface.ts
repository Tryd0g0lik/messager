// app_messager\frontend\src\interface.ts
interface Post {
  postId?: string
}

interface File extends Post {
  pathname?: string
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

export interface OllDatas {
  pathnames: string[]
  dataPost: string
  dataId: string
}

export interface F extends File {
  userId: string
}
