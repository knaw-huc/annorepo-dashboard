import { useConfig } from "../ConfigProvider.tsx";
import { useStore } from "../../store/useStore.ts";
import { Modal } from "../Modal.tsx";
import { H1 } from "../common/H1.tsx";
import { setParam } from "./util/setParam.ts";
import { entries } from "lodash";
import { HOST } from "../common/UrlParam.ts";

export function SelectHostModal(props: { onClose: () => void }) {
  const { AR_HOSTS } = useConfig();
  const { selectedHost } = useStore();

  return (
    <Modal onClose={props.onClose}>
      <H1>Select AnnoRepo Host</H1>

      <div className="space-y-2">
        {entries(AR_HOSTS).map(([key, url]) => {
          const isSelected = key === selectedHost;
          const cleanUrl = url.replace(/^https?:\/\//, "");

          return (
            <div
              key={key}
              onClick={() => {
                if (!selectedHost) {
                  setParam(HOST, key);
                }
              }}
              className={`
                p-3 rounded-lg border-2 transition-all cursor-pointer
                ${
                  isSelected
                    ? "border-slate-500 bg-slate-50 cursor-default"
                    : "border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                }
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div
                    className={`
                    w-4 h-4 rounded-full border-2 flex items-center justify-center mt-1
                    ${isSelected ? "border-slate-500" : "border-gray-400"}
                  `}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{key}</div>
                    <div className="text-sm text-gray-600">{cleanUrl}</div>
                  </div>
                </div>
                {isSelected && (
                  <span className="text-sm font-medium text-slate-600">
                    Current
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
