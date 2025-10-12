import React from 'react'
import { ToastContainer, toast } from "react-toastify";

const ToastComponent = ({ closeToast, toastProps }) => {
  return (
    <div>
        Lorem ipsum dolor {toastProps.position}
        <button>Retry</button>
        <button onClick={closeToast}>Close</button>
    </div>
  )
}

export default ToastComponent