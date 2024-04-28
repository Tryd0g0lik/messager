// app_messager\frontend\src\interface.ts
interface Post {
  postId?: string | number
}

export interface File extends Post {
  pathname?: string
  index?: string
  indexes?: string[]
  file_id?: string
  fileInd?: string
}

export interface ChatMessage extends Post {
  authorId: string | number
  dataTime?: string
  message: string
  groupId?: string | number
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

export interface DbSLine { // DB Search Line
  indexUser: string
  content: string
  indexGroup: string
  indexLine: satring
}

export interface Data {
  dataPost: string | undefined
  dataId: string | undefined // id user
}
