import { createSlice } from '@reduxjs/toolkit';

interface todoTypes{
    todoList: [],
    loading: boolean,
    error:string
} 

const initialState:todoTypes|any= {
    todoList: [],
    loading: false,
    error: '',

}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo(state, action) {
            const newtask = {
                id: new Date().toDateString(),
                title: action.payload
            }
            
            state.todoList.push(newtask);
            return state;
        },
        editTodo(state, action) { return state},
        deleteTodo(state, action) { 
            // state.todoList.splice(state.todoList.indexOf(action.payload.id));
            console.log(state.todoList.indexOf(action.payload))
            return state
        }



    }

})

export const { addTodo ,deleteTodo,editTodo} = todoSlice.actions;

export default todoSlice.reducer;

