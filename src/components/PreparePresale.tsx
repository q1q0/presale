import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Div } from "components/Global";

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

interface PreparePresaleProps {
    timeOut: ()=>void;
}

const PreparePresale: FC<PreparePresaleProps> = (props: PreparePresaleProps) => {
    const [timeLimit, setTimeLimit] = useState(2);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLimit - 1 < 0) {
                clearTimeout(timer);
                props.timeOut();
                return;
            }
            setTimeLimit((timeLimit) => timeLimit - 1);
        }, 1000);
    }, [timeLimit]);

    return <>
        <Box display={'flex'} >
            <TimeCounter
                value={(~~(timeLimit / (24 * 3600))).toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                })}
                label="d"
            />
            <TimeCounter
                value={(~~(timeLimit / 3600) % 24).toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                })}
                label="h"
            />
            <TimeCounter
                value={(~~(timeLimit / 60) % 60).toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                })}
                label="m"
            />
            <TimeCounter
                value={(timeLimit % 60).toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                })}
                label="s"
            />
        </Box>
        
    </>
}

export default PreparePresale