import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import React from "react";
const VITE_BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export function BoardUpdate() {
  const { boardId } = useParams();
  const [boardDetails, setBoardDetails] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //최초 데이터 불러오기
  useEffect(() => {
    axios
      .get(`${VITE_BACKEND_API_BASE_URL}/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        const data = response.data;

        setBoardDetails(data);
        setTitle(data.title);
        setContent(data.content);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //업데이트 로직

  const handleUpdateBoard = async (e) => {
    e.preventDefault();
    const id = boardId;

    axios
      .put(
        `${VITE_BACKEND_API_BASE_URL}/boards/${boardId}`,
        { id, title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log("Board updated successfully:", response.data);
        alert("게시글이 수정되었습니다.");
        window.location.href = `/boards/${boardId}`;
      })
      .catch((err) => {
        console.error("Error updating board:", err);
        alert("게시글 수정에 실패했습니다.");
      });
  };

  return (
    <div>
      <h1>Board Update Page</h1>

      <p>Board ID: {boardId}</p>
      <form onSubmit={handleUpdateBoard}>
        <label>title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <label>content</label>

        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">修正</button>
      </form>
    </div>
  );
}
