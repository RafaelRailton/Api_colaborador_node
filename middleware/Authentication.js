const secret = require('../middleware/secret')
const jwt = require('jsonwebtoken')
module.exports = function (req, res, next){
    const authToken = req.headers.authorization
    if(authToken != undefined){
        const bearer = authToken.split(' ')
        const token  = bearer[1]
        try {
            const decoded = jwt.verify(token,secret);
            //Se Auth Role for Administrador
            if(decoded.role === 1){
                next();
            }else{
                res.status(403);
                res.json({error:"Voce não Tem Permissão para Acessar esta rota!"});
                return;
            }
            
        } catch (error) {
            res.status(403);
            res.json({error:"Voce não está autenticado"});
            return;
        }
    }else{
        res.status(403);
        res.json({error:"Voce não está autenticado"});
        return;
    }

}