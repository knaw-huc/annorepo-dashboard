export function toPath(idOrName: string): string {
  try {
    return new URL(idOrName).pathname;
  } catch {
    console.debug(`Could not transform id ${idOrName} to url`);
    return idOrName;
  }
}
