import { LoginButton } from "./LoginButton.tsx";

export function UnauthorizedPage(props: { message: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-15 rounded shadow text-center">
        <p className="mt-5 font-medium">{props.message}</p>
        <p className="mt-10">
          <LoginButton />
        </p>
      </div>
    </div>
  );
}
