import { a } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome</h1>
      <p>This is the home page.</p>

      <Link to="/todo">
        <button>Open To-Do List</button>
      </Link>
    </div>
  );
}

export default Home;