import React, {  useReducer, createContext } from 'react'

import { driverReducer } from '../reducers/driverReducer';


//we have to provide an argument for typescript createContext
export const DriverContext = createContext(null);
const DriverContextProvider = (props) => {
    const [drivers, dispatch] =useReducer (driverReducer,[]);


    return (
        <DriverContext.Provider value={{drivers, dispatch}}>
            {props.children}
        </DriverContext.Provider>
    )
}

export default DriverContextProvider;