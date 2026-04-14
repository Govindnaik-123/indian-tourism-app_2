import { Destination } from '@/data/indiaDestinations';

export function groupDestinationsByState(destinations: Destination[]) {
  return destinations.reduce((acc, dest) => {
    if (!acc[dest.state]) acc[dest.state] = [];
    acc[dest.state].push(dest);
    return acc;
  }, {} as Record<string, Destination[]>);
}
