import React from "react";
import Logo from "../assets/bike.png";

const Bikes = ({ bikes, loading }) => {
  if (loading) {
    return (
      <div className="sk-cube-grid">
        <div className="sk-cube sk-cube1"></div>
        <div className="sk-cube sk-cube2"></div>
        <div className="sk-cube sk-cube3"></div>
        <div className="sk-cube sk-cube4"></div>
        <div className="sk-cube sk-cube5"></div>
        <div className="sk-cube sk-cube6"></div>
        <div className="sk-cube sk-cube7"></div>
        <div className="sk-cube sk-cube8"></div>
        <div className="sk-cube sk-cube9"></div>
      </div>
    );
  }

  return (
    <div className="container mt-2">
      <div className="row margin-media">
        {bikes.map((bike) => (
          <div
            className="media p-3 col-12 col-sm-4 col-md-12 col-lg-12"
            key={bike.id}
          >
            <img
              src={bike.media.image_url === null ? Logo : bike.media.image_url}
              alt={bike.id}
              className="mr-3 mt-3"
            />
            <div className="media-body">
              <div className="media-body-top">
                <h4>
                  {" "}
                  <strong>{bike.title}</strong>{" "}
                  <small>
                    <i> {bike.address} </i>
                  </small>
                </h4>
                <p className="address">
                  {" "}
                  {bike.description === "" || bike.description === null
                    ? "No description added"
                    : bike.description}{" "}
                </p>
              </div>
              <div className="date">
                <p>
                  {" "}
                  <strong> Stolen </strong> {bike.occurred_at}{" "}
                </p>
                <p>
                  {" "}
                  <strong> Reported </strong> {bike.updated_at}{" "}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bikes;
