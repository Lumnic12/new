import { NextResponse } from "next/server"

const API_KEY = "94e59cac25116195eda13cc8107f1499"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query || query.length < 2) {
    return NextResponse.json({ suggestions: [] })
  }

  try {
    // Use OpenWeather's Geocoding API to search for locations
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch location suggestions")
    }

    const data = await response.json()

    // Format the response
    const suggestions = data.map((location: any) => ({
      name: location.name,
      state: location.state || "",
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      displayName: location.state
        ? `${location.name}, ${location.state}, ${location.country}`
        : `${location.name}, ${location.country}`,
    }))

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error("Error fetching location suggestions:", error)
    return NextResponse.json({ error: "Failed to fetch location suggestions" }, { status: 500 })
  }
}

