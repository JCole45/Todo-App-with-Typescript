import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

interface Todos {
  mytodos: string;
  id: number;
  status: string;
}

interface AddTodo {
  here: string;
}

interface editID {
  editid: number;
}

//const [todos , setTodos] = useState<Todos >({mytodos: 'here', id:0, status:'completed'})


function App () {

  const [todos , setTodos] = useState<Array<any>>([])
  const [mytodo, addTodo] = useState<AddTodo >({here: ''})
  const [edittodo, setEditID] = useState<editID>({editid: 0})

  const handleChange = () => {
    console.log('activated')
    setTodos([...todos, {
      mytodos: mytodo.here,
      id: Math.floor(Math.random() * 300),
      status: 'uncompleted'
    }])
  }

  const handleAdd = (e: any) => {
    addTodo({here: e.target.value})
  }

  return (
    <div className="App">
      <header className="App-header">
      <h3>Todo App</h3>
      <input value={mytodo.here} onChange={handleAdd}></input>
      <button onClick={() => handleChange()}>Add Todo</button>
      
      {todos.map(i => 
        <div key={i.id}>{i.mytodos} <button onClick={()=>{setEditID({editid: i.id}); console.log(edittodo.editid); todos.filter(j=> j.id !== edittodo.editid)}}>X</button> </div>)}

      </header>
    </div>
  );
}

export default App;
