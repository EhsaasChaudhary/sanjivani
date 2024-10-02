import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          {/* Company Info */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Sanjivani</h2>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} All Rights Reserved</p>
          </div>

          {/* Social Media Icons */}
          <div className="space-y-2">
            <h3 className="font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Subscribe */}
          <div className="space-y-2">
            <h3 className="font-semibold">Subscribe to our newsletter</h3>
            <form className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="max-w-[200px]"
              />
              <Button type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}