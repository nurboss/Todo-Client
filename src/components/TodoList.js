import React, { useState } from 'react'
import './Todolist.css'

const TodoList = ({data , delettodo , handleUpdate}) => {
    const { title, description, _id} = data;
    const [update, setUpdate] = useState(false);
    const [newText, setNewText] = useState("");
    const [newDes, setNewDes] = useState("");

    // const newDate = date.split('').slice(0,10).join('');


    const updat = () => {
        setUpdate(!update);
    }
    const save = () => {
        setUpdate(!update);
        
    }
    const newvalue = (e) => {
        setNewText(e.target.value)
        
    }
    
    const newDescription = (e) => {
        setNewDes(e.target.value)
        
    }


  return (
    <div className='todolist'>

        <div>
            {
            update ? 
            <input className='list-text-input' type="text" name="title" onChange={newvalue} defaultValue={title}></input> :
            <h3>{title}</h3>
            }
            {
                
            update ? 
            <textarea className='list-area-input' type="text" name="title" onChange={newDescription} defaultValue={description}></textarea> :
            <p>{description}</p>
            }
        </div>
        
       
        {/* <p>{status}</p>
        <p>{date}</p> */}
        <div className='btn-div'>
            <button className='delete-btn' onClick={() => delettodo(_id)}>Delete</button>
            { update ? 
            <button className='save-btn' onClick={() => handleUpdate(_id, newText, save, newDes, title, description)}>Save</button> :
            <button className='update-btn' onClick={() => updat()}>Update</button>}
            
        </div>
        {/* {newDate} */}

    </div>
  )
}

export default TodoList