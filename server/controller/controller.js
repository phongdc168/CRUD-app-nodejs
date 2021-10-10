var accountDB = require('../model/model');

// create and save new account
exports.create = (req, res) => {
    // validate request
    if(!req.body){
        return res.status(400).send({message: "Content can not be empty"});
    }
    // new account
    const accounts = new accountDB({
        account: req.body.account,
        password: req.body.password,
        type: req.body.type,
        status: req.body.status,
    });
    // save account in the database
    return accounts
    .save(accounts)
    .then(data => {
        res.redirect('/add-account');
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "some error occurred while Add an account",
        });
    });
}

// retrieve and return all accounts/ single account
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        accountDB.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found account with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving account with id " + id})
            })

    }
    else{
        accountDB.find()
            .then(accounts => {
                res.send(accounts)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving account information" })
            })
    }
}

// update new account with id account
exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({message: "Data to update can not be empty"});
    }
    
    const id = req.params.id;
    accountDB.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).send({message:`Cannot update account with ${id}. Maybe account not found`});
        }
        else{
            res.send(data);
        }
    })
    .catch(err => {
        res.status(500).send({message: "Error update account information"});
    })
}

// delete a account with id account
exports.delete = (req, res) => {
    const id = req.params.id;

    accountDB.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Account was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete account with id=" + id
            });
        });
    }
