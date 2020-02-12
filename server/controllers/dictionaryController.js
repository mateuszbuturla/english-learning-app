const dictionaryModel = require('../models/dictionaryModel');
const userModel = require('../models/userModel');
const mongoose = require('mongoose');

exports.dictionaryCreate = async (req, res) => {
    const { name, owner } = req.params;
    try {
        if (name.length && owner) {
            dictionaryModel.create({ _id: mongoose.Types.ObjectId(), name: name, owner: owner, vocabulary: [] }, (err) => {
                if (err)
                    return console.log(err)

                res.status(200).json({ status: 'correct' });
            })
        }
        else {
            res.status(200).json({ status: 'incorrect' });
        }
    }
    catch {
        res.status(500).json({ message: 'error' });
    }
}

exports.getDictionaries = async (req, res) => {
    const { owner } = req.params;
    try {
        if (owner) {
            const findDictionaries = await dictionaryModel.find({ owner: owner });
            const findUser = await userModel.find({ _id: owner });
            res.status(200).json({ status: 'correct', dictionaries: findDictionaries, userName: findUser[0].login });
        }
        else {
            res.status(200).json({ status: 'incorrect' });
        }
    }
    catch {
        res.status(500).json({ message: 'error' });
    }
}