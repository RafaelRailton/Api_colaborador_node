const { Validator } = require('node-input-validator')
const Collaborator = require('../models/Collaborator')
const bcrypt = require('bcrypt')

class CollaboratorController {
async index(){
    let result = await Collaborator.findAll();
    if(result.length > 0){
        res.status(200)
        res.json({'data':result})
    }else{
        res.status(404)
        res.json({error:'Nenhum dado encontrado!'})
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
       let validCpf = await Collaborator.findbyCpf(cpf)
       
       if(validCpf.length > 0){
        res.status(400);
        res.json({error:'Cpf já se encontra cadastrado!'})
        return
       }
       let hash = await bcrypt.hash(password.toString(),10) 
       let result =  await Collaborator.insert(name,cpf,sector,hash)
       if(result){
           res.status(200)
           res.json({msg:'Cadastrado com sucesso!'})
       }else{
           res.status(400)
           res.json({error:`Error ${result}`})
       }
}
async update(req, res){
    let id = parseInt(req.params.id);
    
    if(!Number.isInteger(id) || id <= 0 ){
        res.status(400)
        res.json({error:`Error parametro ${id} invalido!`})
        return
    }
    let validColaborator = await Collaborator.findbyid(id)
    if(validColaborator.length === 0){
        res.status(404)
        res.json({error:`Usuário ${id} não encontrado!`})
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
       
        let validCpf = await Collaborator.findbyCpf(cpf)  
        if(validCpf.length > 0){
            if(validCpf[0].cpf === validColaborator[0].cpf){
                let result = await Collaborator.update(id,name,cpf,sector);
            if(result){
            res.status(200)
            res.json({msg:`Dados do ${name} atualizado com sucesso!`})
                return
            }else{
            res.status(400)
            res.json({error:`Error ${result} não atualizou!`})
                return
            }
            }else{
                res.status(400);
                res.json({error:'Cpf já se encontra cadastrado!'})
                return
            }
        }
        let result = await Collaborator.update(id,name,cpf,sector);
        if(result){
            res.status(200)
            res.json({msg:`Dados do ${name} atualizado com sucesso!`})
        }else{
            res.status(400)
            res.json({error:`Error ${result} não atualizou!`})
            return
        }
}
async delete(req, res){
    let id = parseInt(req.params.id);
    
    if(!Number.isInteger(id) || id <= 0 ){
        res.status(400)
        res.json({error:`Error parametro ${id} invalido!`})
        return
    }
    let validColaborator = await Collaborator.findbyid(id)
    if(validColaborator.length === 0){
        res.status(404)
        res.json({error:`Usuário ${id} não encontrado!`})
        return
    }
    let result = await Collaborator.delete(id);
    if(result){
        res.status(200)
        res.json({msg:`Apagado com sucesso!`})
    }else{
        res.status(400)
        res.json({error:`Error ${result} não apagou!`})
        return
    }
}
}

module.exports = new CollaboratorController()