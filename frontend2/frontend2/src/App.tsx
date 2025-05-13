import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import PersonalizedGoalsLayout from "./layouts/PersonalizedGoalsLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<PersonalizedGoalsLayout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
