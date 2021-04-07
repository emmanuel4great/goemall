import React from "react";
import { useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import "./styles.scss";
import { Button, Typography } from "@material-ui/core";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "huge Sale",
    caption: "Up to 70% off",
    imgPath: "banner_2.png",
  },
  {
    label: "Biggest Discount",
    caption: "Check the promotion",
    imgPath: "banner_2.png",
  },
  {
    label: "Biggest Sales",
    caption: "Don't miss it",
    imgPath: "banner_2.png",
  },
  {
    label: "Our Best Product",
    caption: "Special Selection",
    imgPath: "banner_2.png",
  },
  {
    label: "Massive Sales",
    caption: "Only For Today",
    imgPath: "banner_2.png",
  },
  // {
  //   label: "Massive Sales",
  //   caption: "Only For Today",
  //   imgPath: "banner_2.png",
  // },
];

function HomeSlider() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="homeSlider">
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <React.Fragment key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <div className="stepperWrap">
                <div className="stepperWrapLabel">
                  <Typography variant="h2">{step.label}</Typography>
                  <Typography variant="h3">{step.caption}</Typography>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    disableElevation
                  >
                    Shop Now
                  </Button>
                </div>
                <img
                  className="slideImage"
                  src={`/images/slider/${step.imgPath}`}
                  alt={step.label}
                />
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </AutoPlaySwipeableViews>
      <div className="stepperDotWrap">
        <MobileStepper
          variant="dots"
          steps={5}
          maxStep={tutorialSteps.length}
          position="static"
          className="stepper"
          activeStep={activeStep}
        />
      </div>
    </div>
  );
}

export default HomeSlider;
