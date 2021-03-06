import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
import Home from './pages/Home';
import Loyalty from "./pages/Loyalty";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>

  );
} 

export default App;
