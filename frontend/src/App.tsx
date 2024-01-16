import "./App.css";
import Header from "./components/header";
import Content from "./components/content";
import Footer from "./components/footer";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";

function App() {
  return (
    <>
      <Header></Header>
      <Content>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/verify" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Content>
      <Footer></Footer> 
    </>
  );
}

export default App;
