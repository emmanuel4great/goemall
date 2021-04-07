import React from "react";
import {
  Card,
  Grid,
  Typography,
  Divider,
  TextField,
  Button,
} from "@material-ui/core";
import Home from "@material-ui/icons/Home";
import Phone from "@material-ui/icons/Phone";
import Mail from "@material-ui/icons/Mail";

import "./styles.scss";

function ContactBox({ icon: Icon, label, value }) {
  return (
    <div className="contactWrap">
      <Icon fontSize="large" color="primary" />
      <div>
        <Typography variant="h6">{label}</Typography>
        <Typography variant="body1" color="textSecondary">
          {value}
        </Typography>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="contactPage">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="h5" color="textSecondary">
              Contact us
            </Typography>
            <ContactBox
              icon={Home}
              label="Address"
              value="123 Main Street, Anytown CA 12345 - USA"
            />
            <Divider />
            <ContactBox
              icon={Phone}
              label="Phone Number"
              value="123 Main Street, Anytown CA 12345 - USA"
            />
            <Divider />
            <ContactBox
              icon={Mail}
              label="Email Address"
              value="123 Main Street, Anytown CA 12345 - USA"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" color="textSecondary">
            Contact us
          </Typography>
          <form>
            <TextField label="Your Name (required)" required fullWidth />
            <TextField label="Your Email (required)" required fullWidth />
            <TextField label="Subject (required)" required fullWidth />
            <TextField
              multiline
              rows={4}
              rowsMax={8}
              label="Post Content"
              required
              fullWidth
            />
            <Button
              size="large"
              variant="contained"
              color="primary"
              disableElevation
            >
              Send
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default Contact;
