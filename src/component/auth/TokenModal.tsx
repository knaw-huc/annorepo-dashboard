import { Modal } from "../Modal.tsx";
import { TokenForm } from "./TokenForm.tsx";
import { useStore } from "../../store/useStore.ts";

export function TokenModal() {
  const { setAuthState } = useStore();
  return (
    <Modal
      title="Token"
      onClose={() => {
        setAuthState({ isAuthenticating: false, selectedAuthMethod: null });
      }}
    >
      <TokenForm />
    </Modal>
  );
}
