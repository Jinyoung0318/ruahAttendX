import React from 'react';
import styles from '../../styles/recentAttendance.module.css';

interface DateFilterProps {
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    onSearch: () => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ startDate, setStartDate, endDate, setEndDate, onSearch }) => {
    return (
        <div className={styles.dateFilterRight}>
            <label>
                <input className={styles.calendar} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
            <span style={{ color: 'black' }}> ~ </span>
            <label>
                <input className = {styles.calendar} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label>
            <button onClick={onSearch}>검색</button>
        </div>
    );
};

export default DateFilter;
