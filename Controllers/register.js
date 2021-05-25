

const handleRegister = (req,res,db, bcrypt) => {
    const {nombre, mail, password} = req.body;
    if(!nombre || !mail || ! password){
        return res.status(400).json('incorrecto')
    }
    const hash = bcrypt.hashSync(password)
    db.transaction(trx =>{
        trx.insert({
            hash: hash,
            email: mail
        }).into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                nombre: nombre,
                joined: new Date()
            }).then(user => {
                res.json(user[0])
        })
    }).then(trx.commit)
    .catch(trx.rollback)
   
    })
    .catch(err=> res.status(400).json("Mail o usuario ya en uso"))
     
}

module.exports = {
    handleRegister
}