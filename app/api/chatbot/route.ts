import { NextResponse } from 'next/server'

const API_KEY = "94e59cac25116195eda13cc8107f1499"

function getClothingSuggestions(temp: number, weatherId: number) {
  let clothing = ''

  // Temperature based suggestions
  if (temp > 30) {
    clothing += "🌞 For hot weather:\n" +
      "- Light, breathable clothing\n" +
      "- Cotton t-shirts and shorts\n" +
      "- Sunscreen (SPF 30+)\n" +
      "- Sunglasses and hat\n" +
      "- Bring water bottle"
  } else if (temp > 20) {
    clothing += "😊 For warm weather:\n" +
      "- Light layers\n" +
      "- Short sleeves\n" +
      "- Light pants or shorts\n" +
      "- Light sunscreen recommended"
  } else if (temp > 10) {
    clothing += "🍂 For mild weather:\n" +
      "- Light jacket or sweater\n" +
      "- Long sleeve shirts\n" +
      "- Regular pants\n" +
      "- Light scarf optional"
  } else {
    clothing += "❄️ For cold weather:\n" +
      "- Warm jacket or coat\n" +
      "- Sweater or thermal wear\n" +
      "- Warm pants\n" +
      "- Hat, scarf, and gloves"
  }

  // Weather condition specific additions
  if (weatherId >= 200 && weatherId < 300) {
    clothing += "\n\n⛈️ For thunderstorm:\n" +
      "- Waterproof jacket\n" +
      "- Avoid carrying umbrellas\n" +
      "- Waterproof shoes"
  } else if (weatherId >= 300 && weatherId < 600) {
    clothing += "\n\n🌧️ For rain:\n" +
      "- Rain jacket or raincoat\n" +
      "- Umbrella\n" +
      "- Waterproof shoes"
  } else if (weatherId >= 600 && weatherId < 700) {
    clothing += "\n\n🌨️ Additional for snow:\n" +
      "- Snow boots\n" +
      "- Waterproof gloves\n" +
      "- Warm socks"
  }

  return clothing
}

async function getWeatherData(location: string) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric`,
      { next: { revalidate: 300 } }
    )
    
    if (!response.ok) {
      // Handle 404 errors specifically for city not found
      if (response.status === 404) {
        throw new Error(`Location not found: ${location}`)
      }
      // Handle other API errors
      throw new Error(`Weather API Error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching weather:', error)
    throw error
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { message } = body

    // Add debug logging
    console.log('Received message:', message)

    const locationMatch = message.match(/(?:weather|temperature|how is) (?:in|at|of) (.+)/i)
    if (!locationMatch) {
      return NextResponse.json({
        response: "You can ask me about weather conditions. Try: 'Weather in London' or 'Temperature in Tokyo'"
      })
    }

    const location = locationMatch[1].trim()
    console.log('Fetching weather for:', location)
    
    const weatherData = await getWeatherData(location)
    console.log('Weather data received:', weatherData)

    const temp = weatherData.main.temp
    const tempF = (temp * 9/5) + 32
    const condition = weatherData.weather[0].description
    const clothing = getClothingSuggestions(temp, weatherData.weather[0].id)

    return NextResponse.json({
      response: `📍 ${weatherData.name} Weather:
🌡️ ${temp.toFixed(1)}°C (${tempF.toFixed(1)}°F)
🌤️ ${condition}

👔 Suggestions:
${clothing}`
    })

  } catch (error) {
    console.error('API Error:', error)
    
    // Provide a more user-friendly message based on the error
    let errorMessage = "Sorry, I couldn't get weather data. Please try a different city name."
    let statusCode = 500
    
    // Check if it's a location not found error
    if (error.message && error.message.includes('Location not found')) {
      errorMessage = `I couldn't find that location. Please check the spelling or try a different city name.`
      statusCode = 404
    }
    
    return NextResponse.json(
      { 
        response: errorMessage,
        error: error.message 
      },
      { status: statusCode }
    )
  }
}