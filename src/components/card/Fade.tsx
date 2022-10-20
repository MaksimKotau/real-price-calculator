import React, { useRef, PropsWithChildren } from 'react'
import { CSSTransition } from 'react-transition-group'

interface OwnProps {
    in: boolean;
    timeout: number;
};

const Fade: React.FC<PropsWithChildren<OwnProps>> = (props) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    return (
        <CSSTransition
            {...props}
            mountOnEnter={false}
            unmountOnExit={false}
            classNames={"itemTransition"}
            nodeRef={nodeRef}
        >
            <div ref={nodeRef}>{props.children}</div>
        </CSSTransition>
    );
}

export default Fade;