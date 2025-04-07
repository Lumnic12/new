

"use client"

import { useState, useEffect, useRef } from "react"
import { Search, MapPin, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useDebounce } from "@/hooks/use-debounce"

interface LocationSearchProps {
  onSelectLocation: (location: string, lat: number, lon: number) => void
  onGetCurrentLocation: () => void
  loading: boolean
}

interface LocationSuggestion {
  name: string
  state: string
  country: string
  lat: number
  lon: number
  displayName: string
}

export default function LocationSearch({ onSelectLocation, onGetCurrentLocation, loading }: LocationSearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 500)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length < 2) {
        setSuggestions([])
        return
      }

      setSearchLoading(true)
      try {
        const response = await fetch(`/api/location-search?query=${encodeURIComponent(debouncedQuery)}`)
        if (!response.ok) {
          throw new Error("Failed to fetch location suggestions")
        }
        const data = await response.json()
        setSuggestions(data.suggestions || [])
        setShowSuggestions(true)
      } catch (error) {
        console.error("Error fetching location suggestions:", error)
        toast({
          title: "Error",
          description: "Failed to fetch location suggestions. Please try again.",
          variant: "destructive",
        })
      } finally {
        setSearchLoading(false)
      }
    }

    fetchSuggestions()
  }, [debouncedQuery, toast])

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelectSuggestion = (suggestion: LocationSuggestion) => {
    setQuery(suggestion.displayName)
    setShowSuggestions(false)
    onSelectLocation(suggestion.name, suggestion.lat, suggestion.lon)
  }

  return (
    <div className="relative w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter your city or zip code"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pr-10"
              onFocus={() => {
                if (suggestions.length > 0) {
                  setShowSuggestions(true)
                }
              }}
            />
            {searchLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion.name}-${suggestion.lat}-${suggestion.lon}-${index}`}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{suggestion.displayName}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button
          onClick={() => {
            if (query) {
              // If we have a selected suggestion with coordinates, use that
              const selectedSuggestion = suggestions.find((s) => s.displayName === query)
              if (selectedSuggestion) {
                onSelectLocation(selectedSuggestion.name, selectedSuggestion.lat, selectedSuggestion.lon)
              } else {
                // Otherwise, search by name
                onSelectLocation(query, 0, 0)
              }
            }
          }}
          disabled={loading || !query}
        >
          {loading ? "Loading..." : "Get Weather"}
          <Search className="ml-2 h-4 w-4" />
        </Button>

        <Button variant="outline" onClick={onGetCurrentLocation} disabled={loading}>
          Use My Location
        </Button>
      </div>
    </div>
  )
}

