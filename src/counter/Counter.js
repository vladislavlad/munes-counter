import React, {useEffect, useState} from "react";
import moment from "moment"
import {Typography} from "@mui/material";

const Counter = ({startTime, perHour}) => {
    const [amount, setAmount] = useState(0)
    const perSecond = perHour / 3600.0
    const perSecondQuarter = perSecond / 4.0

    useEffect(() => {
        if (startTime === undefined || startTime === null) {
            setAmount(0)
        } else {
            setAmount(moment.duration(moment().diff(startTime)).asSeconds() * perSecond)
        }
    }, [startTime, perSecond])

    useEffect(() => {
        const intervalId = setInterval(() => setAmount(oldValue => oldValue + perSecondQuarter), 250);
        return () => clearInterval(intervalId);
    });

    return <Typography variant="h3" component="h3">You earned {amount.toFixed(2)} ₽</Typography>;
}

export default Counter;
