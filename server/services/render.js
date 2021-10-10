const axios = require('axios');

exports.home = (req, res) => {
   
    // Make a get request to /api/accounts
    axios.get('http://localhost:3000/api/accounts')
        .then(function(response){
            res.render('index', {accounts : response.data});
        })
        .catch(err =>{
            res.send(err);
        })   
}
exports.addAccount = (req, res) => {
    res.render('add_account');
}
exports.updateAccount = (req, res) => {
    axios.get('http://localhost:3000/api/accounts', {params:{id:req.query.id}})
    .then(function(accountData){
        res.render("update_account", {accounts: accountData.data});
    })
    .catch(err => {
        res.send(err);
    })
}