module.exports = function(app, db) {

    let ObjectId = require('mongodb').ObjectId;

    // Get all users
    app.get('/api/users/', async(req, res) => {

        const users = await db.collection('user').find().toArray();
        let error;

        if (!users.length) {
            error = 'No users found';
        }

        res.send({
            data: users,
            error
        });

    });

    // Get a single user
    app.get('/api/user/:email', async(req, res) => {

        const user = await db.collection('user').findOne( {'email':req.params.email });
        let error;
        
        if (!user) {
            error = 'User not found';
        }

        res.send({
            data: user,
            error
        });

    });

    // Create a new user with his/her associated namespace
    app.post('/api/user', async(req, res) => {
        
        let isExistingUser = await db.collection('user').findOne({ 'email': req.body.email })

        if (isExistingUser) {

            res.send({ error: 'Email must be unique' })
        }

        else {

            let userNS = await db.collection('namespace').insertOne (
                {
                    'email': req.body.email,
                    'namespace': req.body.namespace
                }
            );

            let createdUser = await db.collection('user').insertOne(
                {
                    'role': req.body.role,
                    'name': req.body.name,
                    'surname': req.body.surname,
                    'address': req.body.address,
                    'phone': req.body.phone,
                    'email': req.body.email,
                    'password': req.body.password
                }
            );

            res.send({
                ...createdUser, namespace: userNS.namespace
            });

        }
        
    });

    // Update a user
    app.put('/api/user/:email', async(req, res)  => {

        let dt = req.body;
        delete dt._id;

        const out = await db.collection('user').replaceOne({'email': req.params.email}, dt);

        res.send(out);

    });

    // Delete a user
    app.delete('/api/user', async(req, res) => {   

        let data = req.body
        let outus = await db.collection('user').deleteOne( { 'email': req.body.email } )
        let outns = await db.collection('namespace').deleteMany({'email':req.body.email})
       
        res.send(outns);
        
    });

}
