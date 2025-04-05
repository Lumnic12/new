import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Package, Droplets, CloudSnow, CloudRain, Thermometer } from "lucide-react"

interface EmergencyKitProps {
  weatherData: any
}

export default function EmergencyKit({ weatherData }: EmergencyKitProps) {
  if (!weatherData) return null

  // Determine which emergency kits to highlight based on weather
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
          <CardTitle>Emergency Kit Essentials</CardTitle>
          <CardDescription>
            Prepare emergency supplies before disaster strikes. Customize your kit based on your household's needs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
              <TabsTrigger value="basic">Basic Kit</TabsTrigger>
              <TabsTrigger value="car">Car Kit</TabsTrigger>
              <TabsTrigger value="specialized">Weather-Specific</TabsTrigger>
              <TabsTrigger value="documents">Important Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Basic Emergency Kit
                </h3>
                <p>Every household should have a basic emergency kit with these essentials:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-medium mb-2">Water and Food</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>One gallon of water per person per day for at least three days</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Non-perishable food for at least three days</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Manual can opener</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Baby food and formula if needed</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Pet food if needed</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Safety and Communication</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Battery-powered or hand-crank radio</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Flashlight with extra batteries</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>First aid kit</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Whistle to signal for help</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Cell phone with chargers and backup battery</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Sanitation and Personal Care</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Moist towelettes, garbage bags, and plastic ties</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Soap, hand sanitizer, and disinfecting wipes</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Toothbrush, toothpaste, and other hygiene items</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Prescription medications and glasses</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Feminine supplies and personal hygiene items</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Tools and Supplies</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Multi-purpose tool or basic tools</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Duct tape and plastic sheeting</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Dust mask to filter contaminated air</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Fire extinguisher</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Matches in a waterproof container</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-4">
                  <h4 className="font-medium text-blue-800 mb-2">Kit Maintenance</h4>
                  <p className="text-blue-700">
                    Check your kit every six months. Replace expired items and update your kit as your family's needs
                    change. Store items in airtight plastic bags and put your entire kit in one or two easy-to-carry
                    containers.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="car">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Car Emergency Kit
                </h3>
                <p>Keep these items in your vehicle in case you're stranded or need to evacuate quickly:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-medium mb-2">Basic Supplies</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Bottled water and non-perishable snacks</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Flashlight with extra batteries</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>First aid kit</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Cell phone charger</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Maps of your area</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Car-Specific Items</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Jumper cables</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Tire pressure gauge and tire inflator</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Flares or reflective warning triangles</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Ice scraper (in winter climates)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Small fire extinguisher (ABC type)</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Seasonal Items</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Blanket or sleeping bag</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Extra clothes, hat, and gloves</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Rain poncho</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Sunscreen</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Insect repellent</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Additional Items</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Small shovel</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Tow rope</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Cat litter or sand for traction</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Duct tape</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Paper towels</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {isSnow && (
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-4">
                    <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                      <CloudSnow className="h-4 w-4 mr-2" />
                      Winter Weather Car Kit Additions
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                        <span>Extra blankets or sleeping bag</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                        <span>Hand warmers</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                        <span>Snow brush and ice scraper</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                        <span>Shovel</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                        <span>Tire chains or traction mats</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="specialized">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Weather-Specific Supplies</h3>
                <p>Add these items to your emergency kit based on the weather conditions in your area:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {(isRain || isThunderstorm) && (
                    <div className="border rounded-md p-4 bg-blue-50 border-blue-200">
                      <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                        <CloudRain className="h-5 w-5 mr-2" />
                        Rain & Flood Supplies
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                          <span>Rain gear (ponchos, umbrellas)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                          <span>Waterproof boots</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                          <span>Plastic sheeting and sandbags</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                          <span>Moisture-absorbing packets for electronics</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                          <span>Waterproof container for documents</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                          <span>Water purification tablets</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {isThunderstorm && (
                    <div className="border rounded-md p-4 bg-purple-50 border-purple-200">
                      <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                        <CloudRain className="h-5 w-5 mr-2" />
                        Thunderstorm & Lightning Supplies
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-purple-500 mt-0.5" />
                          <span>Battery-powered weather radio</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-purple-500 mt-0.5" />
                          <span>Surge protectors</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-purple-500 mt-0.5" />
                          <span>Lightning detector (if in high-risk area)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-purple-500 mt-0.5" />
                          <span>Extra flashlights and batteries</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-purple-500 mt-0.5" />
                          <span>First aid kit with burn treatment</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {isSnow && (
                    <div className="border rounded-md p-4 bg-slate-50 border-slate-200">
                      <h4 className="font-medium text-slate-800 mb-2 flex items-center">
                        <CloudSnow className="h-5 w-5 mr-2" />
                        Snow & Winter Supplies
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-slate-500 mt-0.5" />
                          <span>Extra blankets and sleeping bags</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-slate-500 mt-0.5" />
                          <span>Warm clothing, hats, gloves, and boots</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-slate-500 mt-0.5" />
                          <span>Hand and foot warmers</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-slate-500 mt-0.5" />
                          <span>Snow shovel and ice scraper</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-slate-500 mt-0.5" />
                          <span>Rock salt or ice melt</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-slate-500 mt-0.5" />
                          <span>Alternative heating source</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {isExtremeHeat && (
                    <div className="border rounded-md p-4 bg-orange-50 border-orange-200">
                      <h4 className="font-medium text-orange-800 mb-2 flex items-center">
                        <Thermometer className="h-5 w-5 mr-2" />
                        Extreme Heat Supplies
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-orange-500 mt-0.5" />
                          <span>Extra water (more than usual)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-orange-500 mt-0.5" />
                          <span>Electrolyte replacement drinks</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-orange-500 mt-0.5" />
                          <span>Battery-powered fans</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-orange-500 mt-0.5" />
                          <span>Spray bottles for cooling</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-orange-500 mt-0.5" />
                          <span>Sunscreen and sun protection</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-orange-500 mt-0.5" />
                          <span>Lightweight, light-colored clothing</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {isExtremeCold && (
                    <div className="border rounded-md p-4 bg-cyan-50 border-cyan-200">
                      <h4 className="font-medium text-cyan-800 mb-2 flex items-center">
                        <Thermometer className="h-5 w-5 mr-2" />
                        Extreme Cold Supplies
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-cyan-500 mt-0.5" />
                          <span>Extra blankets and sleeping bags</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-cyan-500 mt-0.5" />
                          <span>Thermal underwear and wool socks</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-cyan-500 mt-0.5" />
                          <span>Hand and foot warmers</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-cyan-500 mt-0.5" />
                          <span>Alternative heating source</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-cyan-500 mt-0.5" />
                          <span>Matches and fire starters</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-cyan-500 mt-0.5" />
                          <span>Thermos for hot liquids</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  <div className="border rounded-md p-4 bg-emerald-50 border-emerald-200">
                    <h4 className="font-medium text-emerald-800 mb-2 flex items-center">
                      <Droplets className="h-5 w-5 mr-2" />
                      Water Safety Supplies
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500 mt-0.5" />
                        <span>Water purification tablets or filter</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500 mt-0.5" />
                        <span>Containers for water collection</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500 mt-0.5" />
                        <span>Bleach (unscented) for disinfecting</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500 mt-0.5" />
                        <span>Eyedropper for adding bleach to water</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500 mt-0.5" />
                        <span>Instructions for water purification</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Important Documents</h3>
                <p>Keep these documents in a waterproof, portable container as part of your emergency kit:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-medium mb-2">Personal Identification</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Driver's licenses or state IDs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Birth certificates</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Social Security cards</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Passports</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Immigration documents</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Financial Information</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Insurance policies (home, auto, life)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Property deeds and mortgage documents</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Vehicle registration and titles</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Bank account information</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Credit card information</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Medical Information</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Health insurance cards and information</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Immunization records</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>List of medications and prescriptions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Medical conditions and allergies</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Doctor and pharmacy contact information</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Other Important Documents</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Emergency contact information</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Marriage certificates</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Wills and estate documents</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Pet vaccination records</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span>Photos of valuable belongings</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mt-4">
                  <h4 className="font-medium text-amber-800 mb-2">Document Storage Tips</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                      <span>Store physical copies in a waterproof, fireproof container</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                      <span>Create digital copies on a password-protected flash drive</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                      <span>Consider secure cloud storage as an additional backup</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                      <span>Update documents regularly as information changes</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                      <span>Share the location of these documents with trusted family members</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

