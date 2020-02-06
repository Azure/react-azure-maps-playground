// @flow
import * as React from 'react';
import MyDump from "./MyDump";
import { MyDumpWrapper } from "./MyDumpWrapper";
import { Paper } from '@material-ui/core';


type Props = {

};
export const MyDumpContainer = (props: Props) => {
    return (
        <Paper elevation={2} style={styles.buttons} >
            My Dump container
                <MyDumpWrapper />
        </Paper >
    );
};


export const styles = {
    buttons: {
        padding: '15px',
        flex: 1,
    }
}
