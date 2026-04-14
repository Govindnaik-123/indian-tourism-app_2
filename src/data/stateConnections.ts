export type ConnectionType = 'Nearby' | 'Cultural' | 'Popular Route';

export interface StateConnection {
  from: string;
  to: string;
  type: ConnectionType;
}

export const stateConnections: StateConnection[] = [
  { from: "Karnataka", to: "Kerala", type: "Nearby" },
  { from: "Karnataka", to: "Goa", type: "Popular Route" },
  { from: "Karnataka", to: "Tamil Nadu", type: "Nearby" },
  { from: "Kerala", to: "Tamil Nadu", type: "Cultural" },
  { from: "Uttarakhand", to: "Himachal Pradesh", type: "Nearby" },
  { from: "Rajasthan", to: "Gujarat", type: "Nearby" },
  { from: "Rajasthan", to: "Delhi", type: "Popular Route" },
  { from: "Maharashtra", to: "Goa", type: "Popular Route" },
  { from: "Maharashtra", to: "Gujarat", type: "Nearby" },
  { from: "West Bengal", to: "Sikkim", type: "Popular Route" },
  { from: "Delhi", to: "Uttar Pradesh", type: "Nearby" },
  { from: "Uttar Pradesh", to: "Uttarakhand", type: "Nearby" },
  { from: "Tamil Nadu", to: "Andhra Pradesh", type: "Nearby" },
  { from: "Telangana", to: "Andhra Pradesh", type: "Cultural" }
];
