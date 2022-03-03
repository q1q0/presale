import { FC, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { Div } from "components/Global";
import logo from "assets/images/logo.png"
import dao from "assets/images/dao.png"
import snap from "assets/images/snap.png"
import avalanche from "assets/images/avalancha.png"
import fantom from "assets/images/fantom.png"

import "assets/css/Landing.css"
import PreparePresale from "components/PreparePresale";
import ReadyPresale from "components/ReadyPresale";
import discord from "assets/images/discord-link.png"
import useAuth from "hooks/useAuth"
import { ConnectorNames } from "../type";

const Landing: FC = () => {
    const [timeover, setTimeover] = useState(false)
    const { login, account, logout, error } = useAuth();

    useEffect(() => {
        if (account) console.log(account);
    }, [account])

    const connectWallet = async () => {
        // if (account) return;
        await login(ConnectorNames.Injected);
    }

    return <Box position="relative" minHeight="100vh">
        <Box position="absolute" zIndex={11} top="50px" right="50px" color="white">
            <Button variant="outlined" color="inherit" onClick={connectWallet}><Div fsize="30" fw="600">Connect Wallet</Div></Button>
        </Box>
        <Box className="landing_container" ></Box>
        <Box display={'flex'} py="9vw" alignItems="center" flexDirection="column" zIndex={10} position="relative">
            <Box><img src={logo} alt="logo" style={{ width: '24vw' }} /></Box>
            {
                !timeover ?
                    <PreparePresale timeOut={() => { setTimeover(true) }} /> :
                    <ReadyPresale />
            }
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" my="3vw">
                <a href="https://discord.gg/3Ce4BY4Yqs"><img src={discord} alt="" style={{ width: '12vw' }} /></a>
            </Box>
            <Div fsize="26" fw="300" mb="3v">PARTNERED WITH AND BUILT ON:</Div>
            <Box display="flex" justifyContent="center" alignItems="center" mt="2vw">
                <img src={dao} alt="" style={{ width: '3vw', marginRight: '7vw' }} />
                <img src={snap} alt="" style={{ width: '10vw', marginRight: '7vw' }} />
                <img src={avalanche} alt="" style={{ width: '13vw', marginRight: '7vw' }} />
                <img src={fantom} alt="" style={{ width: '13vw' }} />
            </Box>
        </Box>

    </Box>
}

export default Landing;