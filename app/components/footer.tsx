import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
} from '@tabler/icons-react';

export default function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-800 py-8 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 md:space-x-10">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-semibold">Sanjivani</h2>
            <p className="text-sm">© {new Date().getFullYear()} All Rights Reserved</p>
          </div>

          {/* Social Media Icons */}
          <div>
            <h3 className="font-medium">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <IconBrandFacebook className="w-6 h-6 text-gray-800" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <IconBrandTwitter className="w-6 h-6 text-gray-800" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <IconBrandInstagram className="w-6 h-6 text-gray-800" />
              </a>
            </div>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="font-medium">Subscribe to our newsletter</h3>
            <form className="flex space-x-2 mt-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 w-full bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
