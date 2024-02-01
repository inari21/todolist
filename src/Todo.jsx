import { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
import { Modal } from "./components/Modal";

export function Todo() {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncomplateTodos] = useState([]);
  const [completeTodos, setComplateTodos] = useState([]);
  // const [priorityValues, setPriorityValues] = useState(
  //   Array(incompleteTodos.length).fill("")
  // );
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [modalContent, setModalContent] = useState("");

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodo = { text: todoText, priority: "", memo: "" };
    const newTodos = [...incompleteTodos, newTodo];
    setIncomplateTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncomplateTodos(newTodos);
    // const newPriorityValues = [...priorityValues];
    // newPriorityValues.splice(index, 1);
    // setPriorityValues(newPriorityValues);
  };

  const onClickComplete = (index) => {
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setComplateTodos(newCompleteTodos);
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    setIncomplateTodos(newIncompleteTodos);
    // const newPriorityValues = [...priorityValues];
    // newPriorityValues.splice(index, 1);
    // setPriorityValues(newPriorityValues);
  };

  const onClickBack = (index) => {
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    const sortedIncompleteTodos = newIncompleteTodos.sort((a, b) => {
      const priorityA = a.priority;
      const priorityB = b.priority;
      if (priorityA < priorityB) return 1;
      if (priorityA > priorityB) return -1;
      return 0;
    });
    setComplateTodos(newCompleteTodos);
    setIncomplateTodos(sortedIncompleteTodos);
  };

  const isMaxLimitIncompleteTocos = incompleteTodos.length >= 5;

  const handlePriorityChange = (index, value) => {
    // const newPriorityValues = [...priorityValues];
    // newPriorityValues[index] = value;
    // setPriorityValues(newPriorityValues);
    const newIncompleteTodos = incompleteTodos
      .map((todo, i) => {
        if (i === index) {
          return { ...todo, priority: value };
        }
        return todo;
      })
      .sort((a, b) => {
        const priorityA = a.priority;
        const priorityB = b.priority;
        if (priorityA < priorityB) return 1;
        if (priorityA > priorityB) return -1;
        return 0;
      });
    setIncomplateTodos(newIncompleteTodos);
  };

  const openModal = (index) => {
    setShowModal(true);
    setEditingIndex(index);
    setModalContent(incompleteTodos[index].memo);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const newIncompleteTodos = incompleteTodos.map((todo, i) => {
      if (i === editingIndex) {
        return { ...todo, memo: modalContent };
      }
      return todo;
    });
    setIncomplateTodos(newIncompleteTodos);
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    setModalContent(event.target.value);
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
        // priorityValues={priorityValues}
        handlePriorityChange={handlePriorityChange}
        openModal={openModal}
      />
      <CompleteTodos Todos={completeTodos} onClickBack={onClickBack} />

      <Modal
        showModal={showModal}
        closeModal={closeModal}
        handleEditClick={handleEditClick}
        handleSaveClick={handleSaveClick}
        handleInputChange={handleInputChange}
        isEditing={isEditing}
        modalContent={modalContent}
      />
    </>
  );
}
