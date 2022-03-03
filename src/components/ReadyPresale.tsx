import { FC, useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Div } from "components/Global";
import { styled } from "@mui/material/styles";
import React from "react";
import sell, {getTotalbalance, initialBalance, getRound} from "utils/useTokenInfo"
import useAuth from "hooks/useAuth"

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
    padding: 18px;
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
    const {account} = useAuth();
    const [coin, setCoin] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [totalBalance, setTotalBalance] = useState(-1);
    const [initBalance, setInitBalance] = useState(-1);
    const [round, setRound] = useState(0)

    const handleChange = (event: any) => {
        setCoin(event.target.value as string);
    };


    const changeinitBalance = (e: any) => {
        setAmount(e.target.value);
    }

    useEffect(()=>{
        (async()=>{
            console.log("aaaaaaaaaaa",await getRound())
            setRound(await getRound())
        })() 
    }, [])

    useEffect(()=>{
        if(!account) return;
        (async()=>{
            const initBal = await initialBalance()
            setInitBalance(initBal ? initBal : -1);
            setTotalBalance(await getTotalbalance())
        })()
    },[account])

    const preSell = async() => {
        if(!round) {
            alert('Cooming soon!');
            return;
        }
        if(!account) {
            alert('connect wallet!')
            return
        }
        console.log(coin, amount)
        setTotalBalance(await sell(Number(amount), Math.round(Number(amount)/1.8), account, coin))
    }

    return <>
    {console.log(((initBalance - totalBalance)/initBalance), initBalance)}
        <Div fsize="48" fw="300" mt="1vw" mb="3vw">PRESALE NOW OPEN!</Div>
        <Div fsize="36" fw="600" mb="3vw">{round ? `ROUND ${round} (FIGHT!)` : 'Cooming soon!'}</Div>
        <RatioBar mb="3vw">
            <Box position="absolute" left="0" top="0" width={`${totalBalance<0?0:(initBalance - totalBalance)*100/initBalance}%`} height="100%" bgcolor="white"></Box>
            <Div zIndex="2" color={`${((initBalance - totalBalance)/initBalance) > 0.5 && (totalBalance > -1) ? 'black' :'white'}`}>{`${totalBalance<0?0:(initBalance - totalBalance)*100/initBalance}%`}</Div>
        </RatioBar>

        <Div fsize="60" fw="900" mb="1vw">{(Number(amount)/1.8).toFixed(0)}</Div>
        <Div fsize="24" fw="600" mb="1vw">SUBZERO TOKENS</Div>
        <Box display="flex" justifyContent="center" alignItems="center">
            <Div fsize="26" fw="600" mr="1vw">AMOUNT($)</Div>
            <WhiteTextField id="outlined-basic" variant="outlined" sx={{ mr: '1vw' }} onChange={changeinitBalance} value={amount} />
            <CustomSelect onChange={handleChange} value={coin}>
                <option value={'USDCE'} style={{background: 'black'}}>USDC.e</option>
                <option value={'USDC'} style={{background: 'black'}}>USDC</option>
                <option value={'USDT'} style={{background: 'black'}}>USDT</option>
            </CustomSelect>
        </Box>
        <Box color="white"><Button sx={{ mt: '2vw', mb: '5vw' }} color="inherit" variant="outlined" onClick={preSell}><Div fsize="36" fw="600">BUY $SUB TOKENS</Div></Button></Box>
        <Div fsize="22" fw="300" mb="3vw">THE FIRST TOMB-PEGGED ALGORITHIC STABLECOIN CROSS CHAINE, ON AVALANCHE.</Div>
    </>
}

export default ReadyPresale