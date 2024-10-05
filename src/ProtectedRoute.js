import { useEffect } from "react";

export const ProtectedRoute = ({isAuthenticated,children,showModal})=>{
    useEffect(() => {
        if (!isAuthenticated) {
          showModal(); 
        }
      }, [isAuthenticated, showModal]);
    return children;
}