import React, {useState} from 'react';

const Pagination = ({currentPage,itemsPerPage,length,onPageChange }) => {

    const pagesCount = Math.ceil(length / itemsPerPage)
    const pages = []

    for(let i=1;i<=pagesCount;i++){
        pages.push(i)
    }

    return ( 
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
                {pages.map(page => {
                    return (
                        <li 
                            className={"page-item" + (currentPage===page && " active")} 
                            key={page}
                        >
                            <button className="page-link" onClick={()=>onPageChange(page)}>{page}</button>
                        </li>
                    )
                })}
            </ul>
        </nav>
     );
}

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage
    return items.slice(start, start+itemsPerPage)
}
 
export default Pagination;