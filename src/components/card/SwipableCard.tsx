import React, { useState } from 'react';


interface OwnProps {
    backgroundColorSwipeRight?: string;
    backgroundColorSwipeLeft?: string;
    swipeDirections: ("left" | "right")[];
    leftSwipePxForShowAction?: number;
    leftSwipePxForCallAction?: number;
    rightSwipePxForShowAction?: number;
    rightSwipePxForCallAction?: number;
    leftActionIcon?: string | JSX.Element;
    rightActionIcon?: string | JSX.Element;
    backgroundStyle?: Omit<React.CSSProperties, "position" | "width" | "height">;
    swipeTreshhold?: number;
    swipeLeftAction?: () => void;
    swipeRightAction?: () => void;
    onClick?: () => void;
}


const SwipableCard: React.FC<OwnProps> = (props) => {
    const [xPosition, setXPosition] = useState<null | number>(null);
    const [xDiff, setXDiff] = useState<null | number>(null);
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setXPosition(e.touches[0].clientX);
        setXDiff(0);
    }
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!xPosition)
            return;
        let x = e.touches[0].clientX;
        if (!props.swipeDirections.includes("left") && x < xPosition)
            return;
        if (!props.swipeDirections.includes("right") && x > xPosition)
            return;
        if (Math.abs(xPosition - x) > (props.swipeTreshhold || 20))
            setXDiff(xPosition - x);
    }
    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (xDiff && xDiff < - (props.leftSwipePxForCallAction || 60) && props.swipeLeftAction) {
            props.swipeLeftAction();
        }
        if (xDiff && xDiff > (props.rightSwipePxForCallAction || 60) && props.swipeRightAction) {
            props.swipeRightAction();
        }
        setXPosition(null);
        setXDiff(null);
    }
    let backgroundColor: string = "gray";
    if (xDiff && xDiff < (0 - (props.rightSwipePxForShowAction || 60))) {
        backgroundColor = props.backgroundColorSwipeRight || "#4791db";
    }
    if (xDiff && (xDiff > (props.leftSwipePxForShowAction || 60))) {
        backgroundColor = props.backgroundColorSwipeLeft || "#4791db";
    }
    return (
        <div style={{ position: "relative", width: "100%", height: "100%", ...props.backgroundStyle, backgroundColor: backgroundColor }}>

            <div
                style={{
                    display: xDiff ? (xDiff < (0 - (props.rightSwipePxForShowAction || 60)) ? "block" : "none") : "none",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%"
                }}
            >
                {props.leftActionIcon}
            </div>
            <div
                style={{
                    display: xDiff ? (xDiff > (props.leftSwipePxForShowAction || 60) ? "block" : "none") : "none",
                    position: "absolute",
                    right: 0,
                    top: 0,
                    height: "100%"
                }}
            >
                {props.rightActionIcon}
            </div>
            <div
                style={{ width: "100%", marginLeft: xDiff ? -xDiff : 0 }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={props.onClick}
            >
                {props.children}
            </div>
        </div>
    )
}

export default SwipableCard;