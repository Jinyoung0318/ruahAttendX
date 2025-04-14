import {CircularProgressbar} from "react-circular-progressbar";

const AttendanceRate = () => {
    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg mb-4">Attendance Rate</h2>
            <div className="relative w-48 h-48 mx-auto">
                {/* Using react-circular-progressbar or similar library */}
                <CircularProgressbar
                    value={80}
                    text={`${80}%`}
                    styles={{
                        path: { stroke: '#4CAF50' },
                        text: { fill: '#333', fontSize: '16px' }
                    }}
                />
            </div>
        </div>
    );
};

export default AttendanceRate;