import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login";

export const Home = () => {
  return <div>Home</div>
};


function App() {
  return(
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login/>}/>

    </Routes>
  );
}

export default App;
