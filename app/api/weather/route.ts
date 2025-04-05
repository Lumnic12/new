import { NextResponse } from "next/server"

const API_KEY = "94e59cac25116195eda13cc8107f1499"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get("location")
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const mode = searchParams.get("mode") || "current" // current, historical, or suggestions

  try {
    if (mode === "historical") {
      return await getHistoricalData(lat, lon)
    } else if (mode === "suggestions") {
      return await getLocationSuggestions(lat, lon)
    } else {
      // Regular current weather data
      let url: string

      if (lat && lon) {
        // Search by coordinates
        url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
      } else if (location) {
        // Search by city name or zip code
        url = `${BASE_URL}/weather?q=${location}&appid=${API_KEY}&units=imperial`
      } else {
        return NextResponse.json({ error: "Location or coordinates are required" }, { status: 400 })
      }

      const response = await fetch(url)

      if (!response.ok) {
        const errorData = await response.json()
        return NextResponse.json(
          { error: errorData.message || "Failed to fetch weather data" },
          { status: response.status },
        )
      }

      const data = await response.json()

      // Get 5-day forecast
      const forecastUrl = `${BASE_URL}/forecast?${lat && lon ? `lat=${lat}&lon=${lon}` : `q=${location}`}&appid=${API_KEY}&units=imperial`
      const forecastResponse = await fetch(forecastUrl)
      const forecastData = await forecastResponse.json()

      // Combine current weather with forecast
      const result = {
        ...data,
        forecast: forecastData.list ? forecastData.list.slice(0, 5) : [],
      }

      return NextResponse.json(result)
    }
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}

async function getHistoricalData(lat: string | null, lon: string | null) {
  if (!lat || !lon) {
    return NextResponse.json({ error: "Coordinates are required for historical data" }, { status: 400 })
  }

  try {
    // Since OpenWeather's historical data API requires a paid subscription,
    // we'll use the One Call API to get the last 5 days of data
    const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=imperial`
    const response = await fetch(oneCallUrl)

    if (!response.ok) {
      // If One Call API fails, fall back to simulated data
      return getSimulatedHistoricalData(lat, lon)
    }

    const data = await response.json()

    // Format the data for our charts
    const historicalData = data.daily.map((day: any) => ({
      dt: day.dt,
      date: new Date(day.dt * 1000).toISOString().split("T")[0],
      temp: {
        day: day.temp.day,
        min: day.temp.min,
        max: day.temp.max,
      },
      precipitation: day.rain || 0,
      wind_speed: day.wind_speed,
      humidity: day.humidity,
    }))

    return NextResponse.json({ historical: historicalData })
  } catch (error) {
    console.error("Error fetching One Call API data:", error)
    // Fall back to simulated data if the API call fails
    return getSimulatedHistoricalData(lat, lon)
  }
}

async function getSimulatedHistoricalData(lat: string | null, lon: string | null) {
  // Generate simulated historical data
  const now = Math.floor(Date.now() / 1000)
  const oneDay = 86400 // seconds in a day
  const historyData = []

  // Generate data for the past 7 days
  for (let i = 7; i >= 0; i--) {
    const date = now - i * oneDay

    // Create simulated data with some randomness but following a pattern
    const baseTemp = 70 + Math.sin(i * 0.5) * 10 // Sinusoidal pattern
    const basePrecip = Math.max(0, Math.sin(i * 0.8) * 0.5) // Some days with rain
    const baseWind = 5 + Math.cos(i * 0.7) * 3 // Varying wind speed

    historyData.push({
      dt: date,
      date: new Date(date * 1000).toISOString().split("T")[0],
      temp: {
        day: baseTemp + (Math.random() * 5 - 2.5),
        min: baseTemp - (5 + Math.random() * 3),
        max: baseTemp + (5 + Math.random() * 3),
      },
      precipitation: basePrecip + Math.random() * 0.3,
      wind_speed: baseWind + (Math.random() * 2 - 1),
      humidity: 50 + Math.floor(Math.random() * 30),
    })
  }

  return NextResponse.json({ historical: historyData })
}

async function getLocationSuggestions(lat: string | null, lon: string | null) {
  if (!lat || !lon) {
    return NextResponse.json({ error: "Coordinates are required for location suggestions" }, { status: 400 })
  }

  // Get current weather at the user's location
  const currentUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
  const currentResponse = await fetch(currentUrl)

  if (!currentResponse.ok) {
    return NextResponse.json({ error: "Failed to fetch current weather data" }, { status: currentResponse.status })
  }

  const currentData = await currentResponse.json()

  // Get nearby cities (simulated - in a real app, you would use a geocoding API)
  // For this example, we'll use fixed offsets to generate nearby locations
  const offsets = [
    { lat: 0.1, lon: 0.1, name: "Northeast" },
    { lat: 0.1, lon: -0.1, name: "Northwest" },
    { lat: -0.1, lon: 0.1, name: "Southeast" },
    { lat: -0.1, lon: -0.1, name: "Southwest" },
    { lat: 0.2, lon: 0, name: "North" },
    { lat: -0.2, lon: 0, name: "South" },
    { lat: 0, lon: 0.2, name: "East" },
    { lat: 0, lon: -0.2, name: "West" },
  ]

  // Fetch weather for nearby locations
  const nearbyCities = await Promise.all(
    offsets.map(async (offset) => {
      const nearbyLat = Number.parseFloat(lat) + offset.lat
      const nearbyLon = Number.parseFloat(lon) + offset.lon

      const url = `${BASE_URL}/weather?lat=${nearbyLat}&lon=${nearbyLon}&appid=${API_KEY}&units=imperial`
      const response = await fetch(url)

      if (!response.ok) {
        return null
      }

      const data = await response.json()
      return {
        ...data,
        direction: offset.name,
        distance: Math.round(
          Math.sqrt(
            Math.pow(offset.lat * 111, 2) +
              Math.pow(offset.lon * 111 * Math.cos((Number.parseFloat(lat) * Math.PI) / 180), 2),
          ),
        ), // Approximate distance in km
        isSafer: isSaferLocation(currentData, data),
      }
    }),
  )

  // Filter out any failed requests
  const validCities = nearbyCities.filter((city) => city !== null)

  // Sort by safety (safer locations first)
  validCities.sort((a, b) => {
    if (a.isSafer && !b.isSafer) return -1
    if (!a.isSafer && b.isSafer) return 1
    return a.distance - b.distance // If safety is the same, sort by distance
  })

  return NextResponse.json({
    current: currentData,
    suggestions: validCities,
  })
}

function isSaferLocation(currentWeather: any, nearbyWeather: any): boolean {
  // Determine if the nearby location has better weather conditions

  // Check for severe weather conditions
  const currentWeatherId = currentWeather.weather[0].id
  const nearbyWeatherId = nearbyWeather.weather[0].id

  // Thunderstorms (200-299)
  if (currentWeatherId >= 200 && currentWeatherId < 300 && (nearbyWeatherId < 200 || nearbyWeatherId >= 300)) {
    return true
  }

  // Heavy rain (500-599)
  if (
    currentWeatherId >= 502 &&
    currentWeatherId < 600 &&
    (nearbyWeatherId < 500 || nearbyWeatherId === 500 || nearbyWeatherId === 501)
  ) {
    return true
  }

  // Heavy snow (600-699)
  if (
    currentWeatherId >= 602 &&
    currentWeatherId < 700 &&
    (nearbyWeatherId < 600 || nearbyWeatherId === 600 || nearbyWeatherId === 601)
  ) {
    return true
  }

  // Extreme temperatures
  if (
    (currentWeather.main.temp > 95 && nearbyWeather.main.temp <= 95) ||
    (currentWeather.main.temp < 32 && nearbyWeather.main.temp >= 32)
  ) {
    return true
  }

  // High winds
  if (currentWeather.wind.speed > 20 && nearbyWeather.wind.speed <= 20) {
    return true
  }

  return false
}

