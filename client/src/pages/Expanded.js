import React from "react";
import background from "../imgs/expanded.jpeg";



const styles = {
    width: "100vw",
    minHeight: "100vh",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${background})`,
    backgroundAttachment: "fixed",
  };
  const cardStyles = {
    display: "flex",
    flexDirection: "row",
    width: "75%",
    border: "1px solid black",
    borderRadius: "10px",
    opacity: "0.85",
    marginRight: "auto",
    marginLeft: "auto",
    textAlign: "center",
    backgroundColor: "#D3D3D3",
  };

function Expanded() {
  return (
      <div style={styles}>
          <div style={cardStyles} className="card">
      <img
        style={{ width: "100px", height: "100px" }}
        src={props.image}
        className="card-img-top"
        alt={props.name}
      />
      <img
        style={{ width: "100px", height: "100px" }}
        src={props.image}
        className="card-img-top"
        alt={props.name}
      />
      <img
        style={{ width: "100px", height: "100px" }}
        src={props.image}
        className="card-img-top"
        alt={props.name}
      />
      <div>
        <div className="card-body">
          <h5 className="card-title">
            Name: {props.empName.first} {props.empName.last}{" "}
          </h5>
          <p className="card-text">A proud employee of Your Company</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Phone: {props.phoneNumber}</li>
          <li className="list-group-item">email: {props.email}</li>
          <li className="list-group-item">DOB: {props.dob}</li>
        </ul>
      </div>
    </div></div>
    
  );
}

export default Expanded;
