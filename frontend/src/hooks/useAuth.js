import { useEffect, useState } from "react";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("user");
  };

  return { isLoggedIn, userData, handleLogout };
}
