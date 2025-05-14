export function isUrl(toTest?: any): boolean {
  if (!toTest) {
    return false;
  }
  const type = typeof toTest;
  if (!['string', 'object'].includes(type)) {
    return false;
  }
  try {
    new URL(toTest);
    return true;
  } catch (e) {
    return false;
  }
}