import React from "react";
import "./styles.scss";
import Directory from "../../components/Directory";
import HomeSlider from "../../components/HomeSlider";
import {
  Button,
  Typography,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import Slider from "react-slick";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { Link } from "react-router-dom";

const brands = [
  { imgPath: "1.png" },
  { imgPath: "2.png" },
  { imgPath: "3.png" },
  { imgPath: "4.png" },
  { imgPath: "1.png" },
  { imgPath: "2.png" },
  { imgPath: "3.png" },
  { imgPath: "4.png" },
];
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  nextArrow: <></>,
  prevArrow: <></>,
  appendDots: (dot) => <></>,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function HomePage() {
  return (
    <section className="homepage">
      <div className="sliderWrap">
        <div
          className="category"
          style={{ backgroundImage: "url(/images/category_layer.png)" }}
        >
          <List>
            <ListItem button component={Link} to="/search/womens">
              <ListItemText primary="Women Suit" />
              <ListItemSecondaryAction>
                <ChevronRight />
              </ListItemSecondaryAction>
            </ListItem>
            <List component="div" disablePadding style={{ paddingLeft: 30 }}>
              <ListItem component={Link} to="/search/womens" button>
                <ListItemText primary="Apple Shape" />
              </ListItem>
              <ListItem component={Link} to="/search/womens" button>
                <ListItemText primary="Pear Shapes" />
              </ListItem>
              <ListItem component={Link} to="/search/womens" button>
                <ListItemText primary="Hourglass Shapes" />
              </ListItem>
            </List>
            <ListItem button component={Link} to="/search/mens">
              <ListItemText primary="Men Suit" />
              <ListItemSecondaryAction>
                <ChevronRight />
              </ListItemSecondaryAction>
            </ListItem>
            <List component="div" disablePadding style={{ paddingLeft: 30 }}>
              <ListItem component={Link} to="/search/mens" button>
                <ListItemText primary="Slim Fit" />
              </ListItem>
              <ListItem component={Link} to="/search/mens" button>
                <ListItemText primary="Classic Fit" />
              </ListItem>
              <ListItem component={Link} to="/search/mens" button>
                <ListItemText primary="Shawl Fit" />
              </ListItem>
              <ListItem component={Link} to="/search/mens" button>
                <ListItemText primary="Unstructured Fit" />
              </ListItem>
            </List>
          </List>
        </div>

        <HomeSlider />
        <div className="manWomanWrap">
          <div className="menSuit">
            <img src="/images/cheap_women_suit.jpg" alt="" />
            <div className="caption"></div>
            <div className="captionText">
              <Typography variant="body1">As Cheap as</Typography>
              <Typography variant="h4">$50</Typography>
            </div>
          </div>
          <div className="menSuit">
            <img src="/images/cheap_men_suit.jpg" alt="" />
            <div className="caption"></div>
            <div className="captionText">
              <Typography variant="body1">Get as Cheap as</Typography>
              <Typography variant="h4">$45</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="directory">
        <Directory />
      </div>
      <div className="subscriptionWrap">
        <div>
          <Typography variant="h4">Subscribe Our Newsletter</Typography>
          <Typography variant="body2">
            Stay up to date with our latest new and products
          </Typography>
        </div>
        <div className="formWrap">
          <TextField variant="outlined" label="Email Address" fullWidth />
          <Button
            size="large"
            variant="contained"
            disableElevation
            color="primary"
            className="btn"
          >
            Submit
          </Button>
        </div>
      </div>
      <div className="brandSliderWrap">
        <Typography variant="h5" align="center" color="textSecondary">
          Shop By Brands
        </Typography>
        <Paper className="paper">
          <Slider {...settings}>
            {brands.map((b) => (
              <div className="wrap">
                <img src={`/images/brand/${b.imgPath}`} alt="" />
              </div>
            ))}
          </Slider>
        </Paper>
      </div>
    </section>
  );
}
