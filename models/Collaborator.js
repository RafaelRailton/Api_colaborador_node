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
}
module.exports = new CollaboratorModels();

