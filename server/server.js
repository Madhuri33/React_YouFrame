const express =require('express');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const app =express();
app.use(cors());
app.use(express.json()); 
var upload = multer({ dest: 'add/' });
var type = upload.single('upl');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    limit : '50mb',
    extended : true
  }));
app.use(bodyParser.json());


const port=process.env.PORT ||5000;
app.use(cors());
const Select_Imgs="select * from ImageTab";
const Connect =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'ImageDb'
});



app.listen(port ,()=>console.log(`Server is Running on Port:${port}`));
app.get('/' ,(req ,res)=>{
    res.send("Welcome to Youframe");
});
app.get('/images' ,(req,res)=>{
    Connect.query(Select_Imgs ,(err ,result)=>{
        if(err)
        return res.send(err);
        else{
            var myarray=[];
            result.forEach(element => {
            var buff= new Buffer(element.ImageBlob);
            var obj= {"ImageId":element.ImageId, "ImageBlob":buff.toString('utf8'), "Caption":element.Caption};
            myarray.push(obj);
        });
        
        return res.json({
            data:myarray
        })
        }
    });
});

app.post('/add',bodyParser.json(),(req,res)=>{
    let formData = req.body;
    //const ImageBlob=req.body.ImageBlob;
    //const Caption=req.body.Caption;
    console.log('NewData', req.body);
    //res.status(200).send('ok');
   // res.send(ImageBlob);
    /*const Upload_Img=`insert into ImageTab(ImageBlob,Caption) values("${ImageBlob}","${Caption}") ` 
    Connect.query(Upload_Img,(err,result)=>{
     if(err)
     res.send(err);
     else{
        res.send("Updated");
     }
    })*/
})


