import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

interface Todos {
  mytodos: string;
  id: number;
  completed: boolean;
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
      completed: false,
    }]);

    addTodo({here:''})

  }

  const handleAdd = (e: any) => {
    addTodo({here: e.target.value})

  }

  const deleteTodo = (e: number) => {
    setTodos(todos.filter(i=> i.id !==e ))
    console.log(e)
    console.log(todos)
  }

  const enterKeyPress = (e: any) => {
    if(e.key == 'Enter') {
      setTodos([...todos, {
        mytodos: mytodo.here,
        id: Math.floor(Math.random() * 300),
        completed: false,
      }]);
      addTodo({here:''})

    }
  }

  return (
    <div className="App">
      <header className="App-header">
      <h3>Todo App</h3>
      <input value={mytodo.here} onKeyPress={enterKeyPress} onChange={handleAdd}></input>
      <button onClick={() => handleChange()}>Add Todo</button>
      
      {todos.map(i => 
        <div key={i.id}>{i.mytodos} <button onClick={()=>{deleteTodo(i.id); }}>X</button> </div>)}

      </header>
    </div>
  );
}

export default App;
