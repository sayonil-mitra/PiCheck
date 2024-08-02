import React, { useState } from 'react';
import axios from 'axios';
import schemas from "../data/VoxaSchemas.json"

const CheckInstances = () => {
    const token = import.meta.env.VITE_TOKEN_XPX;
    const [results, setResults] = useState({});
    console.log(token)

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
            console.error('Error fetching data:', error);
            setResults((prevResults) => ({
                ...prevResults,
                [schemaId]: 'Error fetching data'
            }));
        }
    };

    return (
        <div className="container mx-auto p-4">
            {schemas.map((schema) => (
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
