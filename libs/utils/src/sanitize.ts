export function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/&[a-z]+;/gi, ' ')
    .trim();
}

export function sanitizeInput(input: string): string {
  return stripHtml(input)
    .replace(/[<>'"]/g, '')
    .slice(0, 5000);
}
