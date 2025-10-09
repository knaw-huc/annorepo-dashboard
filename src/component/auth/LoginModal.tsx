import { useStore } from "../../store/useStore.ts";
import { Modal } from "../Modal.tsx";
import { DeprecatedButton } from "../common/DeprecatedButton.tsx";

export function LoginModal(props: { onClose: () => void }) {
  const { authMethods, setAuthState } = useStore();
  return (
    <Modal onClose={props.onClose}>
      <div>
        {authMethods.includes("oidc") && (
          <DeprecatedButton
            onClick={() => {
              setAuthState({
                isAuthenticating: true,
                selectedAuthMethod: "oidc",
              });
              props.onClose();
            }}
          >
            Oidc
          </DeprecatedButton>
        )}
        {authMethods.includes("token") && (
          <DeprecatedButton
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
          </DeprecatedButton>
        )}
        <DeprecatedButton
          className="ml-5"
          onClick={() => {
            setAuthState({ selectedAuthMethod: "anonymous" });
            props.onClose();
          }}
        >
          Cancel
        </DeprecatedButton>
      </div>
    </Modal>
  );
}
