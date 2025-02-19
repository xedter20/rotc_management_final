import { Shield, Award, Users } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: "Leadership Training",
      description: "Develop crucial leadership skills that apply in military and civilian settings",
    },
    {
      icon: Award,
      title: "Scholarship Opportunities",
      description: "Access to exclusive scholarships and financial aid programs",
    },
    {
      icon: Users,
      title: "Camaraderie",
      description: "Build lifelong friendships and a strong network of peers and mentors",
    },
  ]

  return (
    <section className="py-20 bg-gunmetal">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-steel">Why Choose ROTC?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-charcoal p-6 rounded-lg text-center">
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-olive" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-desert">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

