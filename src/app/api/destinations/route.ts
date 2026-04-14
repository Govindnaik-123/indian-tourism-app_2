import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Destination from '@/models/Destination';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state');
    const mood = searchParams.get('mood');
    const season = searchParams.get('season');
    const popularity = searchParams.get('popularity');
    const type = searchParams.get('type');

    // Build the dynamic MongoDB query
    const query: any = {};

    if (state) {
      // Use regex for case-insensitive state matching
      query.state = { $regex: new RegExp(`^${state}$`, 'i') };
    }
    
    if (mood) {
      // The schema has moodMatch: ['Happy', 'Sad', ...]
      query.moodMatch = { $regex: new RegExp(`^${mood}$`, 'i') };
    }

    if (season) {
      query.season = { $regex: new RegExp(`^${season}$`, 'i') };
    }

    if (popularity) {
      // Optional mapping if popularity implies rating or specific field, but let's assume it checks budget or rating, or we can skip if not fully implemented in schema.
      // E.g. query.rating = popularity === 'Popular' ? { $gte: 4 } : { $lt: 4 };
    }

    if (type) {
      // 'type' in static file is mapped to 'landscape' in MongoDB schema
      query.landscape = { $regex: new RegExp(`^${type}$`, 'i') };
    }

    // Execute the query
    const results = await Destination.find(query);

    return NextResponse.json({
      success: true,
      data: results
    }, { status: 200 });

  } catch (error) {
    console.error('Destinations API Error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch destinations',
      data: []
    }, { status: 500 });
  }
}

