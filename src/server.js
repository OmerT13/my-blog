import express from "express";
import { restart } from "nodemon";

/* 
Was initially used to parse the body but is now deprecated.
We'll now use the method of the same name under the express object, `express.json()`
import bodyParser from "body-parser";
 */

const articlesInfo = {
    'learn-react': {
        upvotes: 0,
        comments: [],
    },
    'learn-node': {
        upvotes: 0,
        comments: [],
    },
    'my-thoughts-on-resumes': {
        upvotes: 0,
        comments: [],
    },
}

const app = express();
app.use(express.json());

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
