import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "bulma/css/bulma.css";
import Bikes from "./components/Bikes";
import Pagination from "./components/Pagination";

const App = () => {
  const [bikes, setBikes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [textInput, setTexInput] = useState("");
  const [dateBefore, setDateBefore] = useState(null);
  const [dateAfter, setDateAfter] = useState(null);
  const [setNoData] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://bikewise.org:443/api/v2/incidents?page=1&per_page=10`
        );

        setBikes(res.data.incidents);
        setLoading(false);
        console.log(res.data.incidents);
      } catch {
        setLoading(false);
        setDisplayMessage("Error 404");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setTexInput(e.target.value);
  };

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const formatDateAfter = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  };

  const handleDateBeforeChange = (e) => {
    const date = e.target.value;
    const dateChanged = formatDate(date).split("-").join("");
    setDateBefore(dateChanged);
    console.log(typeof dateBefore);
  };

  const handleDateAfterChange = (e) => {
    const date = e.target.value;
    const dateChangedAfter = formatDateAfter(date).split("-").join("");
    setDateAfter(dateChangedAfter);
    console.log(typeof dateAfter);
    console.log(dateChangedAfter);
  };

  const validateData = (arr) => {
    if (arr.length === 0) {
      setNoData(true);
      setDisplayMessage("No Data Registered");
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    console.log(bikes);
    try {
      setLoading(true);
      const res = await axios.get(`https://bikewise.org:443/api/v2/incidents`, {
        params: {
          query: textInput,
          occurred_before: dateBefore ? parseInt(dateBefore) : null,
          occurred_after: dateAfter ? parseInt(dateAfter) : null,
          page,
          per_page: 10,
        },
      });
      setBikes(res.data.incidents);
      setLoading(false);
      validateData(res.data.incidents);
    } catch {
      setLoading(false);
      setDisplayMessage("Error 404");
    }
  };

  const handleSubmit2 = async (count) => {
    console.log(bikes);
    try {
      setLoading(true);
      const res = await axios.get(`https://bikewise.org:443/api/v2/incidents`, {
        params: {
          query: textInput,
          occurred_before: dateBefore ? parseInt(dateBefore) : null,
          occurred_after: dateAfter ? parseInt(dateAfter) : null,
          page: count,
          per_page: 10,
        },
      });
      setBikes(res.data.incidents);
      setLoading(false);
      console.log(res.data.incidents);
      validateData(res.data.incidents);
    } catch {
      setLoading(false);
      setDisplayMessage("Error 404");
    }
  };

  const handleNextPage = (num) => {
    console.log(num);
    setPage(page + num);
    handleSubmit2(page + num);
  };

  useEffect(() => {
    setPage(page);
  }, [page]);

  return (
    <div className="App">
      <h1 className="title">Police Departament Reports</h1>
      <div className="margin-input d-flex container">
        <form
          onSubmit={(value) => {
            handleSubmit(value);
          }}
        >
          <div className="field">
            <p className="control">
              <input
                onChange={(value) => {
                  handleChange(value);
                }}
                className="input"
                type="text"
                placeholder="Find a bike"
              />
            </p>
            <p className="control">
              <label>Date Before</label>
              <br />
              <input
                onChange={(value) => {
                  handleDateBeforeChange(value);
                }}
                className="input"
                type="date"
                placeholder="Find a bike"
              />
            </p>
            <p className="control">
              <label>Date After</label>
              <br />
              <input
                onChange={(value) => {
                  handleDateAfterChange(value);
                }}
                className="input"
                type="date"
                placeholder="Find a bike"
              />
            </p>
            <p className="control">
              <button className="button is-info">Search</button>
            </p>
          </div>
        </form>
        <div className="total-reports">
          <p> Total Reports: {bikes.length} </p>
        </div>
      </div>
      <Bikes bikes={bikes} loading={loading} />
      {bikes.length ? (
        <Pagination
          page={page}
          updatePage={(val) => {
            handleNextPage(val);
          }}
        />
      ) : null}
      <p> {displayMessage} </p>
    </div>
  );
};

export default App;
