import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/UI/Navbar";
import Home from "./screens/Home";
import Write from "./screens/Write";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import Success from "./screens/Success/Success";
import ArticleDetails from "./screens/ArticleDetails";
import AuthContext from "./context/auth-context";
import { useContext } from "react";

function App() {
  const context = useContext(AuthContext);

  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/write"
            element={context.isLoggedin ? <Write /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:articleId" element={<ArticleDetails />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
