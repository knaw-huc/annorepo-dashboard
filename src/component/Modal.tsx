import { PropsWithChildren, useCallback, useEffect } from "react";

export function Modal(
  props: PropsWithChildren<{
    title: string;
    onClose: () => void;
  }>,
) {
  const { onClose } = props;

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="relative bg-white rounded-lg p-6 max-w mx-4">
        <div className="text-[initial] text-base flex flex-col w-full max-w-xl p-6 rounded mx-auto gap-8">
          <div className="flex justify-between items-center">
            <div>
              <h2>{props.title}</h2>
            </div>
            <div>
              <SquareButton className="font-mono" onClick={props.onClose}>
                ✖
              </SquareButton>
            </div>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export function SquareButton(
  props: PropsWithChildren<{
    onClick: () => void;
    className?: string;
  }>,
) {
  let className = "bg-anrep-pink-100 rounded p-2 cursor-pointer";
  if (props.className) {
    className += ` ${props.className}`;
  }
  return (
    <button className={className} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export function SquareTextHintButton(props: {
  title: string;
  hint: string;
  onClick: () => void;

  className?: string;
  disabled?: boolean;
}) {
  let className = "grow rounded p-4 flex flex-col";
  if (props.className) {
    className += ` ${props.className}`;
  }
  if (props.disabled) {
    className += " cursor-not-allowed bg-anrep-pink-50";
  } else {
    className += " cursor-pointer bg-anrep-pink-100 ";
  }
  return (
    <button
      className={className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <div className="font-bold text-anrep-pink-900">{props.title}</div>
      <div className="text-sm">{props.hint}</div>
    </button>
  );
}
