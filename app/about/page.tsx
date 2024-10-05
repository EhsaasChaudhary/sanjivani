import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      {/* Website Info Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            About Our Website
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Description</h3>
              <p>
                Our platform is designed to empower healthcare professionals by
                simplifying hospital resource management through cutting-edge
                web development solutions. We provide intuitive tools and
                valuable resources to enhance operational efficiency and improve
                patient care.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Tech Stack</h3>
              <ul className="list-disc list-inside">
                <li>
                  Backend: FastAPI (Python), running background jobs for
                  resource allocation
                </li>
                <li>
                  Frontend: Next.js (React-based framework) for the admin
                  dashboard and visualization
                </li>
                <li>
                  Database: PostgreSQL for storing hospital and resource data
                </li>
                <li>
                  API Testing: Postman for collaborating and testing APIs,
                  OpenAPI (Swagger UI)
                </li>
                <li>
                  Reverse Proxy: Caddy, managing HTTPS and serving the app
                </li>
                <li>
                  Distance Calculation: Geopy library for calculating distances
                  between hospitals
                </li>
                <li>
                  ORM: SQLModel, simplifying database queries and operations
                </li>
                <li>
                  CI/CD: GitHub Actions for continuous integration and
                  deployment
                </li>
                <li>Hosting: AWS EC2 for cloud infrastructure</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Purpose</h3>
              <p>
                Our goal is to alleviate the stressful task of resource
                management in high-pressure environments like hospital emergency
                units. We enable healthcare workers to focus on what truly
                matters—saving patients lives. Our platform is designed to
                operate efficiently under the demanding conditions of an
                emergency unit, ensuring that critical resources are available
                when needed, helping to improve patient outcomes and reduce
                operational bottlenecks.
              </p>
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
              <p>
                Experienced developer with a passion for creating elegant and
                efficient web solutions using full stack technologies and AWS.
              </p>
              <p>University: Darshan University</p>
              <div className="flex space-x-2">
                <Link
                  href="https://github.com/soham901"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Github className="h-6 w-6" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/soham-sagathiya"
                  className="text-gray-600 hover:text-gray-900"
                >
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
              <p>
                UI/UX enthusiast with a keen eye for design and a knack for
                creating intuitive user interfaces.
              </p>
              <p>University: Darshan University</p>
              <div className="flex space-x-2">
                <Link
                  href="https://github.com/EhsaasChaudhary"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Github className="h-6 w-6" />
                </Link>
                <Link
                  href="linkedin.com/in/Ehsaas-Chaudhary"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Linkedin className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Developer 3 */}
        <Card>
          <CardHeader>
            <CardTitle>Om Dabhi</CardTitle>
            <CardDescription>Fronted Developer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                Experienced developer with a passion for creating elegant and user friendly User interface
              </p>
              <p>University: Darshan University</p>
              <div className="flex space-x-2">
                <Link
                  href="https://github.com/om-dabhi"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Github className="h-6 w-6" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/om-dabhi/"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Linkedin className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Developer 1 */}
        <Card>
          <CardHeader>
            <CardTitle>Soham Jobanputra</CardTitle>
            <CardDescription>Backend Developer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                Experienced developer with a passion for creating elegant and
                efficient backend.
              </p>
              <p>University: Darshan University</p>
              <div className="flex space-x-2">
                <Link
                  href="https://github.com/Soham7777777"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Github className="h-6 w-6" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/soham-jobanputra-3386a6239/"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Linkedin className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
