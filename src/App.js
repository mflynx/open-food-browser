import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ResultsView from "./pages/ResultsView";
import DetailsView from "./pages/DetailsView";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search/:searchTerm/page=:page" element={<ResultsView />} />
          <Route path="product/:id" element={<DetailsView />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
