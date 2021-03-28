import React from "react";
import { Paper, Typography } from "@material-ui/core";

import "./styles.scss";

export default function AuthWrapper({ headline, children }) {
  return (
    <div className="authWrapperRoot">
      <div
        className="authWrapperLayer"
        style={{
          backgroundImage: "url(/images/drawer_layer.png)",
        }}
      />
      <div className="authWrapper">
        <div className="wrap">
          {headline && (
            <Typography variant="h5" className="h2">
              {headline}
            </Typography>
          )}

          <div className="children">{children && children}</div>
        </div>
      </div>
    </div>
  );
}
