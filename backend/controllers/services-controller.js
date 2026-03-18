import serviceRepository from "../repository/services-repository.js";

class ServicesController {
    createService = async (req, res) => {
        try{
            const { name, description, duration, price } = req.body;

            if (!name || !description || !duration || !price) {
                return res.status(400).json({ message: "Todos los campos son obligatorios." });
            }

            const newService = await serviceRepository.createService(name, description, duration, price);

            return res.status(201).json({ service: newService });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    getAllServices = async (req, res) => {
        try {
            const services = await serviceRepository.getAllServices();

            if (!services) {
                return res.status(404).json({ message: "No se encontraron servicios." });
            }

            return res.status(200).json({ services: services });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

const servicesController = new ServicesController();
export default servicesController;