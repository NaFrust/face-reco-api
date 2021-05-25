const handleProfile = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id}).then(user=>{
        if(user.lenght){
            res.json(user[0]);
        }else{
            res.status(400).json("no encontrado")
        }

    }).catch(err=> res.status(400).json("Error al encontrar usuario"))
    
}
module.exports = {
    handleProfile
}