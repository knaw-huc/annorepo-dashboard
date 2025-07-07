export const queryValueTypes = [
  'string', 'number', 'options', 'range'
] as const

export type QueryValueType = typeof queryValueTypes[number]