const knex = require('../database/connection')
class CollaboratorModels {
    async insert(name,cpf,sector,password){
        try {
            let result = knex('collaborator').insert({cpf,name,sector,role:2,password})
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async findbyCpf(cpf){
        try {
            let result = knex('collaborator').select('*').where({cpf})
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    } 
}
module.exports = new CollaboratorModels();

