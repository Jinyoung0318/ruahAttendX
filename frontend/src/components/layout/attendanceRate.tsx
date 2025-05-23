import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import styles from '../../styles/atttendanceRate.module.css';

type AttendanceRateProps = {
    markedDates: string[];
};

const AttendanceRate = ({ markedDates }: AttendanceRateProps) => {
    const currentYear = new Date().getFullYear();
    const yearStart = new Date(`${currentYear}-01-01`);
    const yearEnd = new Date(`${currentYear}-12-31`);

    let totalWednesdays = 0;
    let totalFridays = 0;

    for (let d = new Date(yearStart); d <= yearEnd; d.setDate(d.getDate() + 1)) {
        const day = d.getDay();
        if (day === 3) totalWednesdays++;
        if (day === 5) totalFridays++;
    }

    const attendedWednesdays = markedDates.filter(date => {
        const d = new Date(date);
        return d.getFullYear() === currentYear && d.getDay() === 3;
    }).length;

    const attendedFridays = markedDates.filter(date => {
        const d = new Date(date);
        return d.getFullYear() === currentYear && d.getDay() === 5;
    }).length;

    const wednesdayRate = totalWednesdays ? (attendedWednesdays / totalWednesdays) * 100 : 0;
    const fridayRate = totalFridays ? (attendedFridays / totalFridays) * 100 : 0;
    const averageRate = (wednesdayRate + fridayRate) / 2;

    const series = [parseFloat(fridayRate.toFixed(1)), parseFloat(wednesdayRate.toFixed(1))];
    const options: ApexOptions = {
        chart: {
            height: 350,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: '22px',
                    },
                    value: {
                        fontSize: '16px',
                    },
                    total: {
                        show: true,
                        label: '평균 출석률',
                        formatter: function () {
                            return `${averageRate.toFixed(1)}%`;
                        },
                    },
                },
            },
        },
        colors: ['#fbbf24', '#00ac0e'],
        labels: ['금요일', '수요일'],
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.header}>출석률 그래프 📊</h2>
            <ReactApexChart options={options} series={series} type="radialBar" height={350} />
        </div>
    );
};

export default AttendanceRate;