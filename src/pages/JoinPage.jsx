import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

const VITE_BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export function JoinPage() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [nickname, setNickname] = useState(''); 
  const [error, setError] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(null);

  useEffect(() => {

    const checkUsername = async () => {
      if (username.length < 4) {
        setIsUsernameValid(null);
        return;
      }

      try {

        const res = await fetch(`${VITE_BACKEND_API_BASE_URL}/user/exist`, {


          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ username }),
        });

        const exists = await res.json();
        setIsUsernameValid(!exists);
    } catch {
        setIsUsernameValid(null);
    }
  };

  const delay = setTimeout(checkUsername, 300);
  return () => clearTimeout(delay);

  }, [username]);


  const handleSignUp = async (e) => {
    e.preventDefault();
  
    if(
username.length < 4 ||
password.length < 4 
    )
{
 setError("ユーザー名とパスワードは4文字以上で入力してください");
 return;
}
  
  try {

    const res = await fetch(`${VITE_BACKEND_API_BASE_URL}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      credentials: "include",
      body: JSON.stringify({username, password, email, nickname}),
    });
    if (!res.ok) {
     
      const data = await res.json();
      throw new Error(data.message || "登録に失敗しました");
    }
    navigate("/login");
  } catch {

    setError("登録に失敗しました。再度お試しください。");
  }
  };
  

  return (
  
  <div>

  <h1>会員登録</h1>


   <form onSubmit={handleSignUp}>
  <label>
    ユーザー名:
    <input 
     type="text"
     value={username}
     onChange={(e) => setUsername(e.target.value)}
      placeholder='ユーザー名を入力してください'
      required
      minLength={4}
     />
     {username.length >= 4 && isUsernameValid === false && (
      <p>ユーザー名が既に使用されています</p>
      )}
      {username.length >= 4 && isUsernameValid === true && (
      <p>使用可能なユーザー名です</p>
      )}
  </label>
  <br />

  <label>
    パスワード:
    <input 
    type="password" 
    placeholder='パスワードを入力してください'
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    minLength={4}
      />
  </label>
  
  <br />

  <label>
    メールアドレス:
    <input type="email"
    placeholder='メールアドレスを入力してください'
    value={email}
    onChange={(e) => setEmail(e.target.value)}  
    />
  </label>
  <br />  

  <label>
    ニックネーム:
    <input type="text" 
     value={nickname}
     onChange={(e) => setNickname(e.target.value)}
    />
  </label>
  <br />


  <button type="submit" disabled={isUsernameValid !== true}>登録</button> 

    </form> 

  </div>
  )
}