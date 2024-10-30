import { Search } from "@mui/icons-material";
import Card from "./Card.js";
import { IconButton, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

function Searchh() {
  const [meals, setMeals] = useState(null);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [selectedOption, setSelectedOption] = useState("name");
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [displayCount, setDisplayCount] = useState(9);

  const handleSearch = (e) => {
    e.preventDefault();
    setDisplayCount(9);
    if (selectedOption === "name") {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then((response) => response.json())
        .then((data) => {
          setMeals(data.meals);
          setName("");
          setNotFound(data.meals == null);
        });
    } else if (selectedOption === "ingredient") {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`)
        .then((response) => response.json())
        .then((data) => {
          setMeals(data.meals);
          setName("");
          setNotFound(data.meals == null);
        });
    }
  };

  const handleCat = (category) => {
    const categoryName = category.strCategory;
    setSelectedCategory(categoryName);
    setDisplayCount(9);

    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals);
        setName("");
        setNotFound(data.meals == null);
      });
  };

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
      });
  }, []);

  const loadMoreMeals = () => {
    setDisplayCount((prevCount) => prevCount + 9);
  };

  return (
    <div className="search">
      <form className="inp" onSubmit={handleSearch}>
        <IconButton
          onClick={() => setFilter(!filter)}
          sx={{
            "&:hover": {
              color: "#ff652f",
            },
          }}
        >
          <FilterAltIcon />
        </IconButton>
        <input
          className="input"
          type="text"
          placeholder={
            selectedOption === "name"
              ? "Enter food name"
              : selectedOption === "category"
              ? ""
              : "Enter food ingredient"
          }
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <IconButton
          type="submit"
          sx={{
            "&:hover": {
              color: "#ff652f",
            },
          }}
        >
          <Search />
        </IconButton>
      </form>
      {filter && (
        <div>
          <div className="filter">
            <label>
              <input
                type="radio"
                value="name"
                checked={selectedOption === "name"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              Search by name
            </label>
            <label>
              <input
                type="radio"
                value="category"
                checked={selectedOption === "category"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              Search by category
            </label>
            <label>
              <input
                type="radio"
                value="ingredient"
                checked={selectedOption === "ingredient"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              Search by ingredients
            </label>
            {selectedOption === "category" && categories && (
              <div className="categories">
                {categories.map((category) => (
                  <div
                    className={`cat-card ${
                      selectedCategory === category.strCategory
                        ? "selected"
                        : ""
                    }`}
                    key={category.idCategory}
                    onClick={() => {
                      handleCat(category);
                    }}
                  >
                    <img src={category.strCategoryThumb} alt="" />
                    <h2>{category.strCategory}</h2>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="container">
        {meals &&
          meals
            .slice(0, displayCount)
            .map((meal) => <Card key={meal.idMeal} meal={meal} />)}
        {notFound && <h2>No food found!</h2>}
      </div>
      {meals && displayCount < meals.length && (
        <Button
          onClick={loadMoreMeals}
          variant="contained"
          sx={{
            backgroundColor: "#ff652f",
            color: "#fff",
            margin: "20px auto",
            display: "block",
            "&:hover": {
              backgroundColor: "#e65a2b",
            },
          }}
        >
          More
        </Button>
      )}
    </div>
  );
}

export default Searchh;
