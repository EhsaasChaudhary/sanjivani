import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Phone, Mail, MapPin, Bed } from "lucide-react"

export default function HospitalProfilePage() {
  // In a real application, you would fetch this data from your backend
  const hospitalData = {
    name: "City General Hospital",
    id: "HOS12345",
    type: "General Hospital",
    beds: 500,
    occupancy: 75,
    address: "123 Medical Center Blvd, Metropolis, MP 12345",
    contactNumber: "+1 (555) 123-4567",
    email: "info@citygeneralhospital.com",
    website: "www.citygeneralhospital.com",
    emergencyServices: true,
    specialties: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics"],
    facilities: ["MRI", "CT Scan", "ICU", "Emergency Room", "Laboratory"],
    staffStats: {
      doctors: 150,
      nurses: 300,
      supportStaff: 200,
    },
    performanceMetrics: {
      patientSatisfaction: 85,
      averageLengthOfStay: 4.2,
      readmissionRate: 12,
      infectionRate: 2.1,
    },
    upcomingEvents: [
      { date: "2023-10-15", event: "Blood Donation Drive" },
      { date: "2023-11-02", event: "Community Health Seminar" },
    ],
  }

  return (
    <div className="container mx-auto mt-24 p-4 space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-4 border-b">
        <div className="flex items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt={hospitalData.name} />
            <AvatarFallback>{hospitalData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{hospitalData.name}</h1>
            <p className="text-muted-foreground">Hospital ID: {hospitalData.id}</p>
          </div>
        </div>
        <Button>Edit Profile</Button>
      </header>

      <main>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hospital Information</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Building2 className="text-muted-foreground" />
                  <span>Type: {hospitalData.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="text-muted-foreground" />
                  <span>Beds: {hospitalData.beds}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="text-muted-foreground" />
                  <span>{hospitalData.contactNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="text-muted-foreground" />
                  <span>{hospitalData.email}</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <MapPin className="text-muted-foreground" />
                  <span>{hospitalData.address}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {hospitalData.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">{specialty}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="facilities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {hospitalData.facilities.map((facility, index) => (
                    <Badge key={index} variant="outline">{facility}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Bed Occupancy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-semibold">{hospitalData.occupancy}%</span>
                  <Progress value={hospitalData.occupancy} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="staff" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Staff Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {Object.entries(hospitalData.staffStats).map(([role, count]) => (
                    <li key={role} className="flex items-center justify-between">
                      <span className="capitalize">{role.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {Object.entries(hospitalData.performanceMetrics).map(([metric, value]) => (
                  <div key={metric} className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-lg font-semibold">{value}</span>
                    <Progress value={value} max={metric === 'patientSatisfaction' ? 100 : 20} />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {hospitalData.upcomingEvents.map((event, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{event.date}</p>
                        <p className="text-sm text-muted-foreground">{event.event}</p>
                      </div>
                      <Button variant="outline" size="sm">Details</Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}