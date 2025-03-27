interface CircleIconProps {
    icon: React.ReactNode;
    size?: number;
}

const CircleIcon: React.FC<CircleIconProps> = ({ icon, size = 200 }) => {
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #1E88E5, #00BCD4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto'
            }}
        >
            {icon}
        </div>
    );
};

export default CircleIcon;
