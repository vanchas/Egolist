import React from "react";

export default function Pagination({array, handler, current}) {

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item"
                    onClick={() => handler('prev')}
                >
                    <a className="page-link" href="#">
                        Previous
                    </a>
                </li>
                {array.map((page, i) => (
                    <li
                        key={i}
                        className={`${
                            current === i + 1 && "active"
                        } page-item`}
                        onClick={() => handler(i + 1)}
                    >
                        <a className="page-link" href="#">
                            {i + 1}
                        </a>
                    </li>
                ))}
                <li className="page-item"
                    onClick={() => handler('next')}
                >
                    <a className="page-link" href="#">
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    )
}