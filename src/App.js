import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Accordion from "./components/accordion";
import Home from "./components/home";
import Test from "./components/navbar";
import PracticeNav from "./components/pracrise-nav/practice-nav";
import Select from "./components/select";

const options = [
  {
    label: "Strict Black",
    value: "strict-black",
  },
  {
    label: "Heavenly Green",
    value: "heavenly-green",
  },
  {
    label: "Sweet Pink",
    value: "pink",
  },
];

function App() {
  const onOptionSelected = (option, optionIndex) => {
    console.log({ option, optionIndex });
  };
  return (
    <div className="px-20 mt-10">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accordion" element={<Accordion />} />
          <Route
            path="/select"
            element={
              <Select options={options} onOptionSelected={onOptionSelected} />
            }
          />
          <Route path="/navbar" element={<Test />} />
          <Route path="/practice-navbar" element={<PracticeNav />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
