import { useStore } from "../../store/useStore.ts";
import { Modal } from "../Modal.tsx";
import { NeutralButton } from "../common/Button.tsx";

export function LoginModal(props: { onClose: () => void }) {
  const { authMethods, setAuthState } = useStore();
  return (
    <Modal onClose={props.onClose}>
      <div>
        {authMethods.includes("oidc") && (
          <NeutralButton
            onClick={() => {
              setAuthState({
                isAuthenticating: true,
                selectedAuthMethod: "oidc",
              });
              props.onClose();
            }}
          >
            Oidc
          </NeutralButton>
        )}
        {authMethods.includes("token") && (
          <NeutralButton
            className="ml-5"
            onClick={() => {
              setAuthState({
                isAuthenticating: true,
                selectedAuthMethod: "token",
              });
              props.onClose();
            }}
          >
            Token
          </NeutralButton>
        )}
        <NeutralButton
          className="ml-5"
          onClick={() => {
            setAuthState({ selectedAuthMethod: "anonymous" });
            props.onClose();
          }}
        >
          Cancel
        </NeutralButton>
      </div>
    </Modal>
  );
}
