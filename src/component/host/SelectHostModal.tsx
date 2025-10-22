import { useConfig } from "../ConfigProvider.tsx";
import { useStore } from "../../store/useStore.ts";
import { Modal, SquareTextHintButton } from "../Modal.tsx";
import { entries } from "lodash";
import { setParam } from "./util/setParam.ts";
import { HOST } from "../common/UrlParam.ts";

export function SelectHostModal(props: { onClose: () => void }) {
  const { AR_HOSTS } = useConfig();
  const { selectedHost } = useStore();

  return (
    <Modal title="Select AnnoRepo Host" onClose={props.onClose}>
      <div className="space-y-2">
        {entries(AR_HOSTS).map(([key, url]) => {
          const isSelected = key === selectedHost;
          const cleanUrl = url.replace(/^https?:\/\//, "");
          const title = isSelected ? `${key} (Current)` : key;

          return (
            <SquareTextHintButton
              key={key}
              title={title}
              hint={cleanUrl}
              onClick={() => {
                if (!isSelected) {
                  setParam(HOST, key);
                }
              }}
              className="w-full"
              disabled={isSelected}
            />
          );
        })}
      </div>
    </Modal>
  );
}
