const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/notes_db',{
    useNewUrlParser:true ,
    useUnifiedTopology:true
});

//to check mongodb connection
mongoose.connection.on('connected',() =>{
    console.log("mongodb connected sucessfully");
});

const Schema=mongoose.Schema;
const NotesSchema=new Schema({
    Title:String,
    Content:String,
    time:String
});
const Notes=mongoose.model('Notes',NotesSchema);

module.exports=Notes;