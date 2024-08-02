import React, { useContext, useEffect, useState } from 'react';
import voxaSchemas from "../data/VoxaSchemas.json"
import marcoSchema from "../data/MarcoSchemas.json"
import { AppContext } from '../contexts/context';
import { fetchInstancesMultipleSchemas, fetchInstancesSingleSchemas } from '../utils/fetchInstances';
import { fetchSingleSchema, fetchMultipleSchemas } from '../utils/fetchSchema';

const CheckInstances = ({ type = "instances" }) => {
    const token = import.meta.env.VITE_TOKEN_XPX;
    const [results, setResults] = useState({});
    const [schemasList, setSchemasList] = useState([])
    const { selectedModule } = useContext(AppContext)
    const [schemaIdInput, setSchemaId] = useState('')
    const [schemaIdOutput, setOutput] = useState('')

    function handleCustomUserInput() {
        if (type === "instances") {
            fetchInstancesSingleSchemas(token, schemaIdInput, setOutput)
        }
        if (type === "schemas") {
            fetchSingleSchema(token, schemaIdInput, setOutput)
        }
    }

    function handleListUserInput(schemaId) {
        if (type === "instances") {
            fetchInstancesMultipleSchemas(token, schemaId, setResults)
        }
        if (type === "schemas") {
            fetchMultipleSchemas(token, schemaId, setResults)
        }
    }

    useEffect(() => {
        switch (selectedModule) {
            case "voxa":
                setSchemasList(voxaSchemas)
                break;
            case "marco":
                setSchemasList(marcoSchema)
                break;
            default:
                setSchemasList([])
                break;
        }
    }, [selectedModule])

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 p-4 border rounded">
                <div className="flex justify-between items-center">
                    <div>
                        <div>Schema ID:
                            <input
                                type="text"
                                placeholder="Enter Schema ID"
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                onChange={(e) => setSchemaId(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={handleCustomUserInput}
                    >
                        Fetch Data
                    </button>
                </div>
                <div className="mt-2">
                    {type === "instances" && (schemaIdOutput !== undefined ? schemaIdOutput : 'No data')}
                    {type === "schemas" && (schemaIdOutput !== undefined ? <pre>{schemaIdOutput}</pre> : 'No data')}
                </div>
            </div>
            {schemasList.map((schema) => (
                <div key={schema.schemaId} className="mb-4 p-4 border rounded">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="font-bold">Schema Name: {schema.schemaName}</div>
                            <div>Schema ID: {schema.schemaId}</div>
                        </div>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={() => handleListUserInput(schema.schemaId)}
                        >
                            Fetch Data
                        </button>
                    </div>
                    <div className="mt-2">
                        Result:
                        {type === "instances" && (results[schema.schemaId] !== undefined ? results[schema.schemaId] : 'No data')}
                        {type === "schemas" && (results[schema.schemaId] !== undefined ? <pre>{results[schema.schemaId]}</pre> : 'No data')}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CheckInstances;
