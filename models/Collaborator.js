const knex = require('../database/connection')
class CollaboratorModels {
    async findAll(){
        try {
            let result = knex('collaborator').select('*')
            return result
        } catch (error) {
            console.log(error)
            return [];
        }
    }
    async insert(name,cpf,sector,password){
        try {
            let result = knex('collaborator').insert({cpf,name,sector,role:2,password})
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    }
    async findbyEmail(){
        try {
            let result = knex('collaborator').select('*').where({email})
            return result
        } catch (error) {
            console.log(error)
            return []
        }
    }
    async findbyCpf(cpf){
        try {
            let result = knex('collaborator').select('*').where({cpf})
            return result
        } catch (error) {
            console.log(error)
            return []
        }
    }
    async findbyid(id){
        try {
            let result = knex('collaborator').select(['id','name','cpf','role']).where({id})
            return result
        } catch (error) {
            console.log(error)
            return []
        }
    }
    async update(id,name,cpf,sector){
        try {
            let result = knex('collaborator').update({name,cpf,sector}).where({id})
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async delete(id){
        try {
            let result = knex('collaborator').delete().where({id})
            return result
        } catch (error) {
            console.log(error)
            return false;
        }
    } 
}
module.exports = new CollaboratorModels();

