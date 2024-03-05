import React, { useState, useEffect } from 'react';
import "./style.css";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  // Fetch data from JSON placeholder API
  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Logic to calculate total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Logic to paginate the data
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Logic to display items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Logic to display pagination numbers with limited range (3-4 pages)
  const renderPaginationNumbers = () => {
    const pagesToShow = 4; // Adjust this number as needed
    const pageNumbers = [];

    // Calculate starting and ending page numbers
    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    // Adjust starting page if ending page is too close to the last page
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    // Generate page numbers within the range
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((pageNumber) => (
      <li
        key={pageNumber}
        onClick={() => paginate(pageNumber)}
        className={pageNumber === currentPage ? "active" : ""}
      >
        {pageNumber}
      </li>
    ));
  };

  // Logic to handle next page
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Logic to handle previous page
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="pagination-container">
      {/* Display current page */}
      <div>Current Page: {currentPage}</div>

      {/* Display current items or loading message */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {currentItems.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}

      {/* Display pagination */}
      <ul className="pagination">
        {/* Previous button */}
        <li
          onClick={prevPage}
          className={currentPage === 1 ? "disabled" : ""}
        >
          Previous
        </li>

        {/* Render pagination numbers */}
        {renderPaginationNumbers()}

        {/* Next button */}
        <li
          onClick={nextPage}
          className={currentPage === totalPages ? "disabled" : ""}
        >
          Next
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
