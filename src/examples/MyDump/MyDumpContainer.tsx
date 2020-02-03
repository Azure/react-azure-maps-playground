// @flow
import * as React from 'react';
import MyDump from "./MyDump";
import {MyDumpWrapper} from "./MyDumpWrapper";

type Props = {

};
export const MyDumpContainer = (props: Props) => {
    return (
        <div>
            <div style={styles.buttons}>
                My Dump container
                <MyDumpWrapper/>

            </div>
        </div>
    );
};


export const styles = {
    buttons: {
        border: "solid",
        borderSize: "2px",
        flex: 1,
        borderColor: '#885875'
    }
}
