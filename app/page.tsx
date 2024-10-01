import Image from 'next/image'

export default function Component() {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <Image
        src="/Designer (6).jpeg" // Reference image from public folder
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      
      {/* Content Container */}
      <div className="relative z-10 w-full px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto md:ml-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6">
            Welcome to Our Website
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600">
            Discover amazing content and services tailored just for you. Our platform offers a unique experience that you won't find anywhere else.
          </p>
        </div>
      </div>
    </div>
  )
}
