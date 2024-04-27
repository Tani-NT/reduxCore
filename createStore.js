import { bindActionCreators, combineReducers, createStore } from "redux";

const add_todo = 'add_todo';
const del_todo = 'delete_todo';
const edit_todo = 'edit_todo';
const ADD_USER = 'add_user';

function todoReducer(state=[],action){
    if(action.type == add_todo){
        const todoText = action.payload.todoText;
        return[
            ...state,
            {text: todoText, isFinished: false, id: (state.length == 0) ? 1: state[state.length - 1].id + 1}
        ]
    }
    else if(action.type == del_todo){
        const todoId = action.payload.todoId;
        return state.filter(t => t.id != todoId);
    }
    else if(action.type == edit_todo){
        const todo = action.payload.todo;
        const todoText = action.payload.todoText;
        return state.map(t => {
            if(t.id == todo.id){
                t.text = todoText;
            }
            return t;
        })
    }
    return state;
}

function userReducer(state=[], action){
    if(action.type == ADD_USER){
        const userName = action.payload.userName;
        return[
            ...state,
            {name: userName,id: (state.length == 0) ? 1: state[state.length - 1].id + 1}
        ]
    }
    return state;
}

// const response = createStore(todoReducer,[]);
// console.log(response);


// action objects => action methods(action creator)
const addTodo = (todoText) => ({type: add_todo, payload: {todoText}});
const deleteTodo = (id) => ({type: del_todo, payload: {todoId: id}})
const addUser = (name) => ({type: ADD_USER, payload:{userName: name}});

// to combine more than 1 reducer into 1 reducer
const reducer = combineReducers({todo: todoReducer, user: userReducer})

// createStore is used to save multiple states
const {dispatch, subscribe, getState, replaceReducer} = createStore(reducer);

// subscribe is used to update the state
subscribe(() => console.log(getState()));

// this binds or wraps the objects into the dispatch method so that they can be invoked directly
const actions = bindActionCreators({addTodo,deleteTodo,addUser}, dispatch);

actions.addTodo('todo 1');
actions.addUser("Tanya");
actions.addTodo('todo 2');
actions.deleteTodo(1);

