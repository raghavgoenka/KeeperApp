import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Note from './Note';
import{BrowserRouter as Router ,Route,Redirect, Switch} from 'react-router-dom';
function CreateArea(props) {

    const [note,setNote]=useState({
        title:"", 
        content: "",
        posts:[]
    });

    // const visible=useState({
    //     visibility:false
    // });

    function handleChange(event){

        const {name ,value}=event.target;
       
        setNote(prevNote =>{
            return {
               ...prevNote,
               [name]:value
              
            };
            
           
        });
       
    }

    function submitNote(event){
        // visible.visibility=true
        // console.log(visible.visibility);
        // console.log(visible.visibility);
        const now = new Date().toLocaleTimeString();
       
        props.onAdd(note);
        event.preventDefault();
        const DbNotes={
            Title:note.title,
            Content:note.content,
            time:now
        };


        if(note.title.length<2 && note.content.length<2)
        {   
            console.log("enwefkernjfr"+note.title + note.content+"wwfewjfregrkngnjkngjlernjn");
          console.log("error i!!!!!!");
       
          return(
           
           alert("Dont leave the fields empty")
         
          );
        }

        axios ({
            url:'/save',
            method:'POST',
            data:DbNotes
        })
        .then(() => {
            console.log("Data has been sent to the server");
            getNotes();

        })

        .catch(() => {
            console.log("Internal server error");

        });
        setNote({
            title:"",
            content:""
        });
       
}
    function getNotes(){
        var datab;
        console.log("inside getNotes");
        axios.get('/database')
        .then((response) => {
             datab=response.data;
            console.log(datab);
            setNote({posts:datab});
            console.log(note.posts);
            console.log("Data has been received");
            displayNotes(note.posts);
        })
        .catch(() => {
            alert('Error retrieving data!!');
        });
      
    }
    
    

    

    function displayNotes(posts){
        
        console.log(posts);
        if(!posts){
            return null;
        }
       return posts.map((post,index) => {
          
          return(
            <Note
            key={index}
            id={index}
            title={post.Title}
            content={post.Content}
            time={post.time}
            
            onDelete={deleteNote}
            />
            );});
            function deleteNote(id) {
              
                
                setNote(post => {
                  
            return posts.filter((post,index) => {
                    
                     return index !== id;
                   
               });
              
             });
             
             getNotes();
            }
          
    }

    
          
   


    return ( 
        <div>
            <form >
                <input name="title" onChange={handleChange} value={note.title} placeholder="Title"/ >
                <textarea name="content" onChange={handleChange} value={note.content} placeholder="Take a note..." rows="3"/>
                <button onClick={submitNote}>Add</button>

            </form>
          

            <div>
                {displayNotes(note.posts)}
              
            </div>
            
        </div>


    );

}

export default CreateArea;