const Clarifai =require('clarifai');
const { response } = require('express');
const app = new Clarifai.App({
    apiKey: "e77030b509d54438a1da9f18dea5391a"
   });

   const handleApiCall = (req, res) => {
    app.models.predict("e466caa0619f444ab97497640cefc4dc", req.body.input)
    .then(data =>{
        res.json(data);
    })
    .catch(err => res.status(400).json("problemas con la api"))
}
const handleImage = (req, res, db)=>{
    const { id } = req.body;
    db('users').where('id','=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json("algo fallo"))
}
module.exports = {
    handleImage,
    handleApiCall
}