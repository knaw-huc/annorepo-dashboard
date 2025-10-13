import { NeutralButton } from "./Button.tsx";
import { SelectHostModal } from "../host/SelectHostModal.tsx";
import { useState } from "react";

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
