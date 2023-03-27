import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'



const app = express()
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/post', PostRoute)


app.get('/', (req, res) => {
    res.send('running')
})

//const port = 3000



// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })




mongoose.connect("mongodb://localhost:27017/socialmedia", {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    app.listen(5000, ()=>{
        console.log("Server running on  5000");
        
    });
})
.catch((error)=>{
    console.log(error);
})

