import { useState } from 'react';
import CalendarLib from 'react-calendar';
import styles from '../../styles/calendar.module.css';

type CalendarValue = Date | [Date | null, Date | null] | null;

const Calendar = () => {
    const [value, setValue] = useState<CalendarValue>(new Date());

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    🗓️출석 달력🗓️
                </h2>
            </div>
            <CalendarLib
                onChange={setValue}
                value={value}
                locale="en-US"
                className={styles.reactCalendar}
            />
        </div>
    );
};

export default Calendar;
