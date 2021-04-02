import React from "react";
import "./styles.scss";
import { Typography, Grid, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <Typography variant="h4">Geo Mall</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet,consectetur adipisicing elit. Here you can
        use rows and columns here to organize your footer content. Lorem ipsum
        dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit
        amet,consectetur adipisicing elit.
      </Typography>
      <div className="listWrap">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography>ABOUT</Typography>
            <div className="linkContainers">
              <Typography component={Link} to="#">
                About us
              </Typography>
              <Typography component={Link} to="#">
                Terms and Condition
              </Typography>
              <Typography component={Link} to="#">
                Privacy Policy
              </Typography>
              <Typography component={Link} to="#">
                FAQ
              </Typography>
              <Typography component={Link} to="#">
                Contact us
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography>SESSION</Typography>
            <div className="linkContainers">
              <Typography component={Link} to="/login">
                Login
              </Typography>
              <Typography component={Link} to="/registation">
                Register
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography>CATEGORY</Typography>
            <div className="linkContainers">
              <Typography component={Link} to="/search/men">
                Men
              </Typography>
              <Typography component={Link} to="/search/womens">
                Women
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography>ABOUT</Typography>
            <div className="linkContainers">
              <Typography component={Link} to="#">
                Facebook
              </Typography>
              <Typography component={Link} to="#">
                Twitter
              </Typography>
              <Typography component={Link} to="#">
                Youtube
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
      <Divider className="footerDivider" />
      <div className="paymentOption">
        <img src="/images/payment.png" alt="" />
      </div>
      <Typography variant="body2" align="center">
        © Geomall 2020
      </Typography>
    </footer>
  );
}
