import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import styles from '../../styles/atttendanceRate.module.css';

1

const AttendanceRate = () => {
    const series = [76, 67]; // Example attendance percentages
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
                            const total = series.reduce((acc, val) => acc + val, 0);
                            const average = (total / series.length).toFixed(1);
                            return `${average}%`;
                        },
                    },
                },
            },
        },
        colors: ['#fbbf24','#00ac0e'],
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