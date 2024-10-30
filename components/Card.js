import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { IconButton } from "@mui/material";
export default function RecipeReviewCard({ meal }) {
  const [displaySteps, setDisplaySteps] = React.useState(false);
  return (
    <Card sx={{ width: 345, height: 340, marginTop: 5 }}>
      {!displaySteps ? (
        <>
          <CardHeader
            title={meal.strMeal}
            subheader={meal.strCategory ? meal.strCategory : ""}
          />

          <CardMedia component="img" height="194" image={meal.strMealThumb} />
        </>
      ) : (
        <p className="steps">{meal.strInstructions}</p>
      )}

      <CardContent className="info-cont">
        {meal.strYoutube ? (
          <Link to={meal.strYoutube}>
            <YouTubeIcon sx={{ color: "#ff652f", fontSize: "32px" }} />
          </Link>
        ) : (
          ""
        )}
        {meal.strInstructions ? (
          <IconButton onClick={() => setDisplaySteps(!displaySteps)}>
            <InfoIcon sx={{ color: "#ff652f", fontSize: "30px" }} />
          </IconButton>
        ) : (
          ""
        )}
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}
