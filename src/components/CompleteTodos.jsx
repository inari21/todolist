export const CompleteTodos = (props) => {
  const { Todos, onClickBack } = props;
  return (
    <div className="complete-area">
      <p className="title">完了済のTODO</p>
      <ul>
        {Todos.map((todo, index) => (
          <li key={todo}>
            <div className="list-row">
              <p className="todo-item">{todo}</p>
              <button onClick={() => onClickBack(index)}>戻す</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
