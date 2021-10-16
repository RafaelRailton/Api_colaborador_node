const jwt = require('jsonwebtoken')
const Collaborator = require('../models/Collaborator')
const bcrypt = require("bcrypt")
const secret = require('../middleware/secret')
const { Validator } = require('node-input-validator')
class LoginController{
    async login(req, res){
        let {cpf,password} = req.body
        const v = new Validator(req.body, {
            cpf: 'required|maxLength:50',
            password: 'required|maxLength:10'
        })
        const matched = await v.check();
        if (!matched) {
            res.status(422)
            res.json(v.errors)
            return
        }
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
