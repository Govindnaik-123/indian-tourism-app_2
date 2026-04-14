/**
 * Generates a dynamic Unsplash image URL based on the destination name and state.
 * Uses the Unsplash Source API for keyword-based image fetching.
 * 
 * @param name - The name of the destination (e.g., "Hampi")
 * @param state - The state where the destination is located (e.g., "Karnataka")
 * @returns A URL string for the corresponding image
 */
export function getImageByPlace(name: string, state: string, type?: string) {
  // Use a simple hash of the name to create a consistent 'lock' for LoremFlickr
  // Using broad tags 'india,tourism' ensures high match rate and relevance
  const seed = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Return a direct URL that bypasses the Next.js proxy
  return `https://loremflickr.com/600/400/india,tourism?lock=${seed}`;
}

/**
 * Fallback image URL for Indian Tourism (Classic Taj Mahal/Scenic view)
 */
export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200";
