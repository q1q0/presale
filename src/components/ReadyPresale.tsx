import { FC, useEffect, useState } from "react";
import { Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Div } from "components/Global";
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/material/styles";
import React from "react";

const RatioBar = styled((props: any) => <Box {...props} />)`
    border-radius: 999px;
    border: 7px double white;
    position: relative;
    width: 40vw;
    padding-top: 0.4vw;
    padding-bottom: 0.4vw;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`

const WhiteTextField = styled(TextField)({
    "& label": {
        color: "white",
    },
    "& label.Mui-focused": {
        color: "white",
    },
    "& .MuiInputBase-input": {
        color: "white",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "white",
        },
        "&:hover fieldset": {
            borderColor: "white",
        },
        "&.Mui-focused fieldset": {
            borderColor: "white",
        },
    },
});

const useStyles = makeStyles({
    '&: .MuiInputBase': {
        border: '1px white solid',
    },
    select: {
        '&:before': {
            border: '1px white solid',
        },
        '&:after': {
            border: '1px white solid',
        },
        '&:not(.Mui-disabled):hover::before': {
            border: '1px white solid',
        },
    },
    icon: {
        fill: 'white',
    },
    root: {
        color: 'white',
    },
})

const ReadyPresale: FC = () => {

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    const classes = useStyles()

    return <>
        <Div fsize="48" fw="300" mt="1vw" mb="3vw">PRESALE NOW OPEN!</Div>
        <Div fsize="36" fw="600" mb="3vw">ROUND 1(FIGHT)</Div>
        <RatioBar mb="3vw">
            <Box position="absolute" left="0" top="0" width="15%" height="100%" bgcolor="white"></Box>
            <Div>{15}%</Div>
        </RatioBar>

        <Div fsize="60" fw="900" mb="1vw">{3125}</Div>
        <Div fsize="24" fw="600" mb="1vw">SUBZERO TOKENS</Div>
        <Box display="flex" justifyContent="center" alignItems="center">
            <Div fsize="26" fw="600" mr="1vw">AMOUNT($)</Div>
            <WhiteTextField id="outlined-basic" variant="outlined" sx={{ mr: '1vw' }} />
            <FormControl fullWidth className={classes.select} color="success">
                <Select
                    value={age}
                    onChange={handleChange}
                    className={classes.select}
                    inputProps={{
                        classes: {
                            icon: classes.icon,
                            root: classes.root,
                        },
                    }}
                >
                    <MenuItem value={'USDCE'}>USDC.e</MenuItem>
                    <MenuItem value={'USDC'}>USDC</MenuItem>
                    <MenuItem value={'USDT'}>USDT</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <Box color="white"><Button sx={{mt: '2vw', mb: '5vw'}} color="inherit" variant="outlined"><Div fsize="36" fw="600">BUY $SUB TOKENS</Div></Button></Box>
        <Div fsize="22" fw="300" mb="3vw">THE FIRST TOMB-PEGGED ALGORITHIC STABLECOIN CROSS CHAINE, ON AVALANCHE.</Div>
    </>
}

export default ReadyPresale