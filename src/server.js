import express from "express";
import { restart } from "nodemon";
import { MongoClient } from "mongodb";

/* 
Was initially used to parse the body but is now deprecated.
We'll now use the method of the same name under the express object, `express.json()`
import bodyParser from "body-parser";
 */

const app = express();
app.use(express.json());

app.get('/api/articles/:name', async (req,res) => {
    try {
            const articleName = req.params.name;

            // Mongo's default port is 27017
            const client = await MongoClient.connect('mongodb://localhost:27017',{ useNewUrlParser: true});
            const db = client.db('my-blog');

            const articleInfo = await db.collection('articles').findOne({name: articleName})
            res.status(200).json(articleInfo);

            client.close();
    } catch {
        // 500 is the code for internal server error
        res.status(500).json({ message: 'Error connecting to the DB', error});
    }

})

app.post('/api/articles/:name/upvote',(req,res) => {
    const articleName = req.params.name;

    articlesInfo[articleName].upvotes += 1;
    res.status(200).send(`${articleName} currently has ${articlesInfo[articleName].upvotes} upvotes!`);
})

app.post('/api/articles/:name/add-comment',(req,res) => {
    const articleName = req.params.name;
    const {username, text} = req.body;

    articlesInfo[articleName].comments.push({username, text}); 

    res.status(200).send(articlesInfo[articleName]);
})

app.listen(8000,() => console.log('Server is listening on port 8000'));
