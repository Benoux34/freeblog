export function generatePostId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `fb${timestamp}-${random}`;
}
