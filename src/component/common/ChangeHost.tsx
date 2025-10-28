import { SelectHostModal } from "../host/SelectHostModal.tsx";
import { useState } from "react";
import { NeutralButton } from "./NeutralButton.tsx";
import { useConfig } from "../ConfigProvider.tsx";
import { keys } from "lodash";
import { useNavigate } from "@tanstack/react-router";
import { useStore } from "../../store/useStore.ts";
import { HOST } from "./UrlParam.ts";

export function ChangeHost() {
  const [isRepoModalOpen, setIsRepoModalOpen] = useState(false);
  const { AR_HOSTS } = useConfig();
  const navigate = useNavigate();
  const { setHostState } = useStore();

  const handleNavigation = (selectedHost: string) => {
    setHostState({ selectedHost });
    navigate({
      to: "/",
      search: { [HOST]: selectedHost },
      reloadDocument: true,
    });
  };

  if (keys(AR_HOSTS).length === 1) {
    return null;
  }
  return (
    <>
      <NeutralButton onClick={() => setIsRepoModalOpen(true)} className="mt-4">
        Change AnnoRepo Host
      </NeutralButton>
      {isRepoModalOpen && (
        <SelectHostModal
          onClose={() => setIsRepoModalOpen(false)}
          onChangeHost={handleNavigation}
        />
      )}
    </>
  );
}
