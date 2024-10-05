import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { removeNotification } from "../../../State/Notification/Action";
import toast, { Toaster } from "react-hot-toast";

const Notifications = () => {
    const {message,type} = useSelector((state)=>state.notifications);
    const dispatch = useDispatch();
    useEffect(()=>{
       if(message){
        if(type === 'success'){
            toast.success(message)
        }else if(type === 'error'){
            toast.error(message)
        }
       }
       dispatch(removeNotification());
    },[message, type, dispatch])
  return (
    <div>
      {/* Other components */}
      <Toaster 
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: 'w-auto max-w-xs p-4 rounded-lg shadow-lg bg-white',
          duration: 4000,  // Adjust toast duration
        }}
      />
    </div>
  )
}

export default Notifications