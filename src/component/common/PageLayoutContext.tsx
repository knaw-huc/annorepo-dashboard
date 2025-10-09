import { createContext, ReactNode, useContext } from "react";

export type PageLayoutContextType = {
  setSecondColumn: (content: ReactNode | null) => void;
};

export const PageLayoutContext = createContext<PageLayoutContextType | null>(
  null,
);

export function usePageLayout() {
  const context = useContext(PageLayoutContext);
  if (!context) {
    throw new Error(`Use within page component`);
  }
  return context;
}
