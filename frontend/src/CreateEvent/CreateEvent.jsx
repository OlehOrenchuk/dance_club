import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const CreateEvent = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [category, setCategory] = useState("");
  const [classValue, setClassValue] = useState("");

  const { userData } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      first_name: name,
      second_name: surname,
      age_category: category,
      class: classValue,
      coach_id: userData?.coach_id,
    };
    axios
      .post("http://localhost:8888/dancer/create.php", data)
      .then((response) => {
        console.log(response.data);
        toast.success("Танцівник доданий успішно!");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="container">
      <div className="form__create-event">
        <form onSubmit={handleSubmit}>
          <h2>Створити змагання</h2>
          <input
            type="text"
            placeholder="Ім'я"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Прізвище"
            required
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Категорія"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Клас"
            required
            value={classValue}
            onChange={(e) => setClassValue(e.target.value)}
          />

          <button type="submit">Підтвердити публікацію</button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default CreateEvent;
