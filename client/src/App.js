import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Nav from './pages/Nav';
import Home from './pages/Home';
import Loyalty from "./pages/Loyalty";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/loyalty" element={<Loyalty/>}/>
      </Routes>
    </Router>
  );
} 

export default App;
