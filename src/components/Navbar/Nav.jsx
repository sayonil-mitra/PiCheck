import React, { useEffect, useState } from 'react';

const Navbar = () => {
    const [selectedTab, setSelectedTab] = useState('Get Instances');

    useEffect(() => {
        console.log(location.pathname)
        if (location.pathname === "/schemas") {
            setSelectedTab('Get Schema')
        }
    })

    return (
        <nav className="bg-gray-800 w-full">
            <div className="container mx-auto px-4">
                <div className="flex justify-center items-center h-16">
                    <div className="flex space-x-8">
                        <a
                            href="/"
                            onClick={() => setSelectedTab('Get Instances')}
                            className={`${selectedTab === 'Get Instances' ? 'text-yellow-500' : 'text-white'
                                } hover:text-gray-300`}
                        >
                            Get Instances
                        </a>
                        <a
                            href="/schemas"
                            onClick={() => setSelectedTab('Get Schema')}
                            className={`${selectedTab === 'Get Schema' ? 'text-yellow-500' : 'text-white'
                                } hover:text-gray-300`}
                        >
                            Get Schema
                        </a>
                        <a
                            href="/create-schema"
                            onClick={() => setSelectedTab('Create Schemas')}
                            className={`${selectedTab === 'Create Schemas' ? 'text-yellow-500' : 'text-white'
                                } hover:text-gray-300`}
                        >
                            Create Schemas
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
