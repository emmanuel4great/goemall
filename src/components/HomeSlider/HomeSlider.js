import React from "react";
import { useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import "./styles.scss";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath: "slider1.jpg",
  },
  {
    label: "Bird",
    imgPath: "slider2.jpg",
  },
  {
    label: "Bali, Indonesia",
    imgPath: "slider3.jpeg",
  },
  {
    label: "NeONBRAND Digital Marketing, Las Vegas, United States",
    imgPath: "slider4.jpg",
  },
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
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                className="slideImage"
                src={`/images/slider/${step.imgPath}`}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <div className="stepperWrap">
        <MobileStepper
          variant="dots"
          steps={6}
          position="static"
          className="stepper"
          activeStep={activeStep}
          //   nextButton={
          //     <Button
          //       size="small"
          //       onClick={handleNext}
          //       disabled={activeStep === 5}
          //     >
          //       Next
          //       {theme.direction === "rtl" ? (
          //         <KeyboardArrowLeft />
          //       ) : (
          //         <KeyboardArrowRight />
          //       )}
          //     </Button>
          //   }
          //   backButton={
          //     <Button
          //       size="small"
          //       onClick={handleBack}
          //       disabled={activeStep === 0}
          //     >
          //       {theme.direction === "rtl" ? (
          //         <KeyboardArrowRight />
          //       ) : (
          //         <KeyboardArrowLeft />
          //       )}
          //       Back
          //     </Button>
          //   }
        />
      </div>
    </div>
  );
}

export default HomeSlider;
