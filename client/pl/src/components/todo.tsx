import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { AppDispatch } from "../store";
import { addTodo, deleteTodo } from "../store/todoSlice";


const TodoComponent: React.FC = () => {
 
    const [current, setCurrent] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const mirpara = useParams()

    const handleAddtask = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(addTodo(current))   
        setCurrent('')
    }
    const handleEdit: React.FC = () => {

        
    }
    
    const handleDelete: React.FC = () => {
        console.log(mirpara)
        dispatch(deleteTodo(current))
        
    }
   
    const {todoList}:any = useSelector<any>(state => state.todo)
    console.log(todoList)
  

    return (
        <div>
            <div>
                <form >
                    <input type="text" value={current} onChange={(e) => setCurrent(e.target.value)} />
                     <button onClick={handleAddtask}>addTask</button>
                </form>  
                <ul>
                    {
                        todoList.map((todoItem: any) => <li key={todoItem.id}>{
                            todoItem.title}
                            <button onClick={handleDelete}>delete</button>
                            <button onClick={handleEdit}>edit</button>
                        </li>)
                    }
                </ul>
            </div>
          
        </div>
    )
}
export default TodoComponent;