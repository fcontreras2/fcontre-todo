export const Actions = () => {
  return (
    <div className="todo__actions">
      <div>
        <button className="active">All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
      <button>Clear completed</button>
    </div>
  );
};

export default Actions;
