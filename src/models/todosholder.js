import { types } from "mobx-state-tree";
import Todos from './todos';

const TodoHolder = types.model('TodoHolder', {
    holder: types.array(Todos),
})
.actions(self => ({
    add(item) {
        self.holder.push(item)
    }
}))

export default TodoHolder