export function toPath(idOrName: string): string {
  try {
    return new URL(idOrName).pathname;
  } catch (cause) {
    console.debug(`Could not transform id ${idOrName} to url`, { cause });
    return idOrName;
  }
}
