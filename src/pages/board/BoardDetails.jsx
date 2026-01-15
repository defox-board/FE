import React, { use, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const ViTE_BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;
export function BoardDetails() {
  const [boardDetails, setBoardDetails] = useState(null);
  const { boardId } = useParams();

  useEffect(() => {
    axios
      .get(`${ViTE_BACKEND_API_BASE_URL}/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setBoardDetails(response.data);
      });
  }, []);
  return (
    <div>
      <h1>Board Details Page</h1>
      <p>Board ID: {boardId}</p>

      {boardDetails ? (
        <div>
          <h2>{boardDetails.title}</h2>
          <p>{boardDetails.content}</p>
          <p>作者: {boardDetails.username}</p>
          <p>投稿日時: {boardDetails.createdAt}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <form type="submit">
        <input type="text" placeholder="コメントを入力してください" />
        <button type="submit">コメント投稿</button>
      </form>
    </div>
  );
}
