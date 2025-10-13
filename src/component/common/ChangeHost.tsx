import { SelectHostModal } from "../host/SelectHostModal.tsx";
import { useState } from "react";
import { NeutralButton } from "./NeutralButton.tsx";

export function ChangeHost() {
  const [isRepoModalOpen, setIsRepoModalOpen] = useState(false);

  return (
    <>
      <NeutralButton onClick={() => setIsRepoModalOpen(true)} className="mt-4">
        Change AnnoRepo Host
      </NeutralButton>
      {isRepoModalOpen && (
        <SelectHostModal onClose={() => setIsRepoModalOpen(false)} />
      )}
    </>
  );
}
