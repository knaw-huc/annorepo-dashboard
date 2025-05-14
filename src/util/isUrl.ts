export function isUrl(toTest?: any): boolean {
  if (!toTest) {
    return false;
  }
  if (!['string', 'object'].includes(typeof toTest)) {
    return false;
  }
  try {
    new URL(toTest);
    return true;
  } catch (e) {
    return false;
  }
}