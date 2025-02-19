import Header from "./components/Header"
import Hero from "./components/Hero"
import Mission from "./components/Mission"
import Benefits from "./components/Benefits"
import SuccessStories from "./components/SuccessStories"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Mission />
        <Benefits />
        <SuccessStories />
      </main>
      <Footer />
    </div>
  )
}

