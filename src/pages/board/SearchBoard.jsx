
import axios from 'axios';
import {useState} from 'react'
const VITE_BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export function SearchBoard() {

  


  const [search,setsearch] = useState('');
  const [boards,setboards] = useState([]);
  


  const handleSearch = async (e) => {

      e.preventDefault();

      if (!search.trim()) return;

    try{
      const res = 

      await axios.get(`${VITE_BACKEND_API_BASE_URL}/boards/findBySearchLike`,

          {
            
            params : {
              keyword : search
            },
            headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
            
          }
      );
      if(res.status == 200) {
       setboards(res.data.content);

      } else {
        console.log("検索失敗")
      }

    }
   catch(err){
    console.error("検索失敗",err)
   }

  }

  return(

    <div>
    <div>検索ページ</div>

      <form onSubmit={handleSearch}>
    <input 
    type = "text"
    placeholder='検索'
    value={search}
    onChange={(e) => setsearch(e.target.value)}
    />
    <button>検索</button>
    </form>
    
      <div>結果</div>
      <ul>
  {boards.length === 0 ? (
    <li>検索結果がありません</li>
  ) : (
    boards.map((board) => (
      <li key={board.id}>
        <div>{board.title}</div>
        <div>{board.username}</div>
        <div>{board.createdAt}</div>
      </li>
    ))
  )}
</ul>

    </div>
  )


}