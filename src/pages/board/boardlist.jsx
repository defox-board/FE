import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const VITE_BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export function BoardList() {
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios
      .get(`${VITE_BACKEND_API_BASE_URL}/boards`, {
        params: {
          page: page,
          size: 3,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setBoards(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response data:", error.response.data);
        }
        console.error("Error fetching boards:", error);
      });
  }, [page]);

  //게시판 삭제 핸들러
  const handleDeleteBoard = async (boardId) => {
    try {
      const res = await axios.delete(
        `${VITE_BACKEND_API_BASE_URL}/boards/${boardId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (res.status === 200) {
        // 삭제 성공 시, 해당 게시글을 boards 배열에서 제거
        alert("掲示板の削除に成功しました！");
        setBoards(boards.filter((board) => board.id !== boardId));
      }
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  return (
    <div>
      <h1>掲示板一覧ページ</h1>

      <ul>
        {boards.map((board) => (
          <li key={board.id}>
            <Link to={`/boards/${board.id}`}>
              <h2>{board.title}</h2>
            </Link>
            <button onClick={() => handleDeleteBoard(board.id)}>削除</button>
            <Link to={`/boards/update/${board.id}`}>
              <button>修正</button>
            </Link>
          </li>
        ))}
      </ul>

      <div>
        {/* 페이지번호 */}
        <div>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i)}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
