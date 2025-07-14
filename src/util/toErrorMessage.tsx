import {isString} from "lodash";

export function toErrorMessage(error?: any) {
  console.error(error);
  if(!error) {
    return 'No error found'
  } else if (error instanceof Error) {
    return error.message
  } else if(isString(error)){
    return error
  } else {
    return 'Unknown error'
  }
}