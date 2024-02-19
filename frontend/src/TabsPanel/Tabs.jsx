import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TableTemplate from "../UI/TableTemplate";
import "react-tabs/style/react-tabs.css"; // import the react-tabs default CSS
import PageResult from "../PageResult/PageResult";
import { NavLink, useNavigate } from "react-router-dom";
import CreateEvent from "../CreateEvent/CreateEvent";
import RegisterUser from "../RegisterUser/RegisterUser";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import CreateEventOrginizer from "../CreateEvent/CreateEventOrginizer";
import { useLocation } from "react-router-dom";

const customStyles = {
  // add custom styles for tabs
  tabList: {
    display: "flex",
    justifyContent: "center",
    margin: 0,
    padding: 0,
  },
  tab: {
    padding: "10px 20px",
    marginRight: "15px",
    cursor: "pointer",
    fontWeight: 600,
  },
};

function downloadCSV(data, title) {
  const filterDownloaded = data.filter((el) => el.competition_title === title);

  console.log(data, filterDownloaded);
  const csv = filterDownloaded
    .map((item) => Object.values(item).join(","))
    .join("\n");

  const anchor = document.createElement("a");
  const blob = new Blob([csv], { type: "text/csv" });
  anchor.href = URL.createObjectURL(blob);
  anchor.download = "data.csv";

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

const TabsPanel = (props) => {
  const { isLoggedIn, userData } = useAuth();
  const [id, setId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const competitionId = searchParams.get("id");
    setId(competitionId);
  }, [location]);

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [title, setTitle] = useState();

  const [displayResult, setShowResult] = useState(true);
  const [showDancingClub, setShowDancingClub] = useState(false);
  const [competitionId, setCompetitionId] = useState();

  const handleGetDancingData = async () => {
    try {
      const response = await axios.get("http://localhost:8888/club/index.php");

      setData(response.data.message ? [{ error: "No data" }] : response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const closeTab = () => {
    setShowResult(true);
    setShowDancingClub(false);
  };

  const handleShowResult = (title) => {
    setTitle(title);
    console.log(title);
    setShowResult(false);
  };

  const handle1 = async (id) => {
    setShowResult(false);

    setShowDancingClub(true);
    try {
      const response = await axios.get(
        `http://localhost:8888/dancer/get_by_club.php?title=${id}`
      );
      console.log(response.data);
      setData(response.data.message ? [{ error: "No data" }] : response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchFutureData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/comp_result/index.php`
      );

      setData1(response.data.message ? [{ error: "No data" }] : response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const removeNumbers = data && data.map(({ id, coach_id, ...rest }) => rest);

  const futureEvents = data1.filter((obj) => obj.win_place === null);
  const pastEvents = data1.filter((obj) => obj.win_place !== null);

  const uniqueArr = futureEvents
    .filter(
      (obj, index, self) =>
        index ===
        self.findIndex((t) => t.competition_title === obj.competition_title)
    )
    .map(
      ({
        competition_title,
        competition_date,
        competition_location,
        competition_description,
      }) => ({
        competition_title,
        competition_date,
        competition_location,
        competition_description,
      })
    );

  const uniqueEvents = pastEvents
    .filter(
      (obj, index, self) =>
        index ===
        self.findIndex((t) => t.competition_title === obj.competition_title)
    )
    .map(
      ({
        competition_title,
        competition_date,
        competition_location,
        competition_description,
      }) => ({
        competition_title,
        competition_date,
        competition_location,
        competition_description,
      })
    );

  const [selectedTab, setSelectedTab] = useState(0);
  const [showAddition, setShowAddition] = useState(false);
  const handleAddDancerClick = (n) => {
    setSelectedTab(n);
  };

  const handleFetchAllDancers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/dancer/get_by_coach.php?id=${userData?.coach_id}`
      );

      setData(response.data.message ? [{ error: "No data" }] : response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchAllEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/comp/index.php`);

      setData(response.data.message ? [{ error: "No data" }] : response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const now = Date.now();

  const pastEventsO = data
    .filter((event) => {
      const eventDate = Date.parse(event.date);

      return eventDate < now;
    })
    .map(({ title, date, location }) => ({
      title,
      date,
      location,
    }));

  const futureEventsO = data
    .filter((event) => {
      const eventDate = Date.parse(event.date);
      return eventDate >= now;
    })
    .map(({ title, date, location }) => ({
      title,
      date,
      location,
    }));

  useEffect(() => {
    handleFetchFutureData();

    handleGetDancingData();
  }, [id]);

  const [competitionData, setCompetitionData] = useState([]);
  const handlerDownloadCSV = async () => {
    fetch("http://localhost:8888/comp_result/index.php")
      .then((response) => response.json())
      .then((data) => {
        setCompetitionData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    handlerDownloadCSV();
  }, [title]);

  const handleGetId = (title, id) => {
    setCompetitionId(id);
    setTitle(title.title);
  };
  console.log(removeNumbers);
  return (
    <Tabs
      className="container"
      selectedIndex={selectedTab || parseInt(id)}
      onSelect={(index) => setSelectedTab(index)}
    >
      <div className="tabs-header">
        <TabList style={customStyles.tabList}>
          {[
            {
              label: "Головна сторінка",
              onClick: () => navigate("/"),
            },
            {
              label: "Танцювальні клуби",
              onClick: () => {
                closeTab();
                handleGetDancingData();
              },
            },
            {
              label: "Змагання",
              onClick: () => {
                closeTab();
                handleFetchFutureData();
              },
            },
            // {
            //   label: "Танцівники",
            //   onClick: closeTab,
            // },
            {
              label: "Створити змагання",
              onClick: closeTab,
              isVisible: userData?.role === "organizator",
            },
            {
              label: "Мої змагання",
              onClick: () => {
                closeTab();
                handleFetchAllEvents();
              },
              isVisible: userData?.role === "organizator",
            },
            {
              label: "Додати танцівника",
              onClick: () => {
                closeTab();
                setShowAddition(true);
              },
              isVisible: userData?.role === "coach",
            },
            {
              label: "Мої танцівники",
              onClick: () => {
                closeTab();
                handleFetchAllDancers();
              },
              isVisible: userData?.role === "coach",
            },
          ].map(
            ({ label, onClick, isVisible }, index) =>
              (isVisible ?? true) && (
                <Tab
                  className="selectedTab"
                  key={index}
                  index={index}
                  onClick={onClick}
                >
                  {label}
                </Tab>
              )
          )}
        </TabList>
        {!userData?.role && (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Увійти
          </button>
        )}
      </div>

      {displayResult ? (
        <>
          <TabPanel index={0}>
            <TableTemplate
              data={[
                {
                  genre: "Modern",
                  location: "Lviv",
                  instructor: "Kanata Igor",
                },
                {
                  genre: "Hip-hop",
                  location: "Kyiv",
                  instructor: "Petrenko Maria",
                },
                {
                  genre: "Jazz",
                  location: "Odessa",
                  instructor: "Sidorov Ivan",
                },
              ]}
              headers={["Dance genre"]}
            />
          </TabPanel>
          <TabPanel index={1}>
            <TableTemplate
              data={removeNumbers}
              linksTitle="Переглянути танцівників"
              headers={["Танцювальні клуби"]}
              links={true}
              onClick={handle1}
            />
          </TabPanel>
          <TabPanel index={2}>
            <Tabs>
              <TabList style={customStyles.tabList} className="inner-list">
                <Tab className="selected-mini-tab">Майбутні змагання</Tab>
                <Tab className="selected-mini-tab">Проведені змагання</Tab>
              </TabList>

              <TabPanel index={0}>
                <TableTemplate
                  data={uniqueArr}
                  links={false}
                  linksTitle="Зареєструватись"
                  links={userData?.role === "coach"}
                  onClick={() => {
                    setShowAddition(false);
                    handleAddDancerClick(4);
                  }}
                  handleShowResultIs={true}
                  handleShowResult={handleGetId}
                />
              </TabPanel>
              <TabPanel index={1}>
                <TableTemplate
                  data={uniqueEvents}
                  linksTitle="Результати"
                  onClickIs={false}
                  handleShowResult={handleShowResult}
                />
              </TabPanel>
            </Tabs>
          </TabPanel>
          {/* <TabPanel index={3}>
            <h2>Content for Tab 4</h2>
            <p>Here's some content for Tab 4.</p>
          </TabPanel> */}
          {userData?.role === "organizator" ? (
            <>
              <TabPanel index={4}>
                <CreateEventOrginizer />
              </TabPanel>
              <TabPanel index={65}>
                <Tabs>
                  <TabList style={customStyles.tabList} className="inner-list">
                    <Tab className="selected-mini-tab">Майбутні змагання</Tab>
                    <Tab className="selected-mini-tab">Проведені змагання</Tab>
                  </TabList>

                  <TabPanel index={0}>
                    <TableTemplate data={futureEventsO} links={false} />
                  </TabPanel>
                  <TabPanel index={1}>
                    <TableTemplate
                      data={pastEventsO}
                      linksTitle="Завантажити"
                      handleShowResultIs={true}
                      // onClick={handleShowResult}
                      handleShowResult={handleGetId}
                      onClick={() => {
                        downloadCSV(competitionData, title);
                      }}
                    />
                  </TabPanel>
                </Tabs>
              </TabPanel>
            </>
          ) : null}
          {userData?.role === "coach" ? (
            <>
              <TabPanel index={4}>
                {showAddition ? (
                  <CreateEvent />
                ) : (
                  <RegisterUser competitionId={competitionId} />
                )}
              </TabPanel>
              <TabPanel index={5}>
                <TableTemplate data={data} headers={["Танцівники клубу"]} />
              </TabPanel>
            </>
          ) : null}
        </>
      ) : (
        <>
          {showDancingClub ? (
            <TableTemplate
              data={data.map(({ coach_id, coach_full_name, ...res }) => res)}
              headers={["Танцівники клубу"]}
            />
          ) : (
            <PageResult title={title} data={data} />
          )}
        </>
      )}
    </Tabs>
  );
};

export default TabsPanel;
