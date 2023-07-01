import { Route, Routes } from "react-router-dom"
import Navbar  from './components/UI/Navbar';
import Home from "./screens/Home";
import Write from "./screens/Write";
import Login from "./screens/Login";
import Signup from "./screens/Signup"
import ArticleDetails from "./screens/ArticleDetails";
import './App.css';


function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/write" element={<Write />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/:articleId" element={<ArticleDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
