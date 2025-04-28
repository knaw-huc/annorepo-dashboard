export type ArAboutData = {
  appName: string,
  version: string,
  startedAt: string,
  baseURI: string,
  withAuthentication: string,
  sourceCode: string,
  mongoVersion: string
}

export type ArMyContainers = {
  ROOT: string[]
}

export type ArContainerPage = {
  "id": string,
  "type": "AnnotationPage",
  "partOf": string,
  "startIndex": number,
  "items": []
};

export type ArContainer = {
  id: string,
  label: string
  type: string[]
  total: number
  first: ArContainerPage
  last: string
}

export type ArQuery = object