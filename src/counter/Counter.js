import React, {useState, useEffect} from "react";
import moment from "moment"

const Counter = ({startTime}) => {
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        if (startTime === undefined || startTime === null) {
            setAmount(0)
        } else {
            setAmount(moment.duration(moment().diff(startTime)).asSeconds() * 0.157)
        }
    }, [startTime])

    useEffect(() => {
        const intervalId = setInterval(() => setAmount(oldValue => oldValue + 0.157), 250);
        return () => clearInterval(intervalId);
    });

    return (
        <h2>You earned {amount.toFixed(2)} ₽</h2>
    );
}

export default Counter;
