const { Validator } = require('node-input-validator')
const CollaboratorModels = require('../models/Collaborator')
const bcrypt = require('bcrypt')
class CollaboratorController {
async index(){
    let result = await CollaboratorModels.findAll();
    if(result.length > 0){
        res.status(200)
        res.json({'data':result})
    }else{
        res.status(404)
        res.json({'msg':'Nenhum dado encontrado!'})
    }
}
async create(req,res){
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
            return
        }
       let validCpf = await CollaboratorModels.findbyCpf(cpf)
       
       if(validCpf.length > 0){
        res.status(400);
        res.json({'msg':'Cpf já se encontra cadastrado!'})
        return
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
async update(req, res){
    let id = parseInt(req.params.id);
    
    if(!Number.isInteger(id) || id <= 0 ){
        res.status(400)
        res.json({'msg':`Error parametro ${id} invalido!`})
        return
    }
    let validColaborator = await CollaboratorModels.findbyid(id)
    if(validColaborator.length === 0){
        res.status(404)
        res.json({'msg':`Usuário ${id} não encontrado!`})
        return
    }
    let {name,cpf,sector} = req.body;
        const v = new Validator(req.body, {
          name: 'required|maxLength:250',
          cpf:'required|maxLength:50',
          sector: 'required|integer|min:1',
        })
        const matched = await v.check();
        if (!matched) {
            res.status(422)
            res.json(v.errors)
            return
        }
       
        let validCpf = await CollaboratorModels.findbyCpf(cpf)  
        if(validCpf.length > 0){
            if(validCpf[0].cpf === validColaborator[0].cpf){
                let result = await CollaboratorModels.update(id,name,cpf,sector);
            if(result){
            res.status(200)
            res.json({'msg':`Dados do ${name} atualizado com sucesso!`})
                return
            }else{
            res.status(400)
            res.json({'msg':`Error ${result} não atualizou!`})
                return
            }
            }else{
                res.status(400);
                res.json({'msg':'Cpf já se encontra cadastrado!'})
                return
            }
        }
        let result = await CollaboratorModels.update(id,name,cpf,sector);
        if(result){
            res.status(200)
            res.json({'msg':`Dados do ${name} atualizado com sucesso!`})
        }else{
            res.status(400)
            res.json({'msg':`Error ${result} não atualizou!`})
            return
        }
}
async delete(req, res){
    let id = parseInt(req.params.id);
    
    if(!Number.isInteger(id) || id <= 0 ){
        res.status(400)
        res.json({'msg':`Error parametro ${id} invalido!`})
        return
    }
    let validColaborator = await CollaboratorModels.findbyid(id)
    if(validColaborator.length === 0){
        res.status(404)
        res.json({'msg':`Usuário ${id} não encontrado!`})
        return
    }
    let result = await CollaboratorModels.delete(id);
    if(result){
        res.status(200)
        res.json({'msg':`Apagado com sucesso!`})
    }else{
        res.status(400)
        res.json({'msg':`Error ${result} não apagou!`})
        return
    }
}
}

module.exports = new CollaboratorController()