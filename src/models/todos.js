import { types, getParent } from "mobx-state-tree";


const Item = types.model('Item', {
    todo: types.string,
    id: types.number,
    completed: types.boolean
})
.actions((self) => ({
    remove(){
      //  console.log(id)
        getParent(self, 2).remove(self);
    },
    edit(f){
        console.log(f)
        self.todo = f;
        
    },
    check(){
        self.completed = !self.completed
    }
}))

const TodoHolder = types.model('TodoHolder', {
    items: types.array(Item) 
})
.actions((self)=> ({
    addItem(f) {
        console.log(f)
        console.log(self.items)
        self.items.push(f)
    },
    remove(item){
        console.log(item)
        console.log(self)
        self.items.splice(self.items.indexOf(item), 1)
    }
}))

const Invoice = types.model('Invoice', { 
    currency: types.string,
    is_paid: false,
    todos: types.optional(TodoHolder, {items: []})
})
.views((self) => ({
   status() {
       return self.is_paid ?  "Paid" : "Not Paid"
   }
}))





/*const NewTodo = types.model('NewTodo', {
    todos: types.string,
    completed: types.boolean,
    id: types.number,
})
.actions(self => ({
    addTodo(f) {
        self.todos = f.todo;
        self.completed = f.completed;
        self.id = f.id;
    }
}))

const TodosContainer = types.model('TodosContainer', {
    store: types.array(NewTodo)
})
.actions(self => ({
    add(item) {
        self.holder.push(item)
    }
}))

const Todos = types.model('Todos', {
    todo: types.array(TodosContainer),
//    completed: types.boolean,
//    id: types.number,
})
.actions(self => ({
    add(f) {
        self.todo.push(f)
    }
}))

export default Todos  */
export default Invoice  