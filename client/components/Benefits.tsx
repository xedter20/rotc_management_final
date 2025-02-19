import { Shield, Award, Users, BookOpen } from "lucide-react"

export default function Benefits() {
  const benefits = [
    {
      icon: Shield,
      title: "Leadership Training",
      description: "Develop crucial leadership skills through CBSUA-Sipocot's rigorous ROTC program",
    },
    {
      icon: Award,
      title: "Scholarship Opportunities",
      description: "Access exclusive CBSUA scholarships and financial aid programs for ROTC cadets",
    },
    {
      icon: Users,
      title: "Camaraderie",
      description: "Build lifelong friendships within the CBSUA-Sipocot ROTC community",
    },
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description: "Balance military training with CBSUA's rigorous academic curriculum",
    },
  ]

  return (
    <section className="py-20 bg-gunmetal text-desert">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-olive">Why Choose CBSUA-Sipocot ROTC?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-charcoal p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
            >
              <benefit.icon className="w-16 h-16 mx-auto mb-4 text-olive" />
              <h3 className="text-xl font-semibold mb-2 text-steel">{benefit.title}</h3>
              <p className="text-fde">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

