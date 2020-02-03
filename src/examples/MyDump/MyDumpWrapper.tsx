import * as React from 'react';
import {useState} from "react";
import MyDump from "./MyDump";

export type DumpProps = {
    text?: String
};
export const MyDumpWrapper = (props: DumpProps) => {
    const [dump, setDump] = useState('START');
    console.log('Wrapper')
    return (
        <div style={wrapperStyles.wrapper}>
            Wrapper {dump}
            <div style={wrapperStyles.buttonContainer}>
                <div style={wrapperStyles.button} onClick={() => setDump('FIRST BUTTON')} />
                <div style={wrapperStyles.button} onClick={() => setDump('SECOND BUTTON')}/>
                <div style={wrapperStyles.button}/>
            </div>
            <MyDump />
        </div>
    );
};

export const wrapperStyles = {
    wrapper: {
        border: "solid",
        borderSize: "2px",
        borderColor: '#2113ab'
    },
    buttonContainer: {
        height: 40,
        display: 'flex',
        justifyContent: 'space-around',
        padding: 10
    },
    button: {
        height: 35,
        width: 80,
        backgroundColor: '#2213ab'
    }
}
