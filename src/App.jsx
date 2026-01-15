import { BrowserRouter, Routes, Route } from "react-router-dom";
import { JoinPage } from "./pages/JoinPage";
import { Create } from "./pages/create";
import { Login } from "./pages/login";
import { Header } from "./components/header";
import { BoardList } from "./pages/boardlist";
import { BoardDetails } from "./pages/BoardDetails";


function App() {
  return (
    <div>
     
    <BrowserRouter>
     <Header/>
      <Routes>
        <Route path="/" element={<h1>掲示板ホームページ</h1>} />
        <Route path="/join" element={<JoinPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/create" element={<Create/>} />
        <Route path="/boards" element={<BoardList/>} />
        <Route path="/boards/:boardId" element={<BoardDetails/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;