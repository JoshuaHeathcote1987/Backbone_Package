import React, { useState, useEffect } from 'react';

// Icons
import { BsTable } from 'react-icons/bs';


export default function TableRelationSelection({ icon, objects, selectedTable, relationType }) {

    const [message, setMessage] = useState('');

    const [values, setValues] = useState({
        local_table: selectedTable,
        foreign_table: "",
        relation_type: relationType,
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    useEffect(() => {
        // Update the local_table value in the values state when selectedTable changes
        setValues(prevValues => ({
            ...prevValues,
            local_table: selectedTable,
            relation_type: relationType,
        }));
    }, [selectedTable]);

    function handleSubmit(e) {
        e.preventDefault();

        const selectElement = e.target.foreign_table;
        selectElement.selectedIndex = 0;

        axios.post('/backbone/relation', values)
            .then(function (response) {
                console.log(response);
                setMessage(response.data.message);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <div id="hs-modal-table-relation" className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="bg-white border border-gray-200 rounded-t-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-4 sm:p-7">
                                <div className="text-center">
                                    <h2 className="block text-2xl font-bold text-gray-800 dark:text-gray-200">Create Relation</h2>
                                </div>

                                <div className="mt-5">
                                    <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600"><BsTable className="text-3xl" /></div>

                                    <div className="grid grid-cols-5 gap-4 mt-4">
                                        <div className="col-span-2 flex flex-col">
                                            <select name="local_table" id="local_table" className="rounded-lg">
                                                <option value={selectedTable}>{selectedTable}</option>
                                            </select>
                                        </div>

                                        <div className="col-span-1 flex flex-col">
                                            <div className="text-4xl mx-auto">{icon}</div>
                                        </div>

                                        <div className="col-span-2 flex flex-col">
                                            <select name="foreign_table" id="foreign_table" className="rounded-lg" onChange={handleChange} required>
                                                <option>Select table</option>
                                                {objects.map((obj, index) => (
                                                    <option key={index} value={obj}>{obj}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        {message && ( // Conditional rendering
                                            <div className="p-4 mt-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
                                                <span className="font-medium">{message}</span>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-center rounded-b-xl gap-x-2 py-3 px-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <button type="button" className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-modal-table-relation">
                                Close
                            </button>
                            <button type="submit" className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}