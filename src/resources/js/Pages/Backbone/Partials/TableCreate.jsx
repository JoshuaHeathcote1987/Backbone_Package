import React, { useState, useEffect } from 'react';

// Icons
import { BsDatabaseAdd } from 'react-icons/bs';
import { IoMdAddCircle } from 'react-icons/io';
import { IoIosRemoveCircle } from 'react-icons/io';

const column_types = ['bigIncrements', 'bigInteger', 'binary', 'boolean', 'char', 'dateTimeTz', 'dateTime', 'date', 'decimal', 'double', 'enum', 'float', 'foreignId', 'foreignIdFor', 'foreignUlid', 'foreignUuid', 'geometryCollection', 'geometry', 'id', 'increments', 'integer', 'ipAddress', 'json', 'jsonb', 'lineString', 'longText', 'macAddress', 'mediumIncrements', 'mediumInteger', 'mediumText', 'morphs', 'multiLineString', 'multiPoint', 'multiPolygon', 'nullableMorphs', 'nullableTimestamps', 'nullableUlidMorphs', 'nullableUuidMorphs', 'point', 'polygon', 'rememberToken', 'set', 'smallIncrements', 'smallInteger', 'softDeletesTz', 'softDeletes', 'string', 'text', 'timeTz', 'time', 'timestampTz', 'timestamp', 'timestampsTz', 'timestamps', 'tinyIcrements', 'tinyInteger', 'tinyText', 'unsignedBigInteger', 'unsignedDecimal', 'unsignedInteger', 'unsignedMediumInteger', 'unsignedSmallInteger', 'unsignedTinyInteger', 'ulidMorphs', 'uuidMorphs', 'ulid', 'uuid', 'year'];

export default function TableCreate({ }) {

    const [message, setMessage] = useState('');
    const [name, setName] = useState('');

    const [values, setValues] = useState([
        {
            column_name: '',
            column_type: '',
        },
    ]);

    const addTableRow = () => {
        const newTableRow = {
            column_name: '',
            column_type: '',
        };

        setValues(prevTableRows => [...prevTableRows, newTableRow]);
    };

    const removeTableRow = indexToRemove => {
        setValues(prevTableRows => {
            // Filter out the row with the specified index
            const updatedTableRows = prevTableRows.filter((_, index) => index !== indexToRemove);
            return updatedTableRows;
        });
    };

    const handleInputChange = (event) => {
        setName(event.target.value);
    };

    function handleChange(e, index) {
        const { id, value } = e.target;

        setValues(prevRows => {
            const updatedRows = [...prevRows];
            updatedRows[index][id] = value;
            return updatedRows;
        });
    }

    useEffect(() => {

    }, [values]);

    function handleSubmit(e) {
        e.preventDefault();

        values.push(name);

        axios.post('/backbone/tables', values)
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
            <div id="hs-modal-create-database" className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-4 sm:p-7">
                                <div className="text-center">
                                    <h2 className="block text-2xl font-bold text-gray-800 dark:text-gray-200">Create Table</h2>
                                </div>
                                <div className="mt-5">
                                    <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600"><BsDatabaseAdd className="text-3xl" /></div>
                                    <div>
                                        <div class="mb-6">
                                            <div class="flex my-3 items-center bg-yellow-100 rounded-lg p-4 border-l-4 border-yellow-600">
                                                <div class="text-yellow-800">
                                                    <p class="font-semibold">Alert</p>
                                                    <p>Table names have to be plural for relationship creation to work. e.g. worker, workers</p>
                                                </div>
                                            </div>

                                            <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Table Name</label>
                                            <input type="text" id="name" onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                        <div className="mb-4">
                                            <IoMdAddCircle className="text-3xl" onClick={addTableRow} />
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="w-6/12"><label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Column Name</label></div>
                                            <div className="w-5/12"><label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data Type</label></div>
                                            <div className="w-1/12"><label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label></div>
                                        </div>
                                        <div>
                                            {values.map((row, index) => (
                                                <div className="flex gap-3 my-2" key={index}>
                                                    <div className="w-6/12">
                                                        <input
                                                            type="text"
                                                            id="column_name"
                                                            value={row.column_name}
                                                            onChange={e => handleChange(e, index)}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                                                        />
                                                    </div>
                                                    <div className="w-5/12">
                                                        <select
                                                            id="column_type"
                                                            value={row.column_type}
                                                            onChange={e => handleChange(e, index)}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            required
                                                        >
                                                            <option>*</option>
                                                            {column_types.map((obj, index) => (
                                                                <option key={index} value={obj}>
                                                                    {obj}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="w-1/12 flex justify-center items-center">
                                                        <IoIosRemoveCircle className="text-3xl text-red-500 hover:text-red-600" onClick={() => removeTableRow(index)} />
                                                    </div>
                                                </div>
                                            ))}
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
                                <button type="button" className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-modal-create-database">
                                    Close
                                </button>
                                <button type="submit" className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                    Create
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}