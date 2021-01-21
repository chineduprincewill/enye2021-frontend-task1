import React, { useState } from 'react';
import Pagination from './Pagination';

export default function Datatable({ data }){

    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(20);
    let total;

    //const newdata = JSON.parse({ data });
    const columns = data[0] && Object.keys(data[0]);

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = data.slice(indexOfFirstData, indexOfLastData);
    total = data.length;

    //Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return( 
        <div>
            <Pagination dataPerPage={dataPerPage} total={total} paginate={paginate} /> 

            <table className="table table-responsive table-striped table-hover mt-2">
                <thead>
                    <tr>{data[0] && columns.map((heading) => <th>{heading}</th>)}</tr>
                </thead>
                <tbody>
                    {currentData.map(row => <tr>
                        {
                            columns.map(column => <td>{row[column]}</td>)
                        }
                    </tr>)}
                </tbody>
            </table>

            <Pagination dataPerPage={dataPerPage} total={total} paginate={paginate} /> 
        </div>
    )
}