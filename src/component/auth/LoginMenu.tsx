import { useStore } from "../../store/useStore.ts";
import { Button } from "../common/Button.tsx";
import { useConfig } from "../ConfigProvider.tsx";

export function LoginMenu(props: { onClose: () => void }) {
  const { authMethods, setAuthState } = useStore();
  const config = useConfig();
  return (
    <>
      {authMethods.includes("oidc") && (
        <Button
          onClick={() => {
            window.location.href = `${config.AUTH_HOST.proxyUrl}/oidc/login`;
          }}
        >
          Login with OIDC
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
          Login with token
        </Button>
      )}
      <Button
        className="ml-5"
        onClick={() => {
          setAuthState({ selectedAuthMethod: "anonymous" });
          props.onClose();
        }}
      >
        Continue as guest
      </Button>
    </>
  );
}
