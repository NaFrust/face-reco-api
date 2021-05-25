
const handleSignin = (req, res, db, bcrypt) => {
    const {mail, password} = req.body;
    if( !mail || ! password){
        return res.status(400).json('incorrecto')
    }
    db.select('email','hash').from('login')
    .where('email', '=', mail)
    .then(data => {
        const esValido = bcrypt.compareSync(password, data[0].hash)
        if(esValido){
          return db.select('*').from('users').where('email','=',mail)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json("algo fallo con el usuario"))
            
        }else{
            res.status(400).json("credenciales equivocadas")
        }
    }).catch(err => res.status(400).json("credenciales equivocadas"))
}
module.exports = {
    handleSignin
}