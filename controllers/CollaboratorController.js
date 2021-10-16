const { Validator } = require('node-input-validator')
const CollaboratorModels = require('../models/Collaborator')
const bcrypt = require('bcrypt')
class CollaboratorController {
async create(req,res) {
    let {name,cpf,sector,password} = req.body;
        const v = new Validator(req.body, {
          name: 'required|maxLength:250',
          cpf:'required|maxLength:50',
          sector: 'required|integer|min:1',
          password:'required|maxLength:10'
        })
        const matched = await v.check();
        if (!matched) {
            res.status(422)
            res.json(v.errors)
            return;
        }
       let validCpf = await CollaboratorModels.findbyCpf(cpf)
       
       if(validCpf.length > 0){
        res.status(400);
        res.json({'msg':'Cpf já se encontra cadastrado!'})
        return;
       }
       let hash = await bcrypt.hash(password.toString(),10) 
       let result =  await CollaboratorModels.insert(name,cpf,sector,hash)
       if(result){
           res.status(200)
           res.json({'msg':'Cadastrado com sucesso!'})
       }else{
           res.status(400)
           res.json({'msg':`Error ${result}`})
       }
}
}

module.exports = new CollaboratorController()