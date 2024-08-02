import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import voxaSchemas from "../data/VoxaSchemas.json"
import { AppContext } from '../contexts/context';

const CheckInstances = () => {
    const token = import.meta.env.VITE_TOKEN_XPX;
    const [results, setResults] = useState({});
    const [schemasList, setSchemasList] = useState([])
    const { selectedModule } = useContext(AppContext)
    const fetchData = async (schemaId) => {
        const url = `https://ig.gov-cloud.ai/tf-entity-ingestion/v1.0/schemas/${schemaId}/instances/list`;

        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const entitiesLength = response.data.entities.length;
            setResults((prevResults) => ({
                ...prevResults,
                [schemaId]: entitiesLength
            }));
        } catch (error) {
            setResults((prevResults) => ({
                ...prevResults,
                [schemaId]: error?.response?.data?.errorObject?.errorMessage
            }));
        }
    };

    useEffect(() => {
        switch (selectedModule) {
            case "voxa":
                setSchemasList(voxaSchemas)
                break;
            default:
                setSchemasList([])
                break;
        }
    }, [selectedModule])

    return (
        <div className="container mx-auto p-4">
            {schemasList.map((schema) => (
                <div key={schema.schemaId} className="mb-4 p-4 border rounded">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="font-bold">Schema Name: {schema.schemaName}</div>
                            <div>Schema ID: {schema.schemaId}</div>
                        </div>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={() => fetchData(schema.schemaId)}
                        >
                            Fetch Data
                        </button>
                    </div>
                    <div className="mt-2">
                        Result: {results[schema.schemaId] !== undefined ? results[schema.schemaId] : 'No data'}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CheckInstances;
