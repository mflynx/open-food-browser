import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ResultsView from "./pages/ResultsView";
import DetailsView from "./pages/DetailsView";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search/:searchTerm" element={<ResultsView />} />
          <Route path="product/:id" element={<DetailsView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
