import React, { memo } from "react";
function Todo(props) {
  const ref = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  function onBlur(id) {
    setEdit(false);
    props.onEdit(id, ref.current.value);
  }

  function onKeyPress(id) {
    return (e) => {
      if (e.key === "Enter") {
        setEdit(false);
        props.onEdit(id, ref.current.value);
      }
    };
  }

  React.useEffect(() => {
    if (edit) {
      ref.current.focus();
    }
  }, [edit]);

  if (edit) {
    return (
      <div>
        <input
          type="text"
          className="w-full"
          defaultValue={props.text}
          ref={ref}
          onBlur={() => onBlur(props.id)}
          onKeyPress={onKeyPress(props.id)}
        />
      </div>
    );
  }

  return (
    <div
      className="flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onDoubleClick={() => setEdit(true)}
    >
      <div className="flex flex-1 items-center mt-2 ">
        <input
          type="checkbox"
          checked={props.checked}
          onChange={() => props.toggleTodo(props.id, props.checked)}
          className="mr-5"
        />

        <p
          style={{
            textDecoration: props.checked ? "line-through" : "none",
          }}
        >
          {props.text}
        </p>
      </div>
      {show && <button onClick={() => props.deleteTodo(props.id)}>X</button>}
    </div>
  );
}
export default memo(Todo);
