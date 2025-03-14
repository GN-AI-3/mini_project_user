import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Result from "./pages/Result";
import DrawingApp from "./pages/DrawingApp";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/draw" element={<DrawingApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
