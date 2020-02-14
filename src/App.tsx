import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { observer } from 'mobx-react'
import Invoice from './models/todos';
import { runInThisContext } from 'vm';
import editButton from './editButton'

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

interface s {

}

interface d {
  currency: string;
  is_paid: boolean;
  id: number;
}

//const [todos , setTodos] = useState<Todos >({mytodos: 'here', id:0, status:'completed'})


const App = (props: { invoice: any }) => {

  const thetodos = props.invoice

  const [todos, setTodos] = useState<Array<any>>([])
  const [mytodo, addTodo] = useState<AddTodo>({ here: '' })
  const [edit, setEdit] = useState<boolean>(false)
  const [editValue, addEdit] = useState<string>('')
  const [editID, setEditId] = useState<number>()
  const [editStatus, setEditStatus] = useState<boolean>()


  useEffect(() => {
    console.log(thetodos.todos.items)
  })

  const handleChange = () => {
    if (!edit) {
      console.log('activated')
      setTodos([...todos, {
        mytodos: mytodo.here,
        id: Math.floor(Math.random() * 300),
        completed: false,
      }]);

      const f: object = {
        todo: mytodo.here,
        id: Math.floor(Math.random() * 300),
        completed: false,
      }

      thetodos.todos.addItem(f);
      console.log('a')
      console.log(thetodos.todos.items)
    } else if (edit) {
      const f: object = {
        todo: editValue,
        id: editID,
        completed: editStatus,
      }

    }


  }

  const handleAdd = (e: any) => {
    addTodo({ here: e.target.value })
    console.log(thetodos)

  }

  const handleEdit = (e: any) => {
    addEdit(e.target.value);
    console.log(editValue)

  }

  const enterKeyPress = (e: any) => {
    if (edit == false) {
      if (e.key == 'Enter') {
        setTodos([...todos, {
          mytodos: mytodo.here,
          id: Math.floor(Math.random() * 300),
          completed: false,
        }]);

        const f: object = {
          todo: mytodo.here,
          id: Math.floor(Math.random() * 300),
          completed: false,
        }


        thetodos.todos.addItem(f);
        addTodo({ here: '' })
      }
    } else {
      if (e.key == 'Enter') {
        const f: object = {
          todo: editValue,
          id: editID,
          completed: editStatus,
        }


        thetodos.todos.edit(f);
        console.log(f)
      }
    }
  }

  const removeEdit = (e: any) => {
    console.log(e.key)
    if (e.key == 'Escape') {
      setEditId(undefined)
    }
  }

  

  return (
    <div className="App" onKeyPress={removeEdit}>
      <header className="App-header">
        <h3>Todo App</h3>
        {!edit ?
          <input className="form-input mt-1 block w-full"
            value={mytodo.here} onKeyPress={enterKeyPress} onChange={handleAdd}></input>
          :
          <input className="form-input mt-1 block w-full"
            value={editValue} onKeyPress={enterKeyPress} onChange={handleEdit}></input>
        }
         <button onClick={() => handleChange()}>Add Todo</button>


        {thetodos.todos.items.map((i: any) => {
          return <div key={i.id}>
            <span onDoubleClick={() => { setEditId(i.id); addEdit(i.todo) }}>
              {editID == i.id ? <input className="form-input mt-1 block w-full"
                value={editValue} onKeyPress={(e:any) =>  {if(e.key =='Enter'){ i.edit(editValue); setEditId(0)  }else if(e.keyCode === 27){ setEditId(undefined) }}} onChange={handleEdit}></input>
                : i.todo}
           </span>

                
                 <button onClick={() => i.remove()}>X</button>

              {editID == i.id ? <button onClick={() => { i.edit(editValue); setEditId(undefined) }}> Edit </button> : null}

              <button onClick={() => i.check()}> {i.completed ? 'uncheck' : 'check'}</button>

          </div>
        })}


      </header>
    </div>
  );
}

export default observer(App);
