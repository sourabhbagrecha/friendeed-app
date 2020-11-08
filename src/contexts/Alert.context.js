import React, { createContext, useState } from "react";

const AlertContext = createContext();
const AlertProvider = (props) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("warning"); 
  const setAlert = (type, msg, open=true) => {
    if (type === "error" || !msg){
      msg="Something went wrong"
    }
    setAlertOpen(open);
    setAlertType(type);
    setAlertMsg(msg)
  }
  const handleAlertClose = () => {
    setAlertOpen(false);
  }
  return (
    <AlertContext.Provider
      value={{
        alertOpen,
        alertType,
        alertMsg,
        setAlert,
        setAlertOpen,
        handleAlertClose
      }}
    >
      {props.children}
    </AlertContext.Provider>
  )
}

export {AlertContext, AlertProvider};