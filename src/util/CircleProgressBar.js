const CircleProgressBar = (props) => {
    let {
        size = 150,
        progress = 0,
        trackWidth = 10,
        trackColor = `#3b3b42`,
        indicatorWidth = 10,
        indicatorColor = `#07c`,
        indicatorCap = `round`,
        label = ``,
        spinnerSpeed = 1
    } = props;

    const center = size / 2,
        radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
        dashArray = 2 * Math.PI * radius,
        dashOffset = dashArray * ((100 - progress) / 100)

    return (
        <div className="svg-pi-wrapper" style={{ width: size, height: size }}>
            <svg className="svg-pi" style={{ width: size, height: size }}>
                <circle
                    className="svg-pi-track"
                    cx={center}
                    cy={center}
                    fill="transparent"
                    r={radius}
                    stroke={trackColor}
                    strokeWidth={trackWidth}
                />
                <circle
                    className={"svg-pi-indicator"}
                    style={{ animationDuration: spinnerSpeed * 1000 }}
                    cx={center}
                    cy={center}
                    fill="transparent"
                    r={radius}
                    stroke={indicatorColor}
                    strokeWidth={indicatorWidth}
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    strokeLinecap={indicatorCap}
                />
            </svg>
            <div className="svg-pi-label">
                <span className="svg-pi-label__loading">{label}</span>
            </div>
        </div>
    );
}

export default CircleProgressBar;