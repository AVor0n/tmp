import { ChangeEventHandler, useState } from 'react';
import { ReactComponent as AddIcon } from './assets/svg/add.svg';
import { ReactComponent as BinIcon } from './assets/svg/bin.svg';
import { ReactComponent as MarkIcon } from './assets/svg/mark.svg';

const initialTodos = [{
  id: crypto.randomUUID(),
  title: 'first test task',
  complete: false,
  deleted: false,
}, {
  id: crypto.randomUUID(),
  title: 'second test task',
  complete: false,
  deleted: false,
}];


const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [currentCategory, setCurrentCategory] = useState('active');

  const onChangeNewTaskTitle = (event) => {
    setNewTaskTitle(event.target.value);
  };

  const onAddHandler = () => {
    if (newTaskTitle) {
      todos.push({
        id: crypto.randomUUID(),
        title: newTaskTitle,
        complete: false,
        deleted: false,
      });
      setNewTaskTitle('');
    }
  };

  const onDeleteHandler = (id) => {
    const deletedTodo = todos.find(todo => todo.id === id);
    if (deletedTodo) {
      deletedTodo.deleted = !deletedTodo.deleted;
    }
    setTodos(todos.slice());
  };

  const onCompleteHandler = (id) => {
    const completedTodo = todos.find(todo => todo.id === id);
    if (completedTodo) {
      completedTodo.complete = !completedTodo.complete;
    }
    setTodos(todos.slice());
  };

  const categoryFilter = (todo) => {
    switch (currentCategory) {
      case 'active': {
        return !todo.deleted && !todo.complete;
      }
      case 'completed': {
        return !todo.deleted && todo.complete;
      }
      case 'deleted': {
        return todo.deleted;
      }
    }
  };

  const todosForShow = todos.filter(categoryFilter);

  return (
    <div className="app">
      <h1>ToDo List</h1>

      <div className='tools'>
        <input value={newTaskTitle} onChange={onChangeNewTaskTitle} placeholder='Название новой задачи' />
        <AddIcon onClick={onAddHandler} className='icon' />
        <select id="category" value={currentCategory} onChange={(e) => setCurrentCategory(e.target.value)}>
          <option value="active">активные</option>
          <option value="completed">завершенные</option>
          <option value="deleted">удаленные</option>
        </select>
      </div>

      <div className='todos'>
        {!todosForShow.length && <span>Задачи выбранной категории отсутствуют</span>}
        {todosForShow.map(todo => (
          <div key={todo.id} className='todo'>
            <span className='todo__title'>{todo.title}</span>
            <BinIcon onClick={() => onDeleteHandler(todo.id)} className='icon' />
            <MarkIcon onClick={() => onCompleteHandler(todo.id)} className='icon' />
          </div>
        ))}
      </div>
    </div >
  );
};

export default App;
