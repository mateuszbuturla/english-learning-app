const testResultModel = require('../models/testResultModel');
const mongoose = require('mongoose');

exports.saveTestResult = async (req, res) => {
    const { dictionaryid, correct, incorrect } = req.params;
    try {
        if (dictionaryid && correct && incorrect) {
            testResultModel.create({ _id: mongoose.Types.ObjectId(), dictionaryId: dictionaryid, correct: JSON.parse(correct), incorrect: JSON.parse(incorrect) }, (err) => {
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

exports.getLatelyTestResult = async (req, res) => {
    const { dictionaryid } = req.params;
    try {
        if (dictionaryid) {
            const findLatelyTestResult = await testResultModel.find({ dictionaryId: dictionaryid }).sort({ _id: -1 });
            if (findLatelyTestResult.length > 0)
                res.status(200).json({ status: 'correct', result: findLatelyTestResult[0] });
            else if (findLatelyTestResult.length === 0)
                res.status(200).json({ status: 'correct', result: null });
        }
        else {
            res.status(200).json({ status: 'incorrect' });
        }
    }
    catch {
        res.status(500).json({ message: 'error' });
    }
}