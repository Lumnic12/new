import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, CloudRain, CloudSnow, Sun, Wind, Droplets, Thermometer } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface WeatherDisplayProps {
  weatherData: any
}

export default function WeatherDisplay({ weatherData }: WeatherDisplayProps) {
  if (!weatherData) return null

  const { main, weather, wind, name, sys, forecast } = weatherData
  const weatherIcon = getWeatherIcon(weather[0].id)
  const date = new Date()

  // Format date as "Monday, April 4, 2025"
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">
                {name}, {sys.country}
              </CardTitle>
              <CardDescription className="text-blue-100">{formattedDate}</CardDescription>
            </div>
            <div className="text-center">
              {weatherIcon}
              <p className="text-lg font-medium">{weather[0].main}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Thermometer className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <p className="text-sm text-muted-foreground">Temperature</p>
              <p className="text-2xl font-bold">{Math.round(main.temp)}°F</p>
              <div className="flex justify-center gap-2 mt-1">
                <Badge variant="outline">High: {Math.round(main.temp_max)}°F</Badge>
                <Badge variant="outline">Low: {Math.round(main.temp_min)}°F</Badge>
              </div>
            </div>

            <div className="text-center">
              <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="text-2xl font-bold">{main.humidity}%</p>
              <div className="mt-1">
                <Badge variant="outline">Feels like: {Math.round(main.feels_like)}°F</Badge>
              </div>
            </div>

            <div className="text-center">
              <Wind className="h-8 w-8 mx-auto mb-2 text-gray-500" />
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="text-2xl font-bold">{Math.round(wind.speed)} mph</p>
              <div className="mt-1">
                <Badge variant="outline">Direction: {getWindDirection(wind.deg)}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 flex justify-between">
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</p>
          <Badge>{getWeatherSeverity(weather[0].id, main.temp, wind.speed)}</Badge>
        </CardFooter>
      </Card>

      {forecast && forecast.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>5-Day Forecast</CardTitle>
            <CardDescription>Short-term weather prediction for your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {forecast.map((day, index) => (
                <div key={index} className="text-center p-2 border rounded">
                  <p className="text-sm font-medium">
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}
                  </p>
                  {getWeatherIcon(day.weather[0].id, "h-6 w-6 mx-auto my-1")}
                  <p className="text-xs">{day.weather[0].main}</p>
                  <p className="text-sm font-bold">{Math.round(day.main.temp)}°F</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function getWeatherIcon(weatherId: number, className = "h-12 w-12 text-white") {
  // Weather condition codes: https://openweathermap.org/weather-conditions
  if (weatherId >= 200 && weatherId < 300) {
    return <CloudRain className={className} /> // Thunderstorm
  } else if (weatherId >= 300 && weatherId < 400) {
    return <Droplets className={className} /> // Drizzle
  } else if (weatherId >= 500 && weatherId < 600) {
    return <CloudRain className={className} /> // Rain
  } else if (weatherId >= 600 && weatherId < 700) {
    return <CloudSnow className={className} /> // Snow
  } else if (weatherId >= 700 && weatherId < 800) {
    return <Wind className={className} /> // Atmosphere (fog, mist, etc.)
  } else if (weatherId === 800) {
    return <Sun className={className} /> // Clear sky
  } else if (weatherId > 800) {
    return <Cloud className={className} /> // Clouds
  }
  return <Cloud className={className} /> // Default
}

function getWindDirection(degrees: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
  const index = Math.round(degrees / 45) % 8
  return directions[index]
}

function getWeatherSeverity(weatherId: number, temp: number, windSpeed: number): string {
  // Determine weather severity based on conditions
  if (weatherId >= 200 && weatherId < 300) {
    return "Severe - Thunderstorm"
  } else if (weatherId >= 500 && weatherId < 600 && weatherId >= 502) {
    return "Severe - Heavy Rain"
  } else if (weatherId >= 600 && weatherId < 700 && weatherId >= 602) {
    return "Severe - Heavy Snow"
  } else if (temp > 95) {
    return "Severe - Extreme Heat"
  } else if (temp < 32) {
    return "Severe - Freezing"
  } else if (windSpeed > 20) {
    return "Moderate - High Winds"
  } else if ((weatherId >= 500 && weatherId < 600) || (weatherId >= 600 && weatherId < 700)) {
    return "Moderate"
  } else {
    return "Normal"
  }
}

