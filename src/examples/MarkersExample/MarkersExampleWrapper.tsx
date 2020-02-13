import * as React from 'react';
import { useState } from "react";
import MarkersExample from "./MarkersExample";
import { Button } from '@material-ui/core';
import { Paper } from '@material-ui/core';

const MarkersExampleWrapper: React.FC = () => {
    const [dump, setDump] = useState('START');
    return (
        <Paper elevation={3} style={wrapperStyles.wrapper}>
            Simple example with memoization {dump}
            <div style={wrapperStyles.buttonContainer}>
                <Button size="small" variant="contained" color="secondary" onClick={() => setDump('FIRST BUTTON')}>First </Button>
                <Button size="small" variant="contained" color="secondary" onClick={() => setDump('SECOND BUTTON')}>Second </Button>
            </div>
            <MarkersExample />
        </Paper>
    );
};

export const wrapperStyles = {
    wrapper: {
        padding: '15px',
        marginTop: '15px'
    },
    buttonContainer: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridGap: '10px',
        gridAutoColumns: 'max-content',
        padding: '10px 0',
    },
}
export default MarkersExampleWrapper
