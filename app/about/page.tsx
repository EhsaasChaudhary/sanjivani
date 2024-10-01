import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin } from "lucide-react"
import Link from "next/link"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      {/* Website Info Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">About Our Website</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Description</h3>
              <p>Our website is a cutting-edge platform designed to showcase innovative web development techniques and provide valuable resources for developers.</p>
            </div>
            <div>
              <h3 className="font-semibold">Tech Stack</h3>
              <ul className="list-disc list-inside">
                <li>Next.js</li>
                <li>React</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Shadcn UI</li>
                <li>Aceternity UI</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Purpose</h3>
              <p>Our goal is to demonstrate best practices in web development, provide a learning platform for aspiring developers, and showcase the capabilities of modern web technologies.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Developer Info Section */}
      <h2 className="text-2xl font-bold mb-4">Our Developers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Developer 1 */}
        <Card>
          <CardHeader>
            <CardTitle>Soham Sagathiya</CardTitle>
            <CardDescription>Full Stack Developer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Experienced developer with a passion for creating elegant and efficient web solutions using full stack technologies and AWS.</p>
              <p>University: Darshan University</p>
              <div className="flex space-x-2">
                <Link href="https://github.com/soham901" className="text-gray-600 hover:text-gray-900">
                  <Github className="h-6 w-6" />
                </Link>
                <Link href="https://www.linkedin.com/in/soham-sagathiya" className="text-gray-600 hover:text-gray-900">
                  <Linkedin className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Developer 2 */}
        <Card>
          <CardHeader>
            <CardTitle>Ehsaas Chaudhary</CardTitle>
            <CardDescription>Frontend Specialist</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>UI/UX enthusiast with a keen eye for design and a knack for creating intuitive user interfaces.</p>
              <p>University: Darshan University</p>
              <div className="flex space-x-2">
                <Link href="https://github.com/EhsaasChaudhary" className="text-gray-600 hover:text-gray-900">
                  <Github className="h-6 w-6" />
                </Link>
                <Link href="linkedin.com/in/Ehsaas-Chaudhary" className="text-gray-600 hover:text-gray-900">
                  <Linkedin className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}