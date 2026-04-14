import { connectDB } from '@/lib/mongodb';
import Destination from '@/models/Destination';

export async function enhanceRecommendations(existingResults: any[], filters: { mood?: string, season?: string }) {
  await connectDB();
  
  const query: any = {};
  if (filters.mood) query.moodMatch = { $regex: new RegExp(`^${filters.mood}$`, 'i') };
  if (filters.season) query.season = { $regex: new RegExp(`^${filters.season}$`, 'i') };

  const dbMatches = await Destination.find(query).lean();
  
  // Adapt to matches
  let newMatches = dbMatches.map((d: any) => ({
    id: d.slug,
    name: d.name,
    state: d.state,
    type: d.landscape || [],
    popularity: d.rating >= 4.5 ? 'Popular' : 'Hidden',
    moods: d.moodMatch || [],
    seasons: d.season || [],
    budget: 'Medium',
    description: d.description,
    image: d.heroImage || ''
  }));

  const existingIds = new Set(existingResults.map(e => e.id));
  newMatches = newMatches.filter(d => !existingIds.has(d.id));

  return [...existingResults, ...newMatches];
}
