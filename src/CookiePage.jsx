import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const VITE_BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;



export function CookiePage() {

  const navigate = useNavigate();

  //페이지 접근시 실행 백엔드에서 리디렉션으로 여기로 보낼때 실행

  useEffect(() => {

    const cookieToBody = async () => {

      try {
        const res = await axios.post(`${VITE_BACKEND_API_BASE_URL/jwt/exchange}`,
          {},
        { withCredentials: true }          
        );
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        alert("exchange success");
        navigate("/");
       
    
      }catch (error) {
        alert("Error exchanging tokens");
        console.error("Error exchanging tokens:", error);
        navigate("/login");
      }
    };
    cookieToBody();
    
  },[navigate]);



  return (
    <div>
      <h1>Cookie Page</h1>
    </div>
  );
}