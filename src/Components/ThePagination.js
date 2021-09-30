import React from 'react';
import Pagination from 'react-bootstrap/Pagination'


const ThePagination = ({ dataAmount, paginate, currentPage }) =>
{
    const active = currentPage
    const items = new Array(dataAmount);
    for (let number = 1; number <= dataAmount; number++)
    {
        items.push(
            <Pagination.Item key={number}
                active={number === active}
                onClick={(e) =>
                {
                    paginate(number);
                    e.preventDefault();
                }}
            >
                {number}
            </Pagination.Item>,
        );
    }
    return (
        <Pagination>{items}</Pagination>

    );
};

export default ThePagination;