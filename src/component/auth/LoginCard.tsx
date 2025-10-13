import { LoginMenu } from "./LoginMenu.tsx";
import { useStore } from "../../store/useStore.ts";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { isAuthenticated } from "../../model/user/User.ts";
import { TokenForm } from "./TokenForm.tsx";
import { getParam } from "../host/util/getParam.ts";
import { NEXT } from "../common/UrlParam.ts";
import noop from "lodash/noop";

export function LoginCard(props: { message: string }) {
  const navigate = useNavigate();
  const { user, isAuthenticating, selectedAuthMethod } = useStore();

  useEffect(() => {
    if (!selectedAuthMethod) {
      return;
    }
    if (isAuthenticated(user)) {
      const nextUrl = getParam(NEXT);
      navigate({ to: nextUrl ?? "/" });
    } else {
      navigate({ to: "/" });
    }
  }, [user, selectedAuthMethod]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-15 rounded shadow text-center">
        <p className="mt-5 font-medium">{props.message}</p>
        <p className="mt-10">
          {!isAuthenticating && <LoginMenu onClose={noop} />}
          {isAuthenticating && selectedAuthMethod === "token" && <TokenForm />}
        </p>
      </div>
    </div>
  );
}
