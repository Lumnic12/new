"use client"

import { useState } from "react"
import { AlertTriangle, Droplets, Thermometer, Wind, CloudRain, History, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import WeatherDisplay from "@/components/weather-display"
import EmergencyPlan from "@/components/emergency-plan"
import EmergencyKit from "@/components/emergency-kit"
import WeatherHazards from "@/components/weather-hazards"
import ResourceLinks from "@/components/resource-links"
import HistoricalWeather from "@/components/historical-weather"
import LocationSuggestions from "@/components/location-suggestions"
import LocationSearch from "@/components/location-search"
import { useToast } from "@/hooks/use-toast"
import { Chatbot } from "@/components/Chatbot"

export default function Home() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeAlert, setActiveAlert] = useState(null)
  const { toast } = useToast()

  const fetchWeatherData = async (searchLocation, searchLat = null, searchLon = null) => {
    if (!searchLocation && !searchLat && !searchLon) return

    setLoading(true)
    try {
      let url = ""
      if (searchLat && searchLon) {
        url = `/api/weather?lat=${searchLat}&lon=${searchLon}`
      } else {
        url = `/api/weather?location=${encodeURIComponent(searchLocation)}`
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch weather data")
      }
      const data = await response.json()
      setWeatherData(data)

      // Check for severe weather conditions
      checkForWeatherAlerts(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      })
      console.error("Error fetching weather data:", error)
    } finally {
      setLoading(false)
    }
  }

  const checkForWeatherAlerts = (data) => {
    if (!data) return

    // Check for extreme conditions
    const temp = data.main.temp
    const windSpeed = data.wind.speed
    const weatherId = data.weather[0].id

    // Weather condition codes: https://openweathermap.org/weather-conditions
    if (weatherId >= 200 && weatherId < 300) {
      setActiveAlert({
        type: "Thunderstorm",
        description: "Thunderstorm conditions detected. Seek shelter indoors and stay away from windows.",
        icon: <CloudRain className="h-5 w-5" />,
      })
    } else if (weatherId >= 300 && weatherId < 400) {
      setActiveAlert({
        type: "Drizzle",
        description: "Light rain conditions. Be cautious on roads and carry an umbrella.",
        icon: <Droplets className="h-5 w-5" />,
      })
    } else if (weatherId >= 500 && weatherId < 600) {
      setActiveAlert({
        type: "Rain",
        description: "Rainy conditions detected. Be aware of potential flooding in low-lying areas.",
        icon: <CloudRain className="h-5 w-5" />,
      })
    } else if (weatherId >= 600 && weatherId < 700) {
      setActiveAlert({
        type: "Snow",
        description: "Snowy conditions detected. Prepare for cold weather and potential road hazards.",
        icon: <CloudRain className="h-5 w-5" />,
      })
    } else if (temp > 95) {
      // Temperature in Fahrenheit
      setActiveAlert({
        type: "Extreme Heat",
        description: "Extreme heat conditions detected. Stay hydrated and avoid prolonged sun exposure.",
        icon: <Thermometer className="h-5 w-5" />,
      })
    } else if (windSpeed > 20) {
      // Wind speed in mph
      setActiveAlert({
        type: "High Winds",
        description: "High wind conditions detected. Secure loose objects outdoors and be cautious when driving.",
        icon: <Wind className="h-5 w-5" />,
      })
    } else {
      setActiveAlert(null)
    }
  }

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          fetchWeatherByCoords(latitude, longitude)
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your current location. Please enter it manually.",
            variant: "destructive",
          })
          console.error("Error getting location:", error)
        },
      )
    } else {
      toast({
        title: "Browser Support",
        description: "Geolocation is not supported by your browser. Please enter your location manually.",
        variant: "destructive",
      })
    }
  }

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      if (!response.ok) {
        throw new Error("Failed to fetch weather data")
      }
      const data = await response.json()
      setWeatherData(data)

      // Check for severe weather conditions
      checkForWeatherAlerts(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      })
      console.error("Error fetching weather data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectLocation = (locationName, lat, lon) => {
    if (lat && lon) {
      fetchWeatherByCoords(lat, lon)
    } else {
      fetchWeatherData(locationName)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Weather Preparedness Guide</h1>

      <LocationSearch
        onSelectLocation={handleSelectLocation}
        onGetCurrentLocation={handleGetCurrentLocation}
        loading={loading}
      />

      {activeAlert && (
        <Alert className="mb-6 border-orange-500 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <AlertTitle className="text-orange-500">{activeAlert.type} Alert</AlertTitle>
          <AlertDescription className="text-orange-700">{activeAlert.description}</AlertDescription>
        </Alert>
      )}

      {weatherData && (
        <>
          <WeatherDisplay weatherData={weatherData} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8">
            <LocationSuggestions
              lat={weatherData.coord.lat}
              lon={weatherData.coord.lon}
              onSelectLocation={handleSelectLocation}
            />

            <HistoricalWeather lat={weatherData.coord.lat} lon={weatherData.coord.lon} />
          </div>

          <Tabs defaultValue="hazards" className="mt-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-4">
              <TabsTrigger value="hazards">Weather Hazards</TabsTrigger>
              <TabsTrigger value="plan">Emergency Plan</TabsTrigger>
              <TabsTrigger value="kit">Emergency Kit</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="history" className="flex items-center">
                <History className="h-4 w-4 mr-2" />
                Historical Data
              </TabsTrigger>
              <TabsTrigger value="locations" className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Safe Locations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hazards">
              <WeatherHazards weatherData={weatherData} />
            </TabsContent>

            <TabsContent value="plan">
              <EmergencyPlan weatherData={weatherData} />
            </TabsContent>

            <TabsContent value="kit">
              <EmergencyKit weatherData={weatherData} />
            </TabsContent>

            <TabsContent value="resources">
              <ResourceLinks location={weatherData.name} />
            </TabsContent>

            <TabsContent value="history">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Historical Weather Analysis</CardTitle>
                    <CardDescription>
                      Review past weather patterns to better understand trends and prepare for future conditions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HistoricalWeather lat={weatherData.coord.lat} lon={weatherData.coord.lon} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="locations">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Safe Location Recommendations</CardTitle>
                    <CardDescription>
                      Find nearby locations with better weather conditions during emergencies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LocationSuggestions
                      lat={weatherData.coord.lat}
                      lon={weatherData.coord.lon}
                      onSelectLocation={handleSelectLocation}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}

      {!weatherData && !loading && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Welcome to the Weather Preparedness Guide</CardTitle>
            <CardDescription>
              Enter your location above to get personalized emergency preparedness tips based on current weather
              conditions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>This guide will help you:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Identify potential weather hazards in your area</li>
              <li>Create an emergency plan for different weather scenarios</li>
              <li>Assemble an appropriate emergency kit</li>
              <li>Stay informed during severe weather events</li>
              <li>View historical weather data to understand patterns</li>
              <li>Find safer locations during severe weather</li>
            </ul>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">Data provided by OpenWeather API</p>
          </CardFooter>
        </Card>
      )}
      <Chatbot />
    </main>
  )
}

