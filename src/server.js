import express from "express";

/* 
Was initially used to parse the body but is now deprecated.
We'll now use the method of the same name under the express object, `express.json()`
import bodyParser from "body-parser";
 */

const articlesInfo = {
    'learn-react': {
        upvotes: 0,
    },
    'learn-node': {
        upvotes: 0,
    },
    'my-thoughts-on-resumes': {
        upvotes: 0,
    },
}

const app = express();
app.use(express.json());

app.post('/api/articles/:name/upvote',(req,res) => {
    const articleName = req.params.name;

    articlesInfo[articleName].upvotes += 1;
    res.status(200).send(`${articleName} currently has ${articlesInfo[articleName].upvotes} upvotes`);
})

app.listen(8000,() => console.log('Server is listening on port 8000'));
