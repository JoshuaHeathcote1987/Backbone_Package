import React, { useContext, useState, useEffect } from 'react';

import { TableContext } from '@/Pages/Backend/Admin/Table/Contexts/TableContext';

export default function Test() {

    const { objects, setObjects } = useContext(TableContext);
    const columns = Object.keys(objects[0]);

    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {objects.map((row, index) => (
                    <tr key={index}>
                        {columns.map((column) => (
                            <td key={column}>{row[column]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}