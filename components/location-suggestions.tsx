"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LocationSuggestionsProps {
  lat: number
  lon: number
  onSelectLocation: (location: string, lat: number, lon: number) => void
}

export default function LocationSuggestions({ lat, lon, onSelectLocation }: LocationSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!lat || !lon) return

      setLoading(true)
      try {
        const response = await fetch(`/api/weather?mode=suggestions&lat=${lat}&lon=${lon}`)
        if (!response.ok) {
          throw new Error("Failed to fetch location suggestions")
        }
        const data = await response.json()
        setSuggestions(data.suggestions || [])
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch location suggestions. Please try again.",
          variant: "destructive",
        })
        console.error("Error fetching location suggestions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSuggestions()
  }, [lat, lon, toast])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Safer Location Suggestions</CardTitle>
          <CardDescription>Loading nearby locations...</CardDescription>
        </CardHeader>
        <CardContent className="h-48 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Analyzing nearby areas...</div>
        </CardContent>
      </Card>
    )
  }

  if (suggestions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Safer Location Suggestions</CardTitle>
          <CardDescription>No location suggestions available.</CardDescription>
        </CardHeader>
        <CardContent className="h-48 flex items-center justify-center">
          <div className="text-muted-foreground">Try another location or check back later.</div>
        </CardContent>
      </Card>
    )
  }

  // Get only safer locations
  const saferLocations = suggestions.filter((location) => location.isSafer)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Safer Location Suggestions
        </CardTitle>
        <CardDescription>
          {saferLocations.length > 0
            ? "Nearby locations with better weather conditions"
            : "No safer locations found nearby. Current location has optimal conditions."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {saferLocations.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {saferLocations.slice(0, 4).map((location, index) => (
                <div key={index} className="border rounded-md p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{location.name}</h4>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Navigation className="h-3 w-3 mr-1" />
                        {location.direction}, {location.distance} km away
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Safer
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                    <div>
                      <p className="text-muted-foreground">Temp</p>
                      <p className="font-medium">{Math.round(location.main.temp)}°F</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Wind</p>
                      <p className="font-medium">{Math.round(location.wind.speed)} mph</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Conditions</p>
                      <p className="font-medium">{location.weather[0].main}</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => onSelectLocation(location.name, location.coord.lat, location.coord.lon)}
                  >
                    View Details <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 font-medium">Why these locations?</p>
                  <p className="text-blue-700 text-sm">
                    These locations have been identified as potentially safer based on current weather conditions,
                    including lower risk of severe weather, more moderate temperatures, and lower wind speeds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-md border border-green-200">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-medium">Your current location appears safe</p>
                  <p className="text-green-700 text-sm">
                    Based on our analysis, your current location has favorable weather conditions. No severe weather
                    warnings or hazardous conditions have been detected in nearby areas.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-md p-3">
              <p className="font-medium mb-2">Nearby Locations</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {suggestions.slice(0, 4).map((location, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto py-1"
                    onClick={() => onSelectLocation(location.name, location.coord.lat, location.coord.lon)}
                  >
                    {location.name} ({location.distance} km)
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-amber-700 text-sm">
                  Weather conditions can change rapidly. Continue to monitor forecasts and alerts.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

