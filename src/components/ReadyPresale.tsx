import { FC } from "react";
import { Box, Button, SelectChangeEvent, TextField } from "@mui/material";
import { Div } from "components/Global";
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

const CustomSelect = styled((props: any) => <select {...props} />)`
    border: 1px solid white;
    padding: 1.5vw;
    border-radius: 4px;
    color: white;
    background: transparent;
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

const ReadyPresale: FC = () => {

    const [coin, setCoin] = React.useState('');
    const [amount, setAmount] = React.useState('');

    const handleChange = (event: any) => {
        setCoin(event.target.value as string);
    };

    const changeTokenAmount = (e: any) => {
        setAmount(e.target.value);
    }

    return <>
        <Div fsize="48" fw="300" mt="1vw" mb="3vw">PRESALE NOW OPEN!</Div>
        <Div fsize="36" fw="600" mb="3vw">ROUND 1(FIGHT)</Div>
        <RatioBar mb="3vw">
            <Box position="absolute" left="0" top="0" width="15%" height="100%" bgcolor="white"></Box>
            <Div>{15}%</Div>
        </RatioBar>

        <Div fsize="60" fw="900" mb="1vw">{(Number(amount)/1.8).toFixed(2)}</Div>
        <Div fsize="24" fw="600" mb="1vw">SUBZERO TOKENS</Div>
        <Box display="flex" justifyContent="center" alignItems="center">
            <Div fsize="26" fw="600" mr="1vw">AMOUNT($)</Div>
            <WhiteTextField id="outlined-basic" variant="outlined" sx={{ mr: '1vw' }} onChange={changeTokenAmount} value={amount} />
            <CustomSelect onChange={handleChange} value={coin}>
                <option value={'USDCE'} style={{background: 'black'}}>USDC.e</option>
                <option value={'USDC'} style={{background: 'black'}}>USDC</option>
                <option value={'USDT'} style={{background: 'black'}}>USDT</option>
            </CustomSelect>
        </Box>
        <Box color="white"><Button sx={{ mt: '2vw', mb: '5vw' }} color="inherit" variant="outlined"><Div fsize="36" fw="600">BUY $SUB TOKENS</Div></Button></Box>
        <Div fsize="22" fw="300" mb="3vw">THE FIRST TOMB-PEGGED ALGORITHIC STABLECOIN CROSS CHAINE, ON AVALANCHE.</Div>
    </>
}

export default ReadyPresale