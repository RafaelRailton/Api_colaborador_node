const jwt = require('jsonwebtoken')
const Collaborator = require('../models/Collaborator')
const bcrypt = require("bcrypt")
const secret = require('../middleware/secret')
class LoginController{
    async login(req, res){
        let {cpf,password} = req.body
        let result = await Collaborator.findbyCpf(cpf)
        if(result.length > 0){
            let loginValid = await bcrypt.compare(password.toString(),result[0].password);
            if(loginValid){
                let token = jwt.sign({cpf:result[0].cpf,role:result[0].role},secret,{expiresIn: '30m'});
                res.status(200);
                res.json({token:token});
            }else{
                res.status(401)
                res.json({error:'Login invalido'})
            }
        }else{
            res.status(404)
            res.json({error:'Usuário não cadastrado!'})
        }
    }
}
module.exports = new LoginController()
