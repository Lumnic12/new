"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Thermometer, Droplets, Wind } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface HistoricalWeatherProps {
  lat: number
  lon: number
}

export default function HistoricalWeather({ lat, lon }: HistoricalWeatherProps) {
  const [historicalData, setHistoricalData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (!lat || !lon) return

      setLoading(true)
      try {
        const response = await fetch(`/api/weather?mode=historical&lat=${lat}&lon=${lon}`)
        if (!response.ok) {
          throw new Error("Failed to fetch historical weather data")
        }
        const data = await response.json()
        setHistoricalData(data.historical || [])
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch historical weather data. Please try again.",
          variant: "destructive",
        })
        console.error("Error fetching historical data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHistoricalData()
  }, [lat, lon, toast])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historical Weather Data</CardTitle>
          <CardDescription>Loading historical weather data...</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading data...</div>
        </CardContent>
      </Card>
    )
  }

  if (historicalData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historical Weather Data</CardTitle>
          <CardDescription>No historical data available for this location.</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="text-muted-foreground">Try another location or check back later.</div>
        </CardContent>
      </Card>
    )
  }

  // Format the data for the charts
  const formattedData = historicalData.map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    highTemp: Math.round(day.temp.max),
    avgTemp: Math.round(day.temp.day),
    lowTemp: Math.round(day.temp.min),
    precipitation: day.precipitation.toFixed(2),
    windSpeed: Math.round(day.wind_speed),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historical Weather Data</CardTitle>
        <CardDescription>Weather trends for the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="temperature">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="temperature" className="flex items-center">
              <Thermometer className="h-4 w-4 mr-2" />
              Temperature
            </TabsTrigger>
            <TabsTrigger value="precipitation" className="flex items-center">
              <Droplets className="h-4 w-4 mr-2" />
              Precipitation
            </TabsTrigger>
            <TabsTrigger value="wind" className="flex items-center">
              <Wind className="h-4 w-4 mr-2" />
              Wind Speed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="temperature">
            <div className="h-80">
              <div className="w-full h-full flex flex-col">
                <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                  <span>Date</span>
                  <span>Temperature (°F)</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-2">Date</th>
                        <th className="text-right p-2">High</th>
                        <th className="text-right p-2">Average</th>
                        <th className="text-right p-2">Low</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formattedData.map((day, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{day.date}</td>
                          <td className="text-right p-2 text-red-500">{day.highTemp}°F</td>
                          <td className="text-right p-2 text-blue-500">{day.avgTemp}°F</td>
                          <td className="text-right p-2 text-green-500">{day.lowTemp}°F</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="precipitation">
            <div className="h-80">
              <div className="w-full h-full flex flex-col">
                <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                  <span>Date</span>
                  <span>Precipitation (in)</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-2">Date</th>
                        <th className="text-right p-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formattedData.map((day, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{day.date}</td>
                          <td className="text-right p-2 text-blue-500">{day.precipitation} in</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wind">
            <div className="h-80">
              <div className="w-full h-full flex flex-col">
                <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                  <span>Date</span>
                  <span>Wind Speed (mph)</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-2">Date</th>
                        <th className="text-right p-2">Speed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formattedData.map((day, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{day.date}</td>
                          <td className="text-right p-2 text-amber-500">{day.windSpeed} mph</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-sm text-muted-foreground text-center">
          Historical data for the past week. Data points show daily averages.
        </div>
      </CardContent>
    </Card>
  )
}

