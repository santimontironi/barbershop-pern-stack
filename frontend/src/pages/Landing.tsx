import Home from "../components/landing/sections/Home"
import Header from "../components/layout/Header"
import ServicesSection from "../components/landing/sections/ServicesSection"
import ScheduleSection from "../components/landing/sections/ScheduleSection"
import ContactSection from "../components/landing/sections/ContactSection"

const Landing = () => {
  return (
    <>
        <Header />
        <section id="inicio">
            <Home />
        </section>
        <section id="servicios">
            <ServicesSection />
        </section>
        <section id="horarios">
            <ScheduleSection />
        </section>
        <section id="contacto">
            <ContactSection />
        </section>
    </>
  )
}

export default Landing