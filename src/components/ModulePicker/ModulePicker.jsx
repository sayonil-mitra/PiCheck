import { useContext } from "react";
import { AppContext } from "../../contexts/context";

export default function ModulePicker() {

    const { selectedModule, setModule, xpxModulesList } = useContext(AppContext)

    return <div className="flex justify-center space-x-4 p-4">
        {xpxModulesList.map((label, index) => (
            <button
                key={index}
                className={`${selectedModule === label ? "bg-blue-700" : "bg-blue-500"}  text-white px-4 py-2 rounded `}
                onClick={() => setModule(label)}
            >
                {label}
            </button>
        ))}
    </div>

}