import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactSection() {
  return (
    <section className="bg-[#F9E4CB] py-12 ">
      <div className=" container mx-auto !px-10">
        <h2 className="text-2xl sm:text-[32px] font-medium text-[#000000] mb-8 text-center lg:text-left">
          Other Ways to Reach Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {/* Email */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center mb-3">
              <Mail className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-800">Email</h3>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">seoulmirrage@gmail.com</p>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center mb-3">
              <Phone className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-800">Phone</h3>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">+82 2 123 4567</p>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center mb-3">
              <MapPin className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-800">Address</h3>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">123 Beauty Lane, Gangnam, Seoul, South Korea</p>
          </div>
        </div>
      </div>
    </section>
  )
}
