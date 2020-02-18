import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { observer } from 'mobx-react'
import Invoice from './models/todos';
import { runInThisContext } from 'vm';
import editButton from './editButton'
import { boolean } from 'mobx-state-tree/dist/internal';

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
  const refContainer = useRef<null>(null)
  const [width , setWidth ] = useState<string>()


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

  const openNav = () => {
    //document.getElementById("mySidenav").style.width = "250px";
    setWidth('250px')
  
  }

  const closeNav = () => {
    //document.getElementById("mySidenav").style.width = "0";
    setWidth('0')

  }
  

  return (
    <div className="App" onKeyDown={removeEdit}>
      <header className="App-header">

      <div style={{width: width}} className="sidenav">
  <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
  <a href="#">About</a>
  <a href="#">Services</a>
  <a href="#">Clients</a>
  <a href="#">Contact</a>
</div>

<span onClick={openNav}>open</span>


        <h3>Todo App</h3>

          <input className="input-field" style={{height:50, width:350 }} placeholder="What needs to be done?"
            value={mytodo.here} onKeyPress={enterKeyPress} onChange={handleAdd}></input>


        {thetodos.todos.items.map((i: any) => {
          return <div key={i.id} className="wrapper">

           
            <span onDoubleClick={() => { setEditId(i.id); addEdit(i.todo) }}>
              {editID == i.id ? <div>  <input className="input-field" style={{height:50, width:350 }} 
                value={editValue} onKeyDown={(e:any) =>  { console.log(e.key + ' ' + e.charCode + ' ' + e.keyCode); if(e.key =='Enter'){ i.edit(editValue); setEditId(0)  }else if(e.key === 'Escape'){ setEditId(undefined) }}} onChange={handleEdit}></input> </div>
               
                :
               
             <div className="box-field">
             <div> <input onClick={()=> i.check()} type="radio" checked={i.completed ? true : false}/></div>
             <div className={i.completed ? "todo-text" : ""}>{i.todo }  </div>
           <div> {editID !== i.id ? <button onClick={() => i.remove()}>X</button> : null} </div>

             </div>
              }
           </span>

          </div>
        })}


      </header>
    </div>
  );
}

export default observer(App);
