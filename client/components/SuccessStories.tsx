import Image from "next/image"

export default function SuccessStories() {
  return (
    <section className="py-20 bg-desert">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gunmetal">
          CBSUA-Sipocot ROTC Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-coyote p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Image
                src="https://cdn-icons-png.freepik.com/512/18028/18028934.png?ga=GA1.1.1710848127.1724072387"
                alt="Cadet Juan dela Cruz"
                width={64}
                height={64}
                className="rounded-full mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold text-desert">Cadet Juan dela Cruz</h3>
                <p className="text-fde">Class of 2022</p>
              </div>
            </div>
            <p className="text-desert">
              "The CBSUA-Sipocot ROTC program has been transformative. It's given me leadership skills, discipline, and
              a clear career path. I'm proud to serve my country while pursuing my degree at CBSUA."
            </p>
          </div>
          <div className="bg-coyote p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Image src="https://cdn-icons-png.freepik.com/512/18028/18028934.png?ga=GA1.1.1710848127.1724072387" alt="Cadet Maria Santos" width={64} height={64} className="rounded-full mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-desert">Cadet Maria Santos</h3>
                <p className="text-fde">Class of 2023</p>
              </div>
            </div>
            <p className="text-desert">
              "CBSUA-Sipocot ROTC has opened doors I never thought possible. The scholarship has eased my financial
              burden, and the leadership experiences have been invaluable for my personal and professional growth."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

