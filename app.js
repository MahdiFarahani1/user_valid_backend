const { getRandomValues } = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./models/schema_user');
const cors = require('cors');
const app = express();

const databaseurl = "mongodb+srv://mahdi:MahdiWolf123@cluster0.b7x5ksc.mongodb.net/node?retryWrites=true&w=majority";

mongoose.connect(databaseurl).then(() => {
  app.listen(3000);
  console.log("Database connected bro");
}).catch((err) => {
  console.log(err);
});

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  console.log("get is okkkk bro");
  userModel.find()
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

app.get("/check",async(req,res)=>{
const UserName ="mohsen12w"
const Password ="farahan1225!"

const user = await userModel.findOne({username:UserName } || {password:Password});
if (user) {
    res.send("yes")
}else{
    res.send("no")
}

})
app.post("/add-user", async (req, res) => {
  try {
    const body = req.body;

    const userCheck = await userModel.findOne({
      $or: [
        { username: body.username },
        { email: body.email },
        { phone: body.phone }
      ]
    });

    if (userCheck) {
      res.status(400).json({ error: "این حساب قبلا ساخته شده است" });
    } else {
      const user = new userModel(body);
      const result = await user.save();
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/checkUser", async (req, res) => {
  const body = req.body;

  try {
    const userCheck = await userModel.findOne({
      $and: [
        { username: body.username },
        { password: body.password },
      ],
    });

    if (userCheck) {
      const userData = {
        username :userCheck.username,
        password :userCheck.password,
        email :userCheck.email,
        phone :userCheck.phone
      }     

      


      res.status(200).send(userData);
      
    }else {
      res.status(400).send({ error: "این حساب وجود ندارد" });
    } 
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
  
   
});

app.use((req, res) => {
  res.status(404).json({
    Error: {
      message: "error 404 not found",
    }
  });
});
