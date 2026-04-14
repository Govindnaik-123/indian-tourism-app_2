import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Destination from '@/models/Destination';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { mood, season, budget, travelType, landscape } = await request.json();

    const filters: any = {};

    if (mood) {
      filters.moodMatch = mood;
    }
    if (season) {
      filters.season = season;
    }
    if (landscape) {
      filters.landscape = landscape;
    }

    // First try to find destinations matching the primary criteria
    let destinations = await Destination.find(filters).limit(5);

    // If not enough results, relax some filters
    if (destinations.length < 3 && mood && season) {
      destinations = await Destination.find({
        $or: [
          { moodMatch: mood },
          { season: season },
        ],
      }).limit(5);
    }

    // If still not enough, get any destinations
    if (destinations.length < 1) {
      destinations = await Destination.find({}).limit(5);
    }

    return NextResponse.json({
      success: true,
      message: 'Recommendations retrieved successfully',
      data: {
        recommendations: destinations,
        filters: { mood, season, budget, travelType, landscape },
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Recommendation error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to get recommendations',
      data: null
    }, { status: 500 });
  }
}
