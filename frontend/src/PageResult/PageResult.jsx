import React, { useState } from "react";
import TableTemplate from "../UI/TableTemplate";
import axios from "axios";
const PageResult = ({ title }) => {
  const [showTableResult, setShowTableResult] = useState(false);
  const [filteredData, setFilteredData] = useState();
  const [ageGroup, setAgeGroup] = useState("");
  const [classGroup, setClassGroup] = useState("");
  const [data1, setData1] = useState([]);

  const handleAgeGroupChange = (event) => {
    setAgeGroup(event.target.value);
  };

  const handleClassGroupChange = (event) => {
    setClassGroup(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowTableResult(true);

    try {
      const response = await axios.get(
        `http://localhost:8888/comp_result/index.php`
      );

      // console.log(response.data);
      setData1(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCouples = data1.filter(
    (couple) =>
      couple.competition_title === title &&
      couple.couple_class === classGroup &&
      couple.couple_age_category === ageGroup
  );
  const newCouples = filteredCouples.map((couple) => {
    return {
      couples_number: couple.couples_number,
      win_place: couple.win_place,
      partner1_name: couple.partner1_name,
      partner2_name: couple.partner2_name,
      city: couple.city,
      club_name: couple.club_name,
      coach_full_name: couple.coach_full_name,
    };
  });
  return (
    <div>
      <div className="result-page">
        {/* <h2>Результати</h2> */}
        {/* <p className="result-page__sub-title">Lviv Winter Cup 2022</p> */}
        {showTableResult ? (
          <TableTemplate
            data={newCouples}
            headers={[
              "Результати",
              "Номер",
              "Місце",
              "Партнер 1",
              "Парнер 2",
              "Місто",
              "Клуб",
              "Тренер",
            ]}
            links={false}
          />
        ) : (
          <form className="result-page__form" onSubmit={handleSubmit}>
            <div className="form-block">
              <div className="block">
                <p className="block__title">Виберіть вікову класифікацію</p>
                <div className="radio-btn">
                  <input
                    type="radio"
                    name="wh"
                    value="Діти"
                    onChange={handleAgeGroupChange}
                  />
                  <span>Діти</span>
                </div>
                <div className="radio-btn">
                  <input
                    type="radio"
                    name="wh"
                    value="Ювенали 1"
                    onChange={handleAgeGroupChange}
                  />
                  <span>Ювенали 1</span>
                </div>
                <div className="radio-btn">
                  <input
                    type="radio"
                    name="wh"
                    value="Ювенали 2"
                    onChange={handleAgeGroupChange}
                  />
                  <span>Ювенали 2</span>
                </div>
                <div className="radio-btn">
                  <input
                    type="radio"
                    name="wh"
                    value="Юніори "
                    onChange={handleAgeGroupChange}
                  />
                  <span>Юніори 1</span>
                </div>
                <div className="radio-btn">
                  <input
                    type="radio"
                    name="wh"
                    value="Юніори 2"
                    onChange={handleAgeGroupChange}
                  />
                  <span>Юніори 2</span>
                </div>
                <div className="radio-btn">
                  <input
                    type="radio"
                    name="wh"
                    value="Молодь"
                    onChange={handleAgeGroupChange}
                  />
                  <span>Молодь</span>
                </div>
                <div className="radio-btn">
                  <input
                    type="radio"
                    name="wh"
                    value="Дорослі"
                    onChange={handleAgeGroupChange}
                  />
                  <span>Дорослі</span>
                </div>
              </div>
              <div className="block">
                <p className="block__title">Виберіть клас</p>
                <div className="radio-btn">
                  <input
                    type="radio"
                    name="wh2"
                    value="Hobby"
                    onChange={handleClassGroupChange}
                  />
                  <span>Hobby</span>
                </div>
                <div className="radio-btn">
                  <input
                    type="radio"
                    name="wh2"
                    value="E"
                    onChange={handleClassGroupChange}
                  />
                  <span>E</span>
                </div>
                <div className="radio-btn">
                  <input
                    type="radio"
                    name="wh2"
                    value="D"
                    onChange={handleClassGroupChange}
                  />
                  <span>D</span>
                </div>
                <div className="radio-btn">
                  <input
                    type="radio"
                    name="wh2"
                    value="C"
                    onChange={handleClassGroupChange}
                  />
                  <span>C</span>
                </div>
                <div className="radio-btn">
                  <input
                    type="radio"
                    name="wh2"
                    value="B"
                    onChange={handleClassGroupChange}
                  />
                  <span>B</span>
                </div>
              </div>
            </div>
            <button>Знайти</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PageResult;
