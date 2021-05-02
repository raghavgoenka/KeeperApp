import React,{useState} from 'react';

import axios from 'axios';
import{BrowserRouter as Router ,Route,Redirect, Switch} from 'react-router-dom';

import App from './App';

function Note(props) {
   
    const [notes]=useState({
     
        title:props.title,
        content: props.content,
        time:props.time
        
    });
    
    
    
    
    function handleClick() {
      

       props.onDelete(props.id);
       const DbNotes1={
        Title:notes.title,
        Content:notes.content,
        time:props.time
    };
       

    axios ({
        url:'/delete',
        method:'POST',
        data:DbNotes1
    })
    .then(() => {
        console.log("Data has been Deleted");
        
    })

    .catch(() => {
        console.log("Internal server error");

    });

    
   
    // return(
    //     <div>
    //     <Router>
    //         <Redirect path="/" component={App}/>
    //     </Router>
    //     </div>
    // );


    
    }
    
    return(
    <div className="note">
      
        <h1>{props.title} </h1>
        <p>{props.content}</p>
    <p className="time">At:{props.time}</p>
        <button onClick={handleClick}>Delete
        
        </button>


        </div>
);
} 

export default Note;