export type ArAboutData = {
  appName: string,
  version: string,
  startedAt: string,
  baseURI: string,
  withAuthentication: string,
  sourceCode: string,
  mongoVersion: string
}

export type ArMyContainers = Record<string, string[]>

export type ArAnnotationPage = {
  id: string,
  type: "AnnotationPage",
  partOf: string,
  startIndex: number,
  items: ArAnnotation[]
  next?: string
  prev?: string
};

export type ArContainer = {
  id: string,
  via?: string,
  label: string
  type: string[]
  total: number
  first: ArAnnotationPage
  last: string
}

export type ArQuery = object

export type ArAnnotation<T extends object = object> = {
  type: "Annotation",
  body: T,
  target: string,
  id: string
  via: string
}

export type ArContainerFields = Record<string, number>