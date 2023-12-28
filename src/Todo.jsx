import { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export function Todo() {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncomplateTodos] = useState([]);
  const [completeTodos, setComplateTodos] = useState([]);
  const [priorityValues, setPriorityValues] = useState(
    Array(incompleteTodos.length).fill("")
  );

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncomplateTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncomplateTodos(newTodos);
    const newPriorityValues = [...priorityValues];
    newPriorityValues.splice(index, 1);
    setPriorityValues(newPriorityValues);
  };

  const onClickComplete = (index) => {
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setComplateTodos(newCompleteTodos);
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    setIncomplateTodos(newIncompleteTodos);
    const newPriorityValues = [...priorityValues];
    newPriorityValues.splice(index, 1);
    setPriorityValues(newPriorityValues);
  };

  const onClickBack = (index) => {
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setComplateTodos(newCompleteTodos);
    setIncomplateTodos(newIncompleteTodos);
  };

  const isMaxLimitIncompleteTocos = incompleteTodos.length >= 5;

  const handlePriorityChange = (index, value) => {
    const newPriorityValues = [...priorityValues];
    newPriorityValues[index] = value;
    setPriorityValues(newPriorityValues);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={isMaxLimitIncompleteTocos}
      />
      {isMaxLimitIncompleteTocos && (
        <p style={{ color: "red" }}>
          追加出来るTODOは5個までです。消化してください。
        </p>
      )}

      <IncompleteTodos
        Todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
        priorityValues={priorityValues}
        handlePriorityChange={handlePriorityChange}
      />
      <CompleteTodos Todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
}
