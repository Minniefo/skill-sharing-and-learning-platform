import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Posts } from "./pages/posts";
const App = () => {
  return(
  <Router>
    <Routes>
      <Route path="/" element={<Posts />} />
    </Routes>
  </Router>)
}
export default App;