import { useState, useEffect } from "react";

function App() {
  const [lists, setLists] = useState(() => {
  const saved = localStorage.getItem("todoLists");
  return saved
    ? JSON.parse(saved)
    : [{ id: 1, name: "List 1", tasks: [] }];
});

const [activeListId, setActiveListId] = useState(() => {
  const saved = localStorage.getItem("activeListId");
  return saved ? Number(saved) : 1;
});

  const [input, setInput] = useState("");

  useEffect(() => {
  localStorage.setItem("todoLists", JSON.stringify(lists));
  localStorage.setItem("activeListId", activeListId);
}, [lists, activeListId]);

  const activeList = lists.find(l => l.id === activeListId);

  const addNewList = () => {
    const newId = lists.length + 1;
    setLists([
      ...lists,
      { id: newId, name: `List ${newId}`, tasks: [] }
    ]);
    setActiveListId(newId);
    setInput("");
  };

  const addTask = () => {
    if (input.trim() === "") return;

    setLists(
      lists.map(list =>
        list.id === activeListId
          ? {
              ...list,
              tasks: [...list.tasks, { text: input, done: false }]
            }
          : list
      )
    );
    setInput("");
  };

  const toggleTask = (index) => {
    setLists(
      lists.map(list =>
        list.id === activeListId
          ? {
              ...list,
              tasks: list.tasks.map((task, i) =>
                i === index ? { ...task, done: !task.done } : task
              )
            }
          : list
      )
    );
  };
  const deleteTask = (index) => {
  setLists(
    lists.map(list =>
      list.id === activeListId
        ? {
            ...list,
            tasks: list.tasks.filter((_, i) => i !== index)
          }
        : list
    )
  );
};

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h1>To-Do Lists</h1>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {lists.map(list => (
          <button
            key={list.id}
            onClick={() => setActiveListId(list.id)}
            style={{
              fontWeight: list.id === activeListId ? "bold" : "normal"
            }}
          >
            {list.name}
          </button>
        ))}
        <button onClick={addNewList}>+ New List</button>
      </div>

      {/* Task input */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={addTask}>Add</button>

      {/* Task list */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {activeList.tasks.map((task, index) => (
  <li
    key={index}
    style={{
      marginTop: "10px",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }}
  >
    <input
      type="checkbox"
      checked={task.done}
      onChange={() => toggleTask(index)}
    />

    <span
      style={{
        flex: 1,
        textDecoration: task.done ? "line-through" : "none"
      }}
    >
      {task.text}
    </span>

    <button onClick={() => deleteTask(index)}>❌</button>
  </li>
))}
      </ul>
    </div>
  );
}

export default App;
