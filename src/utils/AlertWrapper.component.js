import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { useContext } from 'react'
import { AlertContext } from '../contexts/Alert.context';

function AlertWrapper({ children }) {
  const { alertOpen, handleAlertClose, alertType, alertMsg } = useContext(
    AlertContext
  );

  return (
    <>
      {children}
      <Snackbar
        open={alertOpen}
        autoHideDuration={5000}
        onClose={handleAlertClose}
      >
        <Alert variant="filled" onClose={handleAlertClose} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AlertWrapper
