module.exports = function (app, db) {

    let ObjectId = require('mongodb').ObjectId;

    // Create a new namascpace
    app.post('/api/namespace', async (req, res) => {

        let ctrl = await db.collection('namespace').find({ 'namespace': req.params.namespace });

        if (ctrl.data) {

            res.send({ error: 'Namespace must be unique' });

        } else {

            let out = await db.collection('namespace').insertOne(req.body);
            res.send(out);

        }

    });

    // Update a namespace
    app.put('/api/namespace', async (req, res) => {

        let data = req.body;
        let _id = new ObjectId(data._id);
        delete data._id;

        let out = await db.collection('namespace')
            .replaceOne({ _id: _id }, data);

        res.send(out);

    });

    // Delete a namespace
    app.delete('/api/namespace/:role', async (req, res) => {

        let data = req.body;
        let rl = req.params.role;
        let out;

        if (rl == 'Administrator') {

            out = await db.collection('namespace')
                .deleteOne({ 'namespace':req.body.namespace });

        } else {

            out = await db.collection('namespace').deleteOne(
                {
                    'email': req.body.email,
                    'namespace':req.body.namespace
                }
            );

        }

        res.send(out);

    });

}
