import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Home, Users, Phone, MapPin, ArrowRight } from "lucide-react"

interface EmergencyPlanProps {
  weatherData: any
}

export default function EmergencyPlan({ weatherData }: EmergencyPlanProps) {
  if (!weatherData) return null

  // Determine which emergency plans to highlight based on weather
  const weatherId = weatherData.weather[0].id
  const temp = weatherData.main.temp
  const isThunderstorm = weatherId >= 200 && weatherId < 300
  const isRain = weatherId >= 500 && weatherId < 600
  const isSnow = weatherId >= 600 && weatherId < 700
  const isExtremeHeat = temp > 95
  const isExtremeCold = temp < 32

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Your Emergency Plan</CardTitle>
          <CardDescription>
            Having a plan in place before severe weather strikes can save lives. Customize these plans for your
            household.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={getDefaultTab(weatherId, temp)}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
              <TabsTrigger value="general">General Plan</TabsTrigger>
              <TabsTrigger value="evacuation">Evacuation</TabsTrigger>
              <TabsTrigger value="shelter">Shelter-in-Place</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">General Emergency Plan Checklist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <Home className="h-4 w-4 mr-2" />
                        Know Your Home
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span>Locate utility shutoffs (gas, water, electricity)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span>Identify safe rooms for different emergencies</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span>Have multiple exit routes from each room</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        Know Your Area
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span>Identify evacuation routes from your neighborhood</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span>Locate nearby emergency shelters</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span>Know your community's emergency alert system</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Family Plan
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span>Designate meeting places (near home and outside neighborhood)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span>Assign responsibilities to each family member</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span>Plan for pets and special needs family members</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Emergency Contacts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span>Create a contact list with phone numbers and addresses</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span>Designate an out-of-area contact person</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span>Share your plan with trusted neighbors</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-4">
                  <h4 className="font-medium text-blue-800 mb-2">Practice Makes Perfect</h4>
                  <p className="text-blue-700">
                    Review and practice your emergency plan with all household members at least twice a year. Update
                    contact information and meeting locations as needed.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="evacuation">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Evacuation Plan</h3>
                <p>When to evacuate: Flooding, wildfires, chemical spills, or when ordered by authorities.</p>

                <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mb-4">
                  <h4 className="font-medium text-amber-800 mb-2">Evacuation Preparation</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                      <span>Know multiple evacuation routes from your home and community</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                      <span>Designate meeting places: one close to home and one outside your neighborhood</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                      <span>Keep your vehicle's gas tank at least half full at all times</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                      <span>Prepare a "go bag" with essentials (see Emergency Kit tab)</span>
                    </li>
                  </ul>
                </div>

                <h4 className="font-medium">When Evacuating:</h4>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Listen to local authorities for evacuation instructions</li>
                  <li>Wear sturdy shoes and weather-appropriate clothing</li>
                  <li>Take your emergency kit and important documents</li>
                  <li>Lock your home and use the evacuation route specified by authorities</li>
                  <li>Do not drive through flooded areas</li>
                  <li>Stay away from downed power lines</li>
                </ol>

                {(isRain || isThunderstorm) && (
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-4">
                    <h4 className="font-medium text-blue-800 mb-2">Flood Evacuation Tips</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                        <span>Move to higher ground immediately</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                        <span>Never walk, swim, or drive through flood waters</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                        <span>Just 6 inches of moving water can knock you down</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                        <span>One foot of water can float your vehicle</span>
                      </li>
                    </ul>
                  </div>
                )}

                {isSnow && (
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-4">
                    <h4 className="font-medium text-blue-800 mb-2">Winter Storm Evacuation Tips</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                        <span>Travel during daylight hours if possible</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                        <span>Don't travel alone and let others know your schedule</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                        <span>Stay on main roads and avoid shortcuts</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                        <span>Carry winter emergency supplies in your vehicle</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="shelter">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Shelter-in-Place Plan</h3>
                <p>
                  When to shelter in place: Tornadoes, severe thunderstorms, hazardous material releases, or when
                  advised by authorities.
                </p>

                <div className="bg-green-50 p-4 rounded-md border border-green-200 mb-4">
                  <h4 className="font-medium text-green-800 mb-2">General Shelter-in-Place Guidelines</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span>Choose interior rooms with few or no windows</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span>For tornadoes, choose a basement or lowest level room</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span>For chemical incidents, choose a room where you can seal doors and windows</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span>Have emergency supplies stored in your shelter location</span>
                    </li>
                  </ul>
                </div>

                {isThunderstorm && (
                  <div className="bg-purple-50 p-4 rounded-md border border-purple-200 mt-4">
                    <h4 className="font-medium text-purple-800 mb-2">Thunderstorm/Tornado Safety</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 text-purple-500 mt-0.5" />
                        <span>Go to the basement or an interior room on the lowest floor</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 text-purple-500 mt-0.5" />
                        <span>Stay away from windows, doors, and outside walls</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 text-purple-500 mt-0.5" />
                        <span>Get under something sturdy (heavy table) or cover yourself with a mattress</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 text-purple-500 mt-0.5" />
                        <span>Do not open windows (it doesn't equalize pressure and wastes time)</span>
                      </li>
                    </ul>
                  </div>
                )}

                {(isExtremeHeat || isExtremeCold) && (
                  <div className="bg-orange-50 p-4 rounded-md border border-orange-200 mt-4">
                    <h4 className="font-medium text-orange-800 mb-2">
                      {isExtremeHeat ? "Extreme Heat Safety" : "Extreme Cold Safety"}
                    </h4>
                    <ul className="space-y-2">
                      {isExtremeHeat ? (
                        <>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 text-orange-500 mt-0.5" />
                            <span>Stay in air-conditioned locations as much as possible</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 text-orange-500 mt-0.5" />
                            <span>Close blinds and curtains to keep out the sun</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 text-orange-500 mt-0.5" />
                            <span>Use fans to circulate air (but don't rely on fans alone in extreme heat)</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 text-orange-500 mt-0.5" />
                            <span>Take cool showers or baths to lower body temperature</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 text-orange-500 mt-0.5" />
                            <span>Stay in a well-insulated room with emergency heating</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 text-orange-500 mt-0.5" />
                            <span>Close off unused rooms to conserve heat</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 text-orange-500 mt-0.5" />
                            <span>Stuff towels or rags in cracks under doors</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 text-orange-500 mt-0.5" />
                            <span>Wear layers of loose-fitting, lightweight, warm clothing</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="communication">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Emergency Communication Plan</h3>
                <p>
                  Communication is critical during emergencies. Create a plan for how your household will stay in touch.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span>Create a physical contact card for each family member</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span>Include phone numbers, email addresses, and social media</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span>Include medical information and meeting places</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Out-of-Area Contact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span>Designate someone outside your area as a central contact</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span>Local phone lines may be down, but long-distance might work</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                          <span>Everyone should contact this person with their status</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-indigo-50 p-4 rounded-md border border-indigo-200 mt-4">
                  <h4 className="font-medium text-indigo-800 mb-2">Communication Tips During Emergencies</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 text-indigo-500 mt-0.5" />
                      <span>Text messages may go through when calls won't</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 text-indigo-500 mt-0.5" />
                      <span>Keep calls brief to reduce network congestion</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 text-indigo-500 mt-0.5" />
                      <span>Use social media to broadcast your status to multiple people</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 text-indigo-500 mt-0.5" />
                      <span>Have a battery-powered or hand-crank radio for emergency broadcasts</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 mr-2 text-indigo-500 mt-0.5" />
                      <span>Keep a portable charger or power bank for your mobile devices</span>
                    </li>
                  </ul>
                </div>

                <div className="border p-4 rounded-md mt-4">
                  <h4 className="font-medium mb-2">Emergency Meeting Places</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">Indoor Meeting Place:</p>
                      <p className="text-sm text-gray-600">
                        A safe location in your home where everyone should gather (e.g., basement, bathroom, or interior
                        hallway)
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Neighborhood Meeting Place:</p>
                      <p className="text-sm text-gray-600">
                        A location within walking distance (e.g., neighbor's house, community center, or local park)
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Out-of-Neighborhood Meeting Place:</p>
                      <p className="text-sm text-gray-600">
                        A location everyone can get to if you can't return home (e.g., library, place of worship, or
                        relative's home)
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Regional Meeting Place:</p>
                      <p className="text-sm text-gray-600">
                        A location outside your town if you need to evacuate the area (e.g., hotel, relative's home in
                        another city)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function getDefaultTab(weatherId: number, temp: number): string {
  // Determine which tab to show by default based on weather conditions
  if (weatherId >= 200 && weatherId < 300) {
    return "shelter" // Thunderstorm - shelter in place
  } else if (
    (weatherId >= 500 && weatherId < 600 && weatherId >= 502) ||
    (weatherId >= 600 && weatherId < 700 && weatherId >= 602)
  ) {
    return "evacuation" // Heavy rain or snow - evacuation
  } else if (temp > 95 || temp < 32) {
    return "shelter" // Extreme temperatures - shelter in place
  } else {
    return "general" // Default to general plan
  }
}

