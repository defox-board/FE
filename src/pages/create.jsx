import React from 'react'
import { useState } from 'react'
const VITE_BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;  


export function Create() {
  
  
  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState('');


  const handleCreateBoard = async (e) => {
    e.preventDefault();

  try {
      console.log(localStorage.getItem("accessToken"));
    const res = await fetch(`${VITE_BACKEND_API_BASE_URL}/board`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
                 Authorization : `Bearer ${localStorage.getItem("accessToken")}`
      },
      credentials: "include",
      body: JSON.stringify({ title, content }),
    });
    if(res.ok) {
      window.alert("掲示板の作成に成功しました！");
       } else {    
      const errorData = await res.json();
      console.error(errorData);
      window.alert(`掲示板の作成に失敗しました: ${errorData.message}`);
    }
   
  } catch (error) {
    console.error("エラーが発生しました:", error);
    window.alert("エラーが発生しました。後でもう一度お試しください。");
  } 

   }
  
  return (
    <div>掲示板作成ページ

      <form onSubmit={handleCreateBoard}>

      <label>タイトル</label>
      <input
      type ="text"
      value= {title}
      onChange = {(e) => setTitle(e.target.value)}
      required
      />
     
     <br/>
     <br/>

        <label>内容</label>
      <textarea
      type ="textArea"
      value= {content}
      onChange = {(e) => setContent(e.target.value)}
      required
      rows={6}
      cols={50}
      />

     <button type="submit">作成</button>
      </form>
    </div>
  )
}
