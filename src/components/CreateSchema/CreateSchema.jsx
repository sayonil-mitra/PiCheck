import React, { useState } from 'react';
import SchemaCreationApi from '../../utils/createSchema';

const CreateSchema = () => {
    const [entityName, setEntityName] = useState('');
    const [description, setDescription] = useState('');
    const [universe, setUniverse] = useState('');
    const [attributes, setAttributes] = useState([{ name: '', nestedName: '', type: 'string', required: false, primaryKey: false }]);
    const [result, setResult] = useState({});

    const handleAddAttribute = () => {
        setAttributes([...attributes, { name: '', nestedName: '', type: 'string', required: false, primaryKey: false }]);
    };

    const handleAttributeChange = (index, field, value) => {
        const newAttributes = attributes.map((attr, i) => {
            if (i === index) {
                return { ...attr, [field]: value };
            }
            return attr;
        });
        setAttributes(newAttributes);
    };

    const handlePrimaryKeyChange = (index, isPrimaryKey) => {
        const newAttributes = attributes.map((attr, i) => {
            if (i === index) {
                return { ...attr, primaryKey: isPrimaryKey, required: isPrimaryKey };
            }
            return attr;
        });
        setAttributes(newAttributes);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!entityName || !description || !universe || attributes.some(attr => !attr.name || !attr.nestedName)) {
            setResult('Entity Name, Description, Universe, Attribute Name and Nested Name cannot be empty');
            return;
        }

        const primaryKey = attributes.filter(attr => attr.primaryKey).map(attr => attr.name);

        SchemaCreationApi(entityName, description, universe, attributes, primaryKey, setResult)
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg">
            {result && result?.statusCode < 300 && <div className="mb-4 p-2 bg-green-300 text-green-600 rounded">{result?.statusText}</div>}
            {result && result?.statusCode >= 400 && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{result?.statusText}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4 p-4 bg-white border border-gray-300 rounded flex justify-between space-x-4">
                    <div className="flex-1">
                        <label className="block text-gray-700 font-bold mb-2">Entity Name</label>
                        <input
                            type="text"
                            value={entityName}
                            onChange={(e) => setEntityName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 font-bold mb-2">Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 font-bold mb-2">Universe</label>
                        <input
                            type="text"
                            value={universe}
                            onChange={(e) => setUniverse(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                </div>

                {attributes.map((attr, index) => (
                    <div key={index} className="mb-4 p-4 bg-white border border-gray-300 rounded flex justify-between space-x-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 font-bold mb-2">Attribute Name</label>
                            <input
                                type="text"
                                value={attr.name}
                                onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 font-bold mb-2">Nested Name</label>
                            <input
                                type="text"
                                value={attr.nestedName}
                                onChange={(e) => handleAttributeChange(index, 'nestedName', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 font-bold mb-2">Type</label>
                            <select
                                value={attr.type}
                                onChange={(e) => handleAttributeChange(index, 'type', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="string">string</option>
                                <option value="boolean">boolean</option>
                                <option value="number">number</option>
                                <option value="json">json</option>
                            </select>
                        </div>
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                checked={attr.primaryKey}
                                onChange={(e) => handlePrimaryKeyChange(index, e.target.checked)}
                                className="mr-2"
                            />
                            <label className="text-gray-700 font-bold">Primary Key</label>
                        </div>
                    </div>

                ))}
                <button
                    type="button"
                    onClick={handleAddAttribute}
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add Attribute
                </button>
                <button
                    type="submit"
                    className="w-full p-2 mt-4 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateSchema;
