import React from "react";
import { createContext, useState } from "react";
export  const Context = createContext(null);

const ContextProvider = (props)=>{

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
