import React from "react";
import { CssBaseline, Box, Container } from "@mui/material";
import styled from "styled-components";
import { colors } from "./Light-Dark-Theme/ThemeConfig";

const CardContainer = ({ children }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="100%">
        <Box
          sx={{
            backgroundColor: colors.dark,
            height: "fit-content",
            width: "fit-content",
            maxWidth: "100%",
            padding: "0.5rem",
            border: "solid #F5EFE6 3px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "row",
            marginLeft: "auto",
            marginRight: "auto",
            overflow: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {children}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default CardContainer;
// position: "absolute", left: "10vw",top: "600px"
