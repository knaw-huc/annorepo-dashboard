import { useStore } from "../../store/useStore.ts";
import { Modal } from "../Modal.tsx";
import { Button } from "../common/Button.tsx";

export function LoginModal(props: { onClose: () => void }) {
  const { authMethods, setAuthState } = useStore();
  return (
    <Modal onClose={props.onClose}>
      <div>
        {authMethods.includes("oidc") && (
          <Button
            onClick={() => {
              setAuthState({
                isAuthenticating: true,
                selectedAuthMethod: "oidc",
              });
              props.onClose();
            }}
          >
            Oidc
          </Button>
        )}
        {authMethods.includes("token") && (
          <Button
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
          </Button>
        )}
        <Button
          className="ml-5"
          onClick={() => {
            setAuthState({ selectedAuthMethod: "anonymous" });
            props.onClose();
          }}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
