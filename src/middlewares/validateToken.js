                                                        // Este archivo es el código para la validación de que el token 
                                                        // este efectivamente activo. Con eso podemos lograr dar protección a
                                                        // rutas que queramos, es decir, si queremos que solo se pueda acceder a
                                                        // una ruta siempre y cuando el usuario este logeado, con esto lo podemos hacer,
                                                        // ya que cuando el usuario deje de estar logeado no podrá acceder a la ruta.*/

                                                        

import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
    
    const { token }= req.cookies;
    
    if (!token) return res.status(401).json ({ message: "No token, authorization denied" });
    
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json ({ message: "Invalid token"});

        req.user = user; 
        
        next();
    })

}
    