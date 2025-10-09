import { LoginButton } from "./LoginButton.tsx";
import { DeprecatedButton } from "../common/DeprecatedButton.tsx";

export function LoginMessageCard(props: { message: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-15 rounded shadow text-center">
        <p className="mt-5 font-medium">{props.message}</p>
        <p className="mt-10">
          <DeprecatedButton onClick={() => (window.location.href = `/`)}>
            Home
          </DeprecatedButton>
          <span className="ml-3">
            <LoginButton />
          </span>
        </p>
      </div>
    </div>
  );
}
