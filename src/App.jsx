import logo from "./logo.svg";
import "./App.css";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useReducer, useState } from "react";
import { SiTicktick } from "react-icons/si";

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      return [
        {
          id: action.id,
          text: action.text,
          done: false,
          change: false,
        },
        ...state,
      ];
    }

    case "toggleDone": {
      return state.map((t) => {
        if (t.id === action.id) {
          return {
            ...t,
            done: !t.done, // Toggle the 'done' status
          };
        } else {
          return t;
        }
      });
    }

    case "toggleChange": {
      return state.map((t) => {
        if (t.id === action.id) {
          return {
            ...t,
            text: action.text,
            change: !t.change,
          };
        } else {
          return t;
        }
      });
    }

    case "del": {
      return state.filter((t) => t.id !== action.id);
    }
  }
}

function App() {
  const [tasks, dispatch] = useReducer(reducer, []);
  const [task, settask] = useState("");
  function addTask(text) {
    dispatch({
      type: "add",
      id: tasks.length,
      done: false,
      text: text,
      change: false,
    });

    settask("");
  }
  function toggleDoneTask(id) {
    dispatch({
      type: "toggleDone",
      id: id,
    });
  }
  function toggleChangeTask(id, text) {
    dispatch({
      type: "toggleChange",
      id: id,
      text: text,
    });

    settask("");
  }

  function del(id) {
    dispatch({
      type: "del",
      id: id,
    });
  }
  return (
    <div className="App">
      <div className="container">
        <div className="input">
          <input
            type="text"
            value={task}
            onChange={(e) => {
              settask(e.target.value);
            }}
          />{" "}
          <button onClick={() => addTask(task)}>Add Item</button>
        </div>
        <div className="items">
          {tasks &&
            tasks.map((e) => {
              return (
                <div className="item">
                  <p>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      onChange={() => toggleDoneTask(e.id)}
                      style={{
                        visibility: `${e.change ? "hidden" : "visible"}`,
                      }}
                    />
                    {console.log(e.text.length)}
                    <hr width={e.done ? e.text.length * 8 : 0} />
                    <p
                      className={`${
                        e.change ? "item-text changeset" : "changeset"
                      }`}
                      contentEditable={e.change}
                      onInput={(e) => {
                        settask(e.target.innerText);
                      }}
                    >
                      {e.text}
                    </p>
                  </p>
                  <div>
                    <button
                      onClick={() => {
                        toggleChangeTask(e.id, e.change ? task : e.text);
                      }}
                    >
                      {e.change ? <SiTicktick /> : <FaEdit />}
                    </button>
                    <button onClick={() => del(e.id)}>
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
