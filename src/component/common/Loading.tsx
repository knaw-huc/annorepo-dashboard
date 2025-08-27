export function Loading(props: {
  /**
   * What is being loaded?
   */
  name: string;
}) {
  return `Loading ${props.name}... `;
}
