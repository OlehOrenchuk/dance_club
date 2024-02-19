import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Organizer from "./Organizer";
import Coach from "./Coach";

export default function Register() {
  const [selectedOption, setSelectedOption] = useState("");
  const [displayComponent, setDisplayComponent] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption === "org") {
      setDisplayComponent(<Organizer email={email} password={password} />);
    } else if (selectedOption === "coach") {
      setDisplayComponent(<Coach email={email} password={password} />);
    } else {
      alert("Please select an option");
    }
  };

  return (
    <div className="login-form container">
      {!displayComponent ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="radio-btn">
            <input
              type="radio"
              name="wh"
              value="org"
              onChange={handleOptionChange}
            />
            <span>Організатор змагань</span>
          </div>
          <div className="radio-btn">
            <input
              type="radio"
              name="wh"
              value="coach"
              onChange={handleOptionChange}
            />
            <span>Тренер клубу</span>
          </div>
          <button type="submit">Далі</button>
        </form>
      ) : null}
      {displayComponent && (
        <div className="component-container">{displayComponent}</div>
      )}
      <div className="login-form__bottom-text">
        <p>Вже маєте акаунт?</p>
        <NavLink to="/login">Увійти</NavLink>
      </div>
    </div>
  );
}
