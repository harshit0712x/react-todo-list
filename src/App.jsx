import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Todo from "./Todo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
