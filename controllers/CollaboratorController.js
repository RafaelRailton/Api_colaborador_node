const { Validator } = require('node-input-validator')
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
    res.status = 422;
    res.json(v.errors)
    return;
  }
}
}

module.exports = new CollaboratorController()