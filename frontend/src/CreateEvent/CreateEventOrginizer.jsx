import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const CreateEventOrginizer = () => {
  const [title, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const { userData } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      date,
      location,
      description,
      organizator_id: parseInt(userData?.table_id),
    };
    axios
      .post("http://localhost:8888/comp/index.php", data)
      .then((response) => {
        console.log(response.data);
        toast.success("Змагання успішно створене!");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  console.log(parseInt(userData?.table_id));
  return (
    <div className="container">
      <div className="form__create-event">
        <form onSubmit={handleSubmit}>
          <h2>Створити змагання</h2>
          <input
            type="text"
            placeholder="Введіть назву"
            required
            value={title}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Виберіть дату"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Вкажіть локацію"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Додайте опис для тренерів клубів﻿"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit">Підтвердити публікацію</button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default CreateEventOrginizer;
