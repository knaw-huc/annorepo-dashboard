import { useAbout } from "../client/endpoint/useAbout.tsx";
import { Loading } from "./common/Loading.tsx";
import { SelectHostModal } from "./host/SelectHostModal.tsx";
import { NeutralButton } from "./common/Button.tsx";
import { useState } from "react";

export function AboutStatus() {
  const about = useAbout();
  const [isRepoModalOpen, setIsRepoModalOpen] = useState(false);
  if (!about.data) {
    return <Loading name="about" />;
  }
  return (
    <div className="hidden xl:flex flex-col gap-4 text-xs text-stone-500 border-t border-stone-200 pt-8">
      <div>
        AnnoRepo Version: <strong>{about.data.version}</strong>
      </div>
      <div>
        Running since
        <br />
        {new Date(about.data.startedAt).toLocaleDateString()}
        <br />
        {new Date(about.data.startedAt).toLocaleTimeString()}
      </div>
      <div>
        Running at
        <br />
        {about.data.baseURI}
      </div>
      <NeutralButton onClick={() => setIsRepoModalOpen(true)} className="mt-4">
        Change AnnoRepo Host
      </NeutralButton>
      {isRepoModalOpen && (
        <SelectHostModal onClose={() => setIsRepoModalOpen(false)} />
      )}
    </div>
  );
}
