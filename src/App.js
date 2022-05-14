import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Accordion from "./components/accordion";
import Home from "./components/home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accordion" element={<Accordion />} />
      </Routes>
    </Router>
  );
}

export default App;
