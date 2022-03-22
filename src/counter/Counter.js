import React, {useEffect, useState} from "react";
import moment from "moment"

const Counter = ({startTime, perSecond}) => {
    const [amount, setAmount] = useState(0)
    const perSecondQuarter = perSecond / 4.0

    useEffect(() => {
        if (startTime === undefined || startTime === null) {
            setAmount(0)
        } else {
            setAmount(moment.duration(moment().diff(startTime)).asSeconds() * perSecond)
        }
    }, [startTime])

    useEffect(() => {
        const intervalId = setInterval(() => setAmount(oldValue => oldValue + perSecondQuarter), 250);
        return () => clearInterval(intervalId);
    });

    return (
        <h2>You earned {amount.toFixed(2)} ₽</h2>
    );
}

export default Counter;
