import React from "react";
import {
  Paper,
  Typography,
  Button,
  useTheme,
  Grid,
  Card,
  CardActionArea,
} from "@material-ui/core";
// import { Link } from "react-router-dom";
// import ShopMen from "./../../assets/shopMens.jpg";
// import ShopWomen from "./../../assets/shopWomens.jpg";
import "./styles.scss";
import { useHistory } from "react-router-dom";

function Directory(props) {
  const history = useHistory();
  const theme = useTheme();

  return (
    <div className="directory">
      <Grid container className="newDealWrap" spacing={2}>
        <Grid item xs={12} md={8}>
          <div className="womenAndAdvert">
            <Paper className="wrap">
              <img
                src="/images/new_deal.jpg"
                alt=""
                className="womenNewDealImage"
              />
              <div className="contentWrap">
                <div className="makeDealTextWrap">
                  <Typography variant="h6">New Deal</Typography>
                  <Typography variant="h4">Womens trouser suits</Typography>
                </div>
                <div
                  className="makeDealBtnWrap"
                  style={{ backgroundColor: theme.palette.primary.main }}
                >
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    onClick={() => history.push("/search/womens")}
                  >
                    Make Deal
                  </Button>
                </div>
              </div>
            </Paper>
            <img src="/images/advert.jpg" alt="" className="advertImage" />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper>
            <img
              src="/images/man_suit_main.png"
              alt=""
              className="manSuitImage"
            />
            <div className="manSuitNewArrivalDetail">
              <Typography variant="h5" align="center">
                New Suit Arrival
              </Typography>
              <Button
                color="primary"
                variant="contained"
                onClick={() => history.push("/search/mens")}
              >
                Browse More
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Card className="categoryWrap">
        <CardActionArea onClick={() => history.push("/search/womens")}>
          <div className="wrap withBorder">
            <img src="/images/woman_wear_icon.png" alt="" />
            <Typography variant="h6" align="center" color="primary">
              Women wear
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Shop now
            </Typography>
          </div>
        </CardActionArea>
        <CardActionArea onClick={() => history.push("/search/mens")}>
          <div className="wrap">
            <img src="/images/men_wear_icon.png" alt="" />
            <Typography variant="h6" color="primary" align="center">
              Men wear
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Shop now
            </Typography>
          </div>
        </CardActionArea>
      </Card>
      <Grid container className="siteFeatureWrap">
        <Grid item xs={12} md={4}>
          <div className="siteFeature">
            <img src="/images/delivery_icon.png" alt="" />
            <Typography variant="body2">FREE SHIPING</Typography>
            <Typography variant="h6">Every Day / Every Order</Typography>
            <Typography variant="caption" color="textSecondary">
              *All Order Over $100
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="siteFeature">
            <img src="/images/customer_support_icon.png" alt="" />
            <Typography variant="body2">FRIENDLY SUPPORT</Typography>
            <Typography variant="h6">24/7 Dedicated Support</Typography>
            <Typography variant="caption" color="textSecondary">
              *Only In Usa
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="siteFeature">
            <img src="/images/refund_icon.png" alt="" />
            <Typography variant="body2">SECURE</Typography>
            <Typography variant="h6">Money Back Guranted</Typography>
            <Typography variant="caption" color="textSecondary">
              *Conditions Apply
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Directory;
