import { useState } from "react";
import { LoginModal } from "./LoginModal.tsx";
import { TokenModal } from "./TokenModal.tsx";
import { AuthStatusBadge } from "./AuthStatusBadge.tsx";
import { useStore } from "../../store/useStore.ts";

export function AuthStatus() {
  const { isAuthenticating, selectedAuthMethod } = useStore();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <AuthStatusBadge openLogin={() => setIsLoginOpen(true)} />
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
      {isAuthenticating && selectedAuthMethod === "token" && <TokenModal />}
    </>
  );
}
