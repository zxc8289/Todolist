import React from "react";
import {
  collection,
  updateDoc,
  doc,
  addDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  writeBatch,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase-config";

import Todo from "./Todo";
import Foter from "./Footer";
import Header from "./Header";
import { useLocation } from "react-router";

function TodoList() {
  const { pathname } = useLocation();
  const [text, setText] = React.useState();
  const [todos, setTodos] = React.useState([]);
  const [filteredTodos, setFilteredTodos] = React.useState([]);

  const onChangeText = React.useCallback((e) => {
    setText(e.target.value);
  }, []);

  // setText(e.target.value);

  const onKeyPress = React.useCallback(
    async (e) => {
      const todosCollectionRef = collection(db, "todos");

      if (e.key === "Enter") {
        await addDoc(todosCollectionRef, {
          text: text,
          checked: false,
        });
        setText("");
      }
    },
    [text]
  );

  //   setTodos([...todos,
  //     {
  //       id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
  //       text: text,
  //       checked: false,
  //     },
  //   ]);
  //   setText("");
  // }

  const toggleTodo = React.useCallback(async (id, checked) => {
    const todoDoc = doc(db, "todos", id);
    await updateDoc(todoDoc, { checked: !checked });
  }, []);

  const deleteTodo = React.useCallback(async (id) => {
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);
  }, []);

  const clearCompleted = React.useCallback(async () => {
    const todosCollectionRef = collection(db, "todos");
    const batch = writeBatch(db);
    const q = query(todosCollectionRef, where("checked", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }, []);

  const allDone = React.useCallback(async () => {
    const todosCollectionRef = collection(db, "todos");
    const batch = writeBatch(db);
    const q = query(todosCollectionRef, where("checked", "==", false));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, { checked: true });
    });
    await batch.commit();
    // todos
    //   .filter((todo) => !todo.checked)
    //   .forEach((todo) => {
    //     const todoDoc = doc(db, "todos", todo.id);

    //     batch.update(todoDoc, { checked: true });
    //   });

    // setTodos(todos.map(x => ({...x, checked: true})));
  }, []);

  const onEdit = React.useCallback(async (id, text) => {
    const todoDoc = doc(db, "todos", id);
    await updateDoc(todoDoc, { text });
  }, []);

  React.useEffect(() => {
    const todosCollectionRef = collection(db, "todos");

    const unsub = onSnapshot(todosCollectionRef, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => {
      unsub();
    };
  }, []);

  React.useEffect(() => {
    setFilteredTodos(
      todos.filter((x) => {
        if (pathname === "/active") {
          return !x.checked;
        } else if (pathname === "/completed") {
          return x.checked;
        } else {
          return true;
        }
      })
    );
  }, [todos, pathname]);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <div className="w-2/6">
        <h1
          style={{
            fontSize: "100px",
            color: "rgba(175, 47, 47, 0.15)",
            textAlign: "center",
          }}
        >
          Todos
        </h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-6 py-0 sm:px-0">
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <Header
                allDone={allDone}
                onChangeText={onChangeText}
                onKeyPress={onKeyPress}
                text={text}
              />
            </div>

            <div className="bg-gray-50   px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6 border-t-2 border-b-2">
              {filteredTodos.map((x, i) => (
                <Todo
                  key={i}
                  id={x.id}
                  text={x.text}
                  checked={x.checked}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  onEdit={onEdit}
                  style={{
                    display: "flex",
                  }}
                />
              ))}
            </div>

            <Foter
              count={todos.filter((x) => !x.checked).length}
              pathname={pathname}
              clearCompleted={clearCompleted}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
