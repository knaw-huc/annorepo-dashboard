export function toErrorMessage(error: any) {
  console.error(error);
  if (error instanceof Error) {
    return error.message
  } else {
    return 'Unknown error'
  }
}