import React from "react";
import { useParams } from "react-router-dom";
import data from "../datos";
import { Link } from "react-router-dom";
import "../styles/Dogs.css";

function Dogs() {
  const loadImage = require.context("../img", true);
  const params = useParams();
  const infoProtect = data.map((item) => item.pets);

  const array = [];
  infoProtect.map((item) => item.map((y) => array.push(y)));
  const result = array.filter((item) => item.id === Number(params.id));
  let dogData = result[0];

  console.log("infoprotect", infoProtect);
  console.log("result", result[0]);
  console.log("params", typeof params.id);
  console.log('raza', dogData.breed.toString())

  return (
    <div className="container-dog">
      <div className="dog-card">
        <h1>{dogData.name}</h1>
        <img
          className="img-card"
          alt=""
          src={loadImage(`./id${params.id}.jpg`)}
        ></img>
        {infoProtect.name}
        <div className="dog-data">

          <br />
          <h3>Detalles: <Link to={"/main"} className='adoptame'> Adoptame </Link></h3>
          <br/>
          <p>Edad: {dogData.age} </p>
          <p>Raza: {dogData.breed.toString()} </p>
          <p>Sexo: {dogData.gender} </p>
          <p>Tamaño: {dogData.size} </p>
          <p>Pelo: {dogData.coatLength} </p>
        </div>
        <br/>
        <h3>Descripcion: </h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div className="links-dog">
        <Link to={"/main"} className='regresar'> Regresar </Link>
        </div>
    </div>
  );
}


export default Dogs;
