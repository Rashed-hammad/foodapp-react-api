import React, { useEffect, useState } from "react";
import Card from "./Card.js";
import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton } from "@mui/material";

function Random() {
  const [meal, setMeal] = useState(null);

  const fetchRandomMeal = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => response.json())
      .then((data) => {
        setMeal(data.meals[0]);
      });
  };

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  return (
    <div className="rand">
      <IconButton onClick={fetchRandomMeal}>
        <ReplayIcon sx={{ color: "#ff652f", fontSize: "30px" }} />
      </IconButton>
      {meal && <Card meal={meal} />}
    </div>
  );
}

export default Random;
