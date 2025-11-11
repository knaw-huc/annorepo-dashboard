import { useConfig } from "../ConfigProvider.tsx";
import { useStore } from "../../store/useStore.ts";
import { Modal, SquareTextHintButton } from "../Modal.tsx";
import { entries } from "lodash";

export function SelectHostModal(props: {
  onClose: () => void;
  onChangeHost: (host: string) => void;
}) {
  const { AR_HOSTS } = useConfig();
  const { selectedHost } = useStore();

  return (
    <Modal title="Select AnnoRepo Host" onClose={props.onClose}>
      <div className="space-y-2">
        {entries(AR_HOSTS).map(([hostName, hostUrl]) => {
          const isSelected = hostName === selectedHost;
          const cleanUrl = hostUrl.replace(/^https?:\/\//, "");
          const title = isSelected ? `${hostName} (Current)` : hostName;

          return (
            <SquareTextHintButton
              key={hostName}
              title={title}
              hint={cleanUrl}
              onClick={() => {
                if (!isSelected) {
                  props.onChangeHost(hostName);
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
