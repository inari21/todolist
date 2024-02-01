import { useState } from "react";

export const IncompleteTodos = (props) => {
  const {
    Todos,
    onClickComplete,
    onClickDelete,
    // priorityValues,
    handlePriorityChange,
    openModal,
  } = props;

  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {Todos.map((todo, index) => (
          <li key={index}>
            <div className="list-row">
              <p style={{ color: "blue" }}>{todo.priority}</p>
              <p className="todo-item">{todo.text}</p>
              <button onClick={() => onClickComplete(index)}>完了</button>
              <button onClick={() => onClickDelete(index)}>削除</button>
              <select
                className="dropdown"
                value={todo.priority}
                onChange={(event) =>
                  handlePriorityChange(index, event.target.value)
                }
              >
                <option value="">優先度</option>
                <option value="!!!">高</option>
                <option value="!!">中</option>
                <option value="!">低</option>
              </select>
              <button onClick={() => openModal(index)}>メモ</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
