import { useStore } from "../../store/useStore.ts";
import { useConfig } from "../ConfigProvider.tsx";
import { SquareTextHintButton } from "../Modal.tsx";

export function LoginMenu(props: { onClose: () => void }) {
  const { authMethods, setAuthState } = useStore();
  const config = useConfig();
  return (
    <>
      <div className="flex gap-6 *:w-1/3 text-anrep-pink-600 *:cursor-pointer">
        {authMethods.includes("oidc") && (
          <SquareTextHintButton
            title="With OIDC"
            hint="Login with your institutional account."
            onClick={() => {
              window.location.href = `${config.AUTH_HOST.proxyUrl}/oidc/login`;
            }}
          />
        )}
        {authMethods.includes("token") && (
          <SquareTextHintButton
            title="With a token"
            hint="Login with your bearer access token."
            className="ml-5"
            onClick={() => {
              setAuthState({
                isAuthenticating: true,
                selectedAuthMethod: "token",
              });
              props.onClose();
            }}
          />
        )}
        <SquareTextHintButton
          title="As a guest"
          hint="Continue as guest. Some features are not available."
          className="ml-5"
          onClick={() => {
            setAuthState({ selectedAuthMethod: "anonymous" });
            props.onClose();
          }}
        ></SquareTextHintButton>
      </div>
    </>
  );
}
