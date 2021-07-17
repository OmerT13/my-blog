import express from "express";

/* 
Was initially used to parse the body but is now deprecated.
We'll now use the method of the same name under the express object, `express.json()`
import bodyParser from "body-parser";
 */

const app = express();
app.use(express.json());

app.get('/hello',(req,res) => res.send('Hello!'));
app.get('/hello/:name',(req,res) => res.send(`Hello ${req.params.name}`));
app.post('/hello',(req,res) => res.send(`Hello ${req.body.name}!`));
app.listen(8000,() => console.log('Server is listening on port 8000'));
