import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Div } from "components/Global";
import logo from "assets/images/logo.png"
import dao from "assets/images/dao.png"
import snap from "assets/images/snap.png"
import avalanche from "assets/images/avalancha.png"
import fantom from "assets/images/fantom.png"

import "assets/css/Landing.css"
import PreparePresale from "components/PreparePresale";
import ReadyPresale from "components/ReadyPresale";
import prop from "assets/images/prop.png"
import docs from "assets/images/docs.png"
import discord from "assets/images/discord-link.png"

interface TimeCounterProps {
    value: string;
    label: string;
}

const TimeCounter: FC<TimeCounterProps> = (props: TimeCounterProps) => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            mr="1px"
            alignItems="center"
        >
            <Div family="Kanit" fsize="40" fw="600" padding="5px" >
                {props.value}{props.label}
            </Div>
        </Box>
    );
};

const Landing: FC = () => {
    const [timeover, setTimeover] = useState(false)

    return <Box position="relative" minHeight="100vh">
        <Box className="landing_container" ></Box>
        <Box display={'flex'} py="9vw" alignItems="center" flexDirection="column" zIndex={10} position="relative">
            <Box><img src={logo} alt="logo" style={{ width: '24vw' }} /></Box>
            {
                !timeover ?
                    <PreparePresale timeOut={() => { setTimeover(true) }} /> :
                    <ReadyPresale />
            }
            
            <Box display={'flex'} mt="1vw">
                <Box><img src={prop} alt="" style={{ marginRight: '3vw', width: '3vw' }} /></Box>
                <Box><img src={docs} alt="" style={{ width: '3vw' }} /></Box>
            </Box>
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

export default Landing