import {useGet} from "../query/useGet.tsx";
import {ArAboutData} from "../ArModel.ts";
import {QR} from "../query/QR.tsx";

export function useAbout(): QR<ArAboutData> {
  return useGet('/about');
}