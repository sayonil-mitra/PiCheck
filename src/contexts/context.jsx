import React, { createContext, useState } from "react";

export const AppContext = createContext()

export default function AppContextProvider({ children }) {

    // xpx modules selector
    const [selectedModule, setModule] = useState("")
    const xpxModulesList = [
        "voxa",
        "marco",
        "moScribe",
        "itil",
        "sms",
        "adwize",
        "cxdelight"
    ];

    return <AppContext.Provider value={{ selectedModule, setModule, xpxModulesList }}>
        {children}
    </AppContext.Provider>
}