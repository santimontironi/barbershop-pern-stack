import serviceRepository from "../repository/services-repository.js";

class ServicesController {
    createService = async (req, res) => {
        try{
            const { name, description, duration, price } = req.body;

            if (!name || !description || !duration || !price) {
                return res.status(400).json({ message: "Todos los campos son obligatorios." });
            }

            if(isNaN(duration) || isNaN(price)) {
                return res.status(400).json({ message: "La duración y el precio deben ser números." });
            }

            if (duration <= 0 || price <= 0) {
                return res.status(400).json({ message: "La duración y el precio deben ser mayores a cero." });
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

    deleteService = async (req, res) => {
        try{
            const { id } = req.params;

            if(!id){
                return res.status(400).json({ message: "El ID del servicio es obligatorio." });
            }

            const deletedService = await serviceRepository.deleteService(id);

            if (!deletedService) {
                return res.status(404).json({ message: "Servicio no encontrado." });
            }

            return res.status(200).json({ message: "Servicio eliminado exitosamente.", service: deletedService });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

const servicesController = new ServicesController();
export default servicesController;