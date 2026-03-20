import type { ServiceCardProps } from "../../types/services.types"

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div>
        <h2>{service.name}</h2>
        <p>{service.description}</p>
        <p>Duración: {service.duration} minutos</p>
        <p>Precio: ${service.price}</p>
    </div>
  )
}

export default ServiceCard