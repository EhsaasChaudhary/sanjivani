import Image from 'next/image'

export default function Component() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center">
      {/* Background Image */}
      <Image
        src="/Designer (6).jpeg"
        alt="Hospital management background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority={false}
        loading="lazy"
      />
      
      {/* Overlay for better readability */}
      <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto md:ml-0 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            Welcome to Sanjivani
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white">
            Discover <span className="font-bold">healthcare services</span> tailored just for you. Our platform offers <span className="font-bold">advanced management capabilities</span>.
          </p>
          {/* <a href="/appointments" className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600">
            Make an Appointment
          </a> */}
        </div>
      </div>
    </div>
  )
}
