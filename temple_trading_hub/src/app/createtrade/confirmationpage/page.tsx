"use client"

import "../../styles/signIn.css";
import "../../styles/global.css";
import { Grid } from "@mui/material";

const confirmationpage = () => {

    return (
        <Grid
        container
        justifyContent="center"
        alignContent="center">
            <Grid
            item
            justifySelf="center"
            alignContent="center"
            sx={{ minHeight: "50px", 
            position: "relative",
            top: "10vh"
            }}>
                <h1>Trade Confirmed Congrats</h1>
            </Grid>
        </Grid>
        
    );
};

export default confirmationpage;