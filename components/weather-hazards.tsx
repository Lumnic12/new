import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CloudRain, CloudSnow, Thermometer, Wind, Sun, Droplets } from "lucide-react"

interface WeatherHazardsProps {
  weatherData: any
}

export default function WeatherHazards({ weatherData }: WeatherHazardsProps) {
  if (!weatherData) return null

  const { weather, main, wind } = weatherData
  const weatherId = weather[0].id
  const temp = main.temp
  const windSpeed = wind.speed

  // Determine potential hazards based on current weather
  const hazards = []

  // Thunderstorm
  if (weatherId >= 200 && weatherId < 300) {
    hazards.push({
      type: "Thunderstorm",
      icon: <CloudRain className="h-5 w-5" />,
      description: "Lightning strikes, heavy rain, and potential flooding",
      tips: [
        "Stay indoors and away from windows",
        "Avoid using electrical appliances",
        "If outdoors, seek shelter in a building or car (not under trees)",
        "If driving, pull over safely away from trees",
        "Avoid contact with plumbing and water",
      ],
    })
  }

  // Heavy Rain
  if (weatherId >= 500 && weatherId < 600 && weatherId >= 502) {
    hazards.push({
      type: "Heavy Rain",
      icon: <Droplets className="h-5 w-5" />,
      description: "Flooding, reduced visibility, and slippery roads",
      tips: [
        "Avoid driving through flooded areas",
        "Stay away from streams, drainage channels, and low-lying areas",
        "Move to higher ground if in a flood-prone area",
        "Prepare for possible power outages",
        "Have emergency supplies ready",
      ],
    })
  }

  // Snow
  if (weatherId >= 600 && weatherId < 700) {
    hazards.push({
      type: "Snow",
      icon: <CloudSnow className="h-5 w-5" />,
      description: "Reduced visibility, slippery roads, and cold temperatures",
      tips: [
        "Limit travel and stay indoors if possible",
        "Dress in layers if going outside",
        "Drive slowly and maintain distance from other vehicles",
        "Keep emergency supplies in your vehicle",
        "Watch for signs of hypothermia and frostbite",
      ],
    })
  }

  // Extreme Heat
  if (temp > 95) {
    hazards.push({
      type: "Extreme Heat",
      icon: <Thermometer className="h-5 w-5" />,
      description: "Heat exhaustion, heat stroke, and dehydration",
      tips: [
        "Stay in air-conditioned areas when possible",
        "Drink plenty of water, even if not thirsty",
        "Wear lightweight, light-colored clothing",
        "Limit outdoor activities to morning and evening",
        "Check on elderly neighbors and those without AC",
      ],
    })
  }

  // Extreme Cold
  if (temp < 32) {
    hazards.push({
      type: "Extreme Cold",
      icon: <Thermometer className="h-5 w-5" />,
      description: "Hypothermia, frostbite, and frozen pipes",
      tips: [
        "Stay indoors when possible",
        "Dress in layers if going outside",
        "Keep emergency heating supplies ready",
        "Protect pipes from freezing",
        "Check on elderly neighbors and vulnerable people",
      ],
    })
  }

  // High Winds
  if (windSpeed > 20) {
    hazards.push({
      type: "High Winds",
      icon: <Wind className="h-5 w-5" />,
      description: "Downed trees, power lines, and flying debris",
      tips: [
        "Secure outdoor furniture and objects",
        "Stay away from windows",
        "Be cautious when driving, especially in high-profile vehicles",
        "Prepare for possible power outages",
        "Have emergency supplies ready",
      ],
    })
  }

  // UV Exposure (for clear days)
  if (weatherId === 800 && temp > 75) {
    hazards.push({
      type: "UV Exposure",
      icon: <Sun className="h-5 w-5" />,
      description: "Sunburn, heat exhaustion, and increased risk of skin damage",
      tips: [
        "Apply sunscreen with SPF 30 or higher",
        "Wear a hat and sunglasses",
        "Seek shade during peak sun hours (10am-4pm)",
        "Stay hydrated",
        "Take breaks from sun exposure",
      ],
    })
  }

  // If no specific hazards, provide general safety tips
  if (hazards.length === 0) {
    hazards.push({
      type: "General Weather Awareness",
      icon: <AlertTriangle className="h-5 w-5" />,
      description: "Stay prepared for changing weather conditions",
      tips: [
        "Keep an emergency kit ready",
        "Stay informed about weather forecasts",
        "Have a family emergency plan",
        "Know evacuation routes in your area",
        "Keep important documents in a waterproof container",
      ],
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Potential Weather Hazards</CardTitle>
          <CardDescription>
            Based on current conditions in {weatherData.name}, here are potential hazards to be aware of:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hazards.map((hazard, index) => (
              <Alert key={index} className="border-amber-500 bg-amber-50">
                <div className="flex items-center gap-2">
                  {hazard.icon}
                  <AlertTitle className="text-amber-800">{hazard.type}</AlertTitle>
                </div>
                <AlertDescription className="mt-2">
                  <p className="text-amber-700 mb-2">{hazard.description}</p>
                  <div className="mt-2">
                    <p className="font-medium text-amber-800 mb-1">Safety Tips:</p>
                    <ul className="list-disc pl-5 space-y-1 text-amber-700">
                      {hazard.tips.map((tip, tipIndex) => (
                        <li key={tipIndex}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Know Your Weather Warnings</CardTitle>
          <CardDescription>Understanding official weather alerts can help you respond appropriately</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded p-4 bg-yellow-50 border-yellow-200">
              <h3 className="font-bold text-yellow-800 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Weather Watch
              </h3>
              <p className="text-yellow-700 mt-1">
                Conditions are favorable for hazardous weather. Stay alert and monitor forecasts.
              </p>
            </div>

            <div className="border rounded p-4 bg-red-50 border-red-200">
              <h3 className="font-bold text-red-800 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Weather Warning
              </h3>
              <p className="text-red-700 mt-1">
                Hazardous weather is occurring or imminent. Take action immediately for your safety.
              </p>
            </div>

            <div className="border rounded p-4 bg-orange-50 border-orange-200">
              <h3 className="font-bold text-orange-800 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Weather Advisory
              </h3>
              <p className="text-orange-700 mt-1">
                Weather conditions may cause inconvenience but are not life-threatening if precautions are taken.
              </p>
            </div>

            <div className="border rounded p-4 bg-blue-50 border-blue-200">
              <h3 className="font-bold text-blue-800 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Special Weather Statement
              </h3>
              <p className="text-blue-700 mt-1">
                Provides information about weather that is not severe enough for warnings but may cause concern.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

