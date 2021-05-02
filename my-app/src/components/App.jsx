import React,{useState} from 'react';
import Header from './Headers';
import Footer from "./Footer";
import Note from "./Note";
import Createarea from './CreateArea';

function App() {

      const [notes, setNotes] = useState([]);
      
   
  function addNote(newNote) {
    
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
    
  
  }

  
 
return(
    <div>  
    <Header/>
    <Createarea 
        onAdd={addNote }
    />
   
    <Footer/>
    </div>  
    );
}
export default App;