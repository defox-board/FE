import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ViTE_BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export function BoardDetails() {
  const [boardDetails, setBoardDetails] = useState(null);
  const { boardId } = useParams();
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [nextCursor, setNextCursor] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  //최초 랜더링(게시판)
  useEffect(() => {
    if (!boardId) return;
    axios
      .get(`${ViTE_BACKEND_API_BASE_URL}/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setBoardDetails(response.data);
      });
  }, [boardId]);
  //댓글 불러오기
  const fetchComments = async () => {
    if (!boardId || loading || !hasNext) return;
    setLoading(true);

    const response = await axios.get(
      `${ViTE_BACKEND_API_BASE_URL}/comment/${boardId}`,
      {
        params: { cursor: nextCursor, limit: 3 },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      },
    );

    setComments((prev) => {
      const map = new Map(prev.map((c) => [c.id, c]));
      response.data.data.forEach((c) => map.set(c.id, c));
      return Array.from(map.values());
    });

    setNextCursor(response.data.nextCursor);
    setHasNext(response.data.hasNext);
    setLoading(false);
  };
  //게시판 아이디바뀔때 댓글 재조회
  useEffect(() => {
    fetchComments();
  }, [boardId]);
  //댓글 저장
  const fetchSaveComment = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${ViTE_BACKEND_API_BASE_URL}/comment`,
        {
          boardId,
          content: commentInput,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      alert("コメントが投稿されました！");
      setCommentInput("");

      setComments([]);
      setNextCursor(null);
      setHasNext(true);

      fetchComments();
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  // 무한 스크롤 트리거
  useEffect(() => {
    if (!bottomRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchComments();
        }
      },
      { threshold: 1 },
    );

    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [bottomRef.current, hasNext, loading]);

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

      <form onSubmit={fetchSaveComment}>
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="コメントを入力してください"
        />
        <button type="submit">コメント投稿</button>
      </form>

      <h3>コメント一覧</h3>

      <div>
        {/* 댓글 목록 */}
        {comments.map((c) => (
          <div
            key={c.id}
            style={{
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <div style={{ fontWeight: "bold" }}>{c.username}</div>
            <div>{c.content}</div>
            <div>{c.createdAt}</div>
          </div>
        ))}

        {/* 로딩 표시 */}
        {loading && <p>로딩중...</p>}

        {/* 무한스크롤 트리거 */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
