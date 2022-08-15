import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import TodoList from './TodoList'
import './Todo.css'


const Todo = () => {
    const [todo, setTodo] = useState([])

    useEffect(() => {
        fetch('https://safe-meadow-13717.herokuapp.com/todo/')
        .then(result => result.json())
        .then(service => setTodo(service.result))
      }, [todo])
      
    


      const { register, handleSubmit, reset } = useForm();
      const onSubmit = data => {
        data.status = 'active';
        fetch('https://safe-meadow-13717.herokuapp.com/todo/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
          .then(res => res.json())
          .then(data => {
            if(data.message){
            reset()
            }
          })     
      };

      const handleDeletetodo = id => {
        fetch(`https://safe-meadow-13717.herokuapp.com/todo/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(result => {
            if(result.message){
            alert('Are you Sure you want to delete.')
        const remainig = todo.filter(data => data._id !== id);
        setTodo(remainig);
            }
            
        });
        }
        
        const handleUpdate = (id, data, save, newDes, title, description) => {
            const allData = { 
                title: data,
                des: newDes
            }
            if(allData.title === ""){
                allData.title = title
            }
            if(allData.des === ""){
                allData.des = description
            }

            const newData = { allData };
        fetch(`https://safe-meadow-13717.herokuapp.com/todo/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newData)
        })
        .then(res => res.json())
        .then(result => {
            if(result.message){
            alert('You update Successfully.')
            save()
            }
            
        });
        }

  return (
    <div className='container'>
        <div className='first-container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className='text-input' type="text" {...register("title")} placeholder="Title" /> <br />

                <textarea className="text-area" type="text" {...register("description")} placeholder="Description"  /> <br />

                <input className="submit-btn" type="submit" />
            </form>
        </div>
        <div className='sec-container'>
            {
                todo.map(data => <TodoList
                data={data}
                key={data._id}
                delettodo={handleDeletetodo}
                handleUpdate={handleUpdate}
                ></TodoList>)
            }
        </div>

                 
      
    </div>
    
  )
}

export default Todo