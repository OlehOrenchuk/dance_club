import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
export default function Header() {
  const { isLoggedIn, userData, handleLogout } = useAuth();

  return (
    <header>
      <div className="wrap-header container">
        <div className="header__logo">
          <NavLink to="/">
            <h2>LOGO</h2>
          </NavLink>
        </div>
        <div className="header__menu">
          <NavLink className="" to="/">
            Головна сторінка
          </NavLink>
          <NavLink to="/dance-club?id=1">Танцювальні клуби</NavLink>
          <NavLink to="/dance-club?id=2">Змагання</NavLink>
          {/* <NavLink to="/dancers">Танцівники</NavLink> */}
          {!isLoggedIn ? (
            <NavLink to="/login">Увійти</NavLink>
          ) : (
            <NavLink onClick={handleLogout}>Вийти</NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
