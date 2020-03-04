const usersController = require('../controllers/usersController');
const dictionaryController = require('../controllers/dictionaryController');
const testResultController = require('../controllers/testResultController');

module.exports = (app) => {

    app.post('/api/user/register/:login/:password', usersController.userRegister);

    app.post('/api/user/auth/:login/:password', usersController.userAuth);

    app.post('/api/user/changepassword/:userid/:password/:newpassword', usersController.changePassword);

    app.post('/api/user/changeusername/:userid/:password/:newusername', usersController.changeUsername);

    app.post('/api/user/usernameisexist/:username', usersController.usernameIsExist);

    app.post('/api/dictionary/create/:name/:owner/:login', dictionaryController.dictionaryCreate);

    app.post('/api/dictionary/get/:owner', dictionaryController.getDictionaries);

    app.post('/api/dictionary/getone/:id', dictionaryController.getOneDictionary);

    app.post('/api/dictionary/edit/:id/:newvocabulary/:userid/:login', dictionaryController.editDictionary);

    app.post('/api/dictionary/delete/:id/:userid/:login', dictionaryController.deleteDictionary);

    app.post('/api/result/add/:dictionaryid/:correct/:incorrect', testResultController.saveTestResult);
}