import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const RegisterUser = ({ competitionId }) => {
  const [couples, setCouples] = useState([
    { dancer_id1: "", dancer_id2: "", age_category: "", class: "" },
  ]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...couples];
    list[index][name] = value;
    setCouples(list);
  };

  const handleAddCouple = () => {
    setCouples([
      ...couples,
      { dancer_id1: "", dancer_id2: "", age_category: "", class: "" },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    couples.forEach((couple) => {
      const body = {
        dancer_id1: couple.dancer_id1,
        dancer_id2: couple.dancer_id2,
        age_category: couple.age_category,
        class: couple.class,
        competition_id: competitionId,
      };
      fetch("http://localhost:8888/comp_reg_couples/index.php", {
        method: "POST",
        body: JSON.stringify(body),
      })
        .then((response) => {
          toast.success("Учасник зареєстрований успішно!");
        })
        .catch((error) => {
          toast.erorr("Помилка");
        });
    });
  };

  return (
    <div className="container">
      <div className="reg-user">
        <h2>Зареєструвати учасників на конкурс</h2>
        <form onSubmit={handleSubmit}>
          {couples.map((couple, index) => {
            return (
              <div key={index} className="reg-user__input">
                <input
                  type="text"
                  placeholder="id Партнер 1"
                  name="dancer_id1"
                  value={couple.dancer_id1}
                  onChange={(event) => handleInputChange(event, index)}
                  required
                />
                <input
                  type="text"
                  placeholder="id Партнер 2"
                  name="dancer_id2"
                  value={couple.dancer_id2}
                  onChange={(event) => handleInputChange(event, index)}
                  required
                />
                <input
                  type="text"
                  placeholder="Категорія"
                  name="age_category"
                  value={couple.age_category}
                  onChange={(event) => handleInputChange(event, index)}
                  required
                />
                <input
                  type="text"
                  placeholder="Клас"
                  name="class"
                  value={couple.class}
                  onChange={(event) => handleInputChange(event, index)}
                  required
                />
                {index === couples.length - 1 && (
                  <button type="button" onClick={handleAddCouple}>
                    +
                  </button>
                )}
              </div>
            );
          })}
          <Toaster />
          <button type="submit">Зберегти</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
