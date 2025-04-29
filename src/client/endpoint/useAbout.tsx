import {QR, useGet} from "../query/useGet.tsx";
import {ArAboutData} from "../ArModel.ts";

export function useAbout(): QR<ArAboutData> {
  return useGet('/about');
}