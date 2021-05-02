const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const path=require('path');
const Notes=require('./models/notesdb');
const { title } = require('process');
const app=express();



const PORT=process.env.PORT || 8080;



// const data={
//     Title:"Welcome here",
//     Content:"hi how r u doing"
// }

// const newNote=new Notes(data);

// newNote.save((error) => {
//     if(error)
//     {
//         console.log("Something Happened in data adding");
//     }
//     else {
//         console.log(" Data Added Successfully");
//     }
    
// });

app.use(express.json());
app.use(express.urlencoded({extended:false}));


//HTTP request logger
app.use(morgan('tiny'));

app.get('',(req,res) =>{
    res.send("hello world");
});
app.post("/save",function(req,res) {
    
    const data=req.body;
    
    console.log("Show me this "+data.Title);
    
   
   
       if(data!='{}' && data.Title!=="" && data.Content!=="" && data.Title!==" " && data.Content!==" " && data.Title!==undefined && data.Content!==undefined){
            const notes_data=new Notes(data);

            notes_data.save((error) => {
                if(error){
                    res.status(500).json({msg:"Sorry, internal errors"});
                }
                else{
                    console.log("Data Added Successfully")
                }
                
            });

            res.json({
                msg:"We received your data"
            });
        }
        else{
            console.log("Adding title n content is must!!");
            res.redirect("/");
        }   
    
});
 
app.post('/delete',function(req,res){
    const noteid=req.body;
    console.log(noteid.Title +noteid.Content);
   
    Notes.deleteOne(noteid, function(err){
        
        if(!err) {
            console.log("Successfully deleted item");
           res.redirect("/");
        }
    });
});

app.get('/database',function(req,res){
    Notes.find({ })
    .then((data) => {
        console.log("Data:",data);
        res.json(data);
        
    })
    .catch((error) => {
        console.log("error:",error);
    })
});


app.listen(PORT,function(){
    console.log(`Ser is starting ${PORT}`)}
    );


