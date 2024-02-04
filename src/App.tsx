import "./App.scss";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { About, Home, Interview, NotFound, Offer, Start } from "./pages";
import { AppWrapper } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/start" element={<Start />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
