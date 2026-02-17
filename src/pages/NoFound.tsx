import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NoFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
    </div>
  );
}

export default NoFound;
