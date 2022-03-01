import { FC } from "react";
import { Box } from "@mui/material";
import { Div } from "components/Global";
import logo from "assets/images/logo.png"

const Landing:FC = () => {
    return <Box display={'flex'} py="8vw" alignItems="center" flexDirection="column" bgcolor="#11011E" minHeight={'100vh'}>
        <img src={logo} alt="logo" style={{width: '24vw'}} />
    </Box>
}

export default Landing