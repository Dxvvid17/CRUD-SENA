// Este archivo es para validar que los datos que se envien a la ruta
// esten de acuerdo con los datos que se esperan, es decir, que el usuario
// este enviando datos correctos.


export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        
        return res.status(400).json(error.errors.map(error => error.message));  
    }
}