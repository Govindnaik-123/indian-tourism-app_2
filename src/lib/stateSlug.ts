export function formatStateSlug(state: string) {
  return state.toLowerCase().replace(/\s+/g, "-");
}

export function parseStateSlug(slug: string) {
  return slug.replace(/-/g, " ");
}
