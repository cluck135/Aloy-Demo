import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Nav from './components/Nav';
import Home from './pages/Home';
import Loyalty from "./pages/Loyalty";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route element={<ProtectedRoutes />}>
          <Route path="/loyalty" element={<Loyalty/>}/>
        </Route>
      </Routes>
    </Router>
  );
} 

export default App;
