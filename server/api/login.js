//const config = require('../config.js')

function generateRandomString(iLen) {
    var sRnd = '';
    var sChrs = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    for (var i = 0; i < iLen; i++) {
        var randomPoz = Math.floor(Math.random() * sChrs.length);
        sRnd += sChrs.substring(randomPoz, randomPoz + 1);
    }
    return sRnd;
}

module.exports = function (app, db) {

    // Create a new login
    app.post('/api/login', async (req, res) => {

        const out = await db.collection('user')
            .findOne({ 'email': req.body.email, 'password': req.body.password })
        
        if (out) {

            let token = generateRandomString(10);
            let name = `${out.name} ${out.surname}`;
            let email = out.email;
            let id= out._id;
            let role= out.role;
            res.send({data: {token, name, email, id, role}, error: null})
            
        }

        else res.send({ data: null, error: 'User not found' });

    });

}
