import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Searchh from "./components/Searchh";
import Random from "./components/Random";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/random" element={<Random />} />
          <Route path="/" element={<Searchh />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
