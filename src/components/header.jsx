import "./header.css";
import { Link } from "react-router-dom";

export function Header() {
  return (


    <nav className="header">
      <Link to="/" className="nav-link">ホーム</Link> 
      <Link to="/join" className="nav-link">会員登録</Link> 
      <Link to="/login" className="nav-link">ログイン</Link> 
      <Link to="/create" className="nav-link">掲示板作成</Link>
      <Link to="/boards" className="nav-link">掲示板一覧</Link>

      </nav>
   
  );
} 