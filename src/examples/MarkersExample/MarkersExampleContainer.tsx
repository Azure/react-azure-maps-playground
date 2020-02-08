import * as React from 'react'
import { MarkersExampleWrapper } from './MarkersExampleWrapper'
import { Paper } from '@material-ui/core'

export const MarkersExampleContainer = () => {
  return (
    <Paper elevation={2} style={styles.buttons}>
      My Dump container
      <MarkersExampleWrapper />
    </Paper>
  )
}

export const styles = {
  buttons: {
    padding: '15px',
    flex: 1
  }
}
