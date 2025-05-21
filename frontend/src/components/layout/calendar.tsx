import { useState } from 'react';
import CalendarLib from 'react-calendar';
import styles from '../../styles/calendar.module.css';

type CalendarValue = Date | [Date | null, Date | null] | null;

type CalendarProps = {
    markedDates: string[];
};

const Calendar = ({ markedDates }: CalendarProps) => {
    const [value, setValue] = useState<CalendarValue>(new Date());

    const tileClassName = ({ date, view }: any) => {
        if (view === 'month') {
            const dateStr = date.toISOString().split('T')[0];
            return markedDates.includes(dateStr) ? styles.marked : null;
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    출석 달력 🗓️
                </h2>
            </div>
            <div className={styles.calendarContainer} >
                <CalendarLib
                    onChange={setValue}
                    value={value}
                    locale="en-US"
                    className={styles.reactCalendar}
                    tileClassName={tileClassName}
                />
            </div>
        </div>
    );
};

export default Calendar;
