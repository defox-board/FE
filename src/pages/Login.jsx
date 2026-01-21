import React from "react";
import { useState } from "react";
import { data } from "react-router-dom";

const VITE_BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //자체 로그인
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${VITE_BACKEND_API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        window.alert("ログインに成功しました！");
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      } else {
        const errorData = await res.json();
        window.alert(`ログインに失敗しました: ${errorData.message}`);
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
      window.alert("エラーが発生しました。後でもう一度お試しください。");
    }
  };

  //소셜 로그인
  const handleSoicalLogin = (provider) => {
    window.location.href = `${VITE_BACKEND_API_BASE_URL}/oauth2/authorization/${provider}`;
  };

  return (
    <div>
      ログイン
      <form onSubmit={handleLogin}>
        <label>
          ユーザー名:
          <input
            type="text"
            placeholder="ユーザー名を入力してください"
            required
            minLength={4}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label>
          パスワード:
          <input
            type="password"
            placeholder="パスワードを入力してください"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={4}
          />
        </label>

        <button type="submit">ログイン</button>

        <div>
          <button onClick={() => handleSoicalLogin("naver")}>
            NAVER Login
          </button>
          <button>GOOGLE Login</button>
        </div>
      </form>
    </div>
  );
}
