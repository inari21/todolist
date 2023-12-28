import { useState } from "react";

export const IncompleteTodos = (props) => {
  const {
    Todos,
    onClickComplete,
    onClickDelete,
    priorityValues,
    handlePriorityChange,
  } = props;

  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {Todos.map((todo, index) => (
          <li key={todo}>
            <div className="list-row">
              <p style={{ color: "blue" }}>{priorityValues[index]}</p>
              <p className="todo-item">{todo}</p>
              <button onClick={() => onClickComplete(index)}>完了</button>
              <button onClick={() => onClickDelete(index)}>削除</button>
              <select
                onChange={(event) =>
                  handlePriorityChange(index, event.target.value)
                }
              >
                <option value="">優先度</option>
                <option value="!!!">高</option>
                <option value="!!">中</option>
                <option value="!">低</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
