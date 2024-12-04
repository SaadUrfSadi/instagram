import React from "react";
import { createContext, useState } from "react";
// import ChangePhoto from "./Components/ChangePhoto/ChangePhoto";
// import { useFirebase } from "./Firebase";
// ==================================================
export  const Context = createContext(null);

const ContextProvider = (props)=>{
    // const firebase = useFirebase();
    
    // const [dpChange, setDpChange] = useState(false);

    // const changeDp = () => {
    //     setDpChange((prev)=> !prev)
    //     console.log("Toggling dpChange:", dpChange);
    //     console.log("iqra")

    // }

    const contextValue ={}

    return(
        <>
        <Context.Provider value={contextValue}>
          {props.children}
        </Context.Provider>
        </>
    )
}
export default ContextProvider
