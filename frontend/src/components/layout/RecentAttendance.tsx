const RecentAttendance = () => {
    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg mb-4">Recent Attendance</h2>
            <table className="w-full">
                <thead>
                <tr>
                    <th className="text-left">Date</th>
                    <th className="text-right">Status</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>May 12, 2024</td>
                    <td className="text-right">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Present</span>
                    </td>
                </tr>
                {/* More rows... */}
                </tbody>
            </table>
        </div>
    );
};

export default RecentAttendance;