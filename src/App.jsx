import { BrowserRouter, Routes, Route } from "react-router-dom";
import { JoinPage } from "./pages/JoinPage";
import { Create } from "./pages/board/create.jsx";
import { Login } from "./pages/Login";
import { Header } from "./components/header";
import { BoardList } from "./pages/board/boardlist.jsx";
import { BoardDetails } from "./pages/board/BoardDetails.jsx";
import { BoardUpdate } from "./pages/board/BoardUpdate.jsx";
import { CookiePage } from "./pages/CookiePage.jsx";
import { SearchBoard } from "./pages/board/SearchBoard.jsx";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/boards" element={<BoardList />} />
        <Route path="/cookiepage" element={<CookiePage />} />
        <Route path="/boards/:boardId" element={<BoardDetails />} />
        <Route path="/boards/update/:boardId" element={<BoardUpdate />} />
        <Route path ="/search" element={<SearchBoard />} />
        <Route path="/" element={<h1>掲示板ホームページ</h1>} />
        
      </Routes>
    </div>
  );
}

export default App;
