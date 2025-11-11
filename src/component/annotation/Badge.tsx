import { ReactNode } from "react";

export function Badge(props: { label: ReactNode; value?: string }) {
  return (
    <div className="flex gap-2 items-center">
      <div>
        <div className="rounded bg-anrep-blue-200/50 inline-block p-1 text-xs text-anrep-blue-800 font-mono">
          {props.label}
        </div>
      </div>
      {props.value && <div>{props.value}</div>}
    </div>
  );
}
