export async function fetchValidated(input: RequestInfo) {
  const res = await fetch(input);
  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`);
  }
  return res;
}
