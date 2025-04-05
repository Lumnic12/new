import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Phone, AlertTriangle, Info, MapPin, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResourceLinksProps {
  location: string
}

export default function ResourceLinks({ location }: ResourceLinksProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Emergency Resources</CardTitle>
          <CardDescription>
            Important contacts and information sources for weather emergencies in {location} and surrounding areas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Emergency Contacts
              </h3>

              <div className="space-y-3">
                <div className="border rounded-md p-3">
                  <p className="font-medium">Emergency Services</p>
                  <p className="text-lg font-bold">911</p>
                  <p className="text-sm text-muted-foreground">For immediate life-threatening emergencies</p>
                </div>

                <div className="border rounded-md p-3">
                  <p className="font-medium">FEMA Disaster Assistance</p>
                  <p className="text-lg font-bold">1-800-621-3362</p>
                  <p className="text-sm text-muted-foreground">Apply for assistance after a disaster</p>
                  <Button variant="link" className="p-0 h-auto mt-1" asChild>
                    <a
                      href="https://www.fema.gov/assistance/individual"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      Visit website <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>

                <div className="border rounded-md p-3">
                  <p className="font-medium">National Weather Service</p>
                  <p className="text-lg font-bold">1-800-401-2630</p>
                  <p className="text-sm text-muted-foreground">Weather information and forecasts</p>
                  <Button variant="link" className="p-0 h-auto mt-1" asChild>
                    <a
                      href="https://www.weather.gov"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      Visit website <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>

                <div className="border rounded-md p-3">
                  <p className="font-medium">Poison Control Center</p>
                  <p className="text-lg font-bold">1-800-222-1222</p>
                  <p className="text-sm text-muted-foreground">For poison emergencies or questions</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Weather Alert Resources
              </h3>

              <div className="space-y-3">
                <div className="border rounded-md p-3">
                  <p className="font-medium">National Weather Service Alerts</p>
                  <p className="text-sm text-muted-foreground">Official weather warnings and advisories</p>
                  <Button variant="link" className="p-0 h-auto mt-1" asChild>
                    <a
                      href="https://www.weather.gov/alerts"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      Check alerts <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>

                <div className="border rounded-md p-3">
                  <p className="font-medium">FEMA App</p>
                  <p className="text-sm text-muted-foreground">
                    Receive real-time alerts from the National Weather Service
                  </p>
                  <div className="flex gap-2 mt-1">
                    <Button variant="link" className="p-0 h-auto" asChild>
                      <a
                        href="https://apps.apple.com/us/app/fema/id474807486"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        iOS <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                    <Button variant="link" className="p-0 h-auto" asChild>
                      <a
                        href="https://play.google.com/store/apps/details?id=gov.fema.mobile.android"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Android <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-3">
                  <p className="font-medium">Emergency Alert System (EAS)</p>
                  <p className="text-sm text-muted-foreground">Broadcasts on radio and TV during emergencies</p>
                  <Button variant="link" className="p-0 h-auto mt-1" asChild>
                    <a
                      href="https://www.fema.gov/emergency-managers/practitioners/integrated-public-alert-warning-system/public/emergency-alert-system"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      Learn more <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>

                <div className="border rounded-md p-3">
                  <p className="font-medium">Wireless Emergency Alerts (WEA)</p>
                  <p className="text-sm text-muted-foreground">Emergency messages sent to your mobile device</p>
                  <Button variant="link" className="p-0 h-auto mt-1" asChild>
                    <a
                      href="https://www.fema.gov/emergency-managers/practitioners/integrated-public-alert-warning-system/public/wireless-emergency-alerts"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      Learn more <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Educational Resources
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="border rounded-md p-3">
                <p className="font-medium flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  Weather Safety
                </p>
                <p className="text-sm text-muted-foreground">
                  Learn about different weather hazards and how to stay safe
                </p>
                <Button variant="link" className="p-0 h-auto mt-1" asChild>
                  <a
                    href="https://www.weather.gov/safety/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Learn more <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </div>

              <div className="border rounded-md p-3">
                <p className="font-medium flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  Emergency Preparedness
                </p>
                <p className="text-sm text-muted-foreground">Guides for preparing for various emergencies</p>
                <Button variant="link" className="p-0 h-auto mt-1" asChild>
                  <a
                    href="https://www.ready.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Learn more <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </div>

              <div className="border rounded-md p-3">
                <p className="font-medium flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  Red Cross Preparedness
                </p>
                <p className="text-sm text-muted-foreground">Resources and training for emergency situations</p>
                <Button variant="link" className="p-0 h-auto mt-1" asChild>
                  <a
                    href="https://www.redcross.org/get-help/how-to-prepare-for-emergencies.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Learn more <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Local Resources
            </h3>

            <div className="bg-gray-50 p-4 rounded-md border">
              <p className="text-center text-muted-foreground">
                Enter your specific location above to see customized local emergency resources for your area.
              </p>
              <div className="flex justify-center mt-3">
                <Button variant="outline" asChild>
                  <a
                    href="https://www.fema.gov/locations"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Find local FEMA resources <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

