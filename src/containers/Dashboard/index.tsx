import React, {useEffect, useReducer, useState} from 'react';
import axios from 'axios';
import Layout from 'components/Layout';
import Seo from 'utils/Seo';
import {useUser} from 'contexts/UserContext';

const Dashboard = () => {
  const user = useUser();
  const ACTIONS = {
    TODOS_LOADED: 'TODO_LOADED',
    TODOS_LOADING: 'TODO_LOADING',
    TODOS_LOADING_FAILED: 'TODOS_LOADING_FAILED',
  };
  const initialState = {
    error: false,
    todos: [],
    todosLoading: true,
  };

  function reducer(state: any, action: any) {
    switch (action.type) {
      case ACTIONS.TODOS_LOADING:
        return {
          ...state,
          todosLoading: true,
        };
      case ACTIONS.TODOS_LOADED:
        return {
          ...state,
          todos: action.payload.results,
          todosLoading: false,
        };
      case ACTIONS.TODOS_LOADING_FAILED:
        return {
          ...state,
          error: true,
          todosLoading: false,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [btnName, setBtnName] = useState('Add');
  const [todo, setTodo] = useState('');
  const [todoID, setTodoID] = useState(Number);
  const [editing, setEditing] = useState(false);

  const fetchTodos = () => {
    dispatch({type: ACTIONS.TODOS_LOADING});
    axios
      .get('/todos/list/')
      .then((res) => {
        dispatch({payload: res.data, type: ACTIONS.TODOS_LOADED});
      })
      .catch(() => {
        dispatch({type: ACTIONS.TODOS_LOADING_FAILED});
      });
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: any) => {
    setTodo(e.target.value);
  };

  const handleSubmit = (e: any, editing_: boolean) => {
    e.preventDefault();
    const body = JSON.stringify({title: todo});
    axios({
      data: body,
      method: editing_ ? 'patch' : 'post',
      url: editing_ ? `/todos/update/${todoID}/` : `/todos/create/`,
    }).then(() => {
      fetchTodos();
      setEditing(false);
      setTodo('');
    });
  };

  const deleteTodo = (id: any) => {
    axios.delete(`/todos/delete/${id}/`).then(() => {
      fetchTodos();
    });
  };

  const editTodo = (taskId: number, taskName: string) => {
    setBtnName('Update');
    setTodo(taskName);
    setTodoID(taskId);
    setEditing(true);
  };

  const handleComplete = (taskID: number, taskStatus: boolean) => {
    const body = JSON.stringify({completed: !taskStatus});
    axios.patch(`/todos/update/${taskID}/`, body).then(() => {
      fetchTodos();
    });
  };

  return (
    <Layout>
      <Seo title="Dashboard" />
      <h3 className="mt-5">Dashboard</h3>
      <small>Welcome {`${user.user.first_name} ${user.user.last_name}`}</small>
      <div className="card">
        <div className="card-header d-flex flex-row justify-content-center align-items-center text-center">
          <form
            onSubmit={(e) => {
              handleSubmit(e, editing);
            }}
          >
            <input
              className="u-full-width"
              type="text"
              name="todo"
              id="todo"
              onChange={handleChange}
              value={todo}
              placeholder="Enter your todo here..."
            />
            <button className="button-primary" onClick={() => setBtnName('Add')}>
              {btnName}
            </button>
          </form>
        </div>

        <div className="card-body mt-7">
          <table className="u-full-width">
            <thead>
              <tr className="text-center">
                <th>Todo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.todos.length === 0 ? (
                <tr>
                  <td colSpan={2}>Not added any todos yet!</td>
                </tr>
              ) : (
                state.todos.map((task: any) => (
                  <tr key={task.id}>
                    <td>
                      <span style={{textDecoration: task.completed && 'line-through'}}>{task.title}</span>
                      <input
                        type="checkbox"
                        onChange={() => handleComplete(task.id, task.completed)}
                        className="ml-3"
                        checked={!!task.completed}
                      />
                    </td>
                    <td className="d-flex justify-content-center align-items-center">
                      <button className="button-primary" onClick={() => editTodo(task.id, task.title)}>
                        Edit
                      </button>
                      <button className="ml-3" onClick={() => deleteTodo(task.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
