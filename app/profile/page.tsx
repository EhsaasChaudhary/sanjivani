import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ClipboardIcon, HeartPulseIcon, PhoneIcon, PillIcon, UserIcon } from "lucide-react"

export default function PatientProfilePage() {
  // In a real application, you would fetch this data from your backend
  const patientData = {
    name: "Jane Doe",
    id: "PT12345",
    age: 35,
    gender: "Female",
    bloodType: "A+",
    nextAppointment: "2023-10-15",
    contactNumber: "+1 (555) 123-4567",
    email: "jane.doe@example.com",
    address: "123 Main St, Anytown, AN 12345",
    emergencyContact: "John Doe (Husband) - +1 (555) 987-6543",
    medicalHistory: ["Hypertension", "Asthma"],
    allergies: ["Penicillin", "Peanuts"],
    medications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
      { name: "Albuterol", dosage: "90mcg", frequency: "As needed" },
    ],
    vitalSigns: {
      bloodPressure: "120/80 mmHg",
      heartRate: "72 bpm",
      temperature: "98.6°F",
      oxygenSaturation: "98%",
    },
    labResults: [
      { test: "Complete Blood Count", date: "2023-09-01", status: "Normal" },
      { test: "Lipid Panel", date: "2023-09-01", status: "Abnormal" },
      { test: "Thyroid Function", date: "2023-08-15", status: "Pending" },
    ],
    upcomingAppointments: [
      { date: "2023-10-15", time: "10:00 AM", doctor: "Dr. Smith", department: "Cardiology" },
      { date: "2023-11-02", time: "2:30 PM", doctor: "Dr. Johnson", department: "Pulmonology" },
    ],
  }

  return (
    <div className="container pt-24 mx-auto p-4 space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-4 border-b">
        <div className="flex items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt={patientData.name} />
            <AvatarFallback>{patientData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{patientData.name}</h1>
            <p className="text-muted-foreground">Patient ID: {patientData.id}</p>
          </div>
        </div>
        <Button>Edit Profile</Button>
      </header>

      <main>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medical-history">Medical History</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <UserIcon className="text-muted-foreground" />
                  <span>Age: {patientData.age}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserIcon className="text-muted-foreground" />
                  <span>Gender: {patientData.gender}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartPulseIcon className="text-muted-foreground" />
                  <span>Blood Type: {patientData.bloodType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="text-muted-foreground" />
                  <span>{patientData.contactNumber}</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <CalendarIcon className="text-muted-foreground" />
                  <span>Next Appointment: {patientData.nextAppointment}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Vital Signs</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {Object.entries(patientData.vitalSigns).map(([key, value]) => (
                  <div key={key} className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-lg font-semibold">{value}</span>
                    <Progress value={Math.random() * 100} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="medical-history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Medical Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {patientData.medicalHistory.map((condition, index) => (
                    <Badge key={index} variant="secondary">{condition}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Allergies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {patientData.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive">{allergy}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Lab Results</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {patientData.labResults.map((result, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{result.test}</span>
                      <span>{result.date}</span>
                      <Badge variant={result.status === 'Normal' ? 'secondary' : result.status === 'Abnormal' ? 'destructive' : 'outline'}>
                        {result.status}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="medications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {patientData.medications.map((medication, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <PillIcon className="mt-1 text-muted-foreground" />
                      <div>
                        <h3 className="font-semibold">{medication.name}</h3>
                        <p className="text-sm text-muted-foreground">Dosage: {medication.dosage}</p>
                        <p className="text-sm text-muted-foreground">Frequency: {medication.frequency}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {patientData.upcomingAppointments.map((appointment, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{appointment.date} at {appointment.time}</p>
                        <p className="text-sm text-muted-foreground">{appointment.doctor} - {appointment.department}</p>
                      </div>
                      <Button variant="outline" size="sm">Reschedule</Button>
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