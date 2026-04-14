export function slugifyState(state: string) {
  return state
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/,/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

export function deslugifyState(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\band\b/g, "&");
}

export function slugifyDestination(name: string) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}
