import { CustomSubqueriesCallEditor } from "./CustomSubqueriesCallEditor.tsx";

export function CustomQueryCallEditor(props: { containerName?: string }) {
  const { containerName } = props;

  return (
    <CustomSubqueriesCallEditor
      containerName={containerName}
      path={[]}
      isCall={true}
    />
  );
}
