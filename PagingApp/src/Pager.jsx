// function CustomPagingComponent() {
//   const [pageSize, setPageSize] = useState(10);  // Default page size
//   const [pageIndex, setPageIndex] = useState(0); // Default page index

//   const handlePageChange = (e) => {
//     setPageSize(e.component.option('pageSize'));
//     setPageIndex(e.component.option('pageIndex'));

//     // You can perform custom actions here using pageSize and pageIndex
//     // For example, fetch data for the new page or update other components based on paging values
//   }

//   return (
//     <div>
//       <Pager
//         visible={true}
//         pageSize={pageSize}
//         pageIndex={pageIndex}
//         totalCount={100} // Total number of items (you can adjust this)
//         onPageChanged={handlePageChange}
//       />
//       {/* You can render other components or display paging values as needed */}
//       <p>Page Size: {pageSize}</p>
//       <p>Page Index: {pageIndex}</p>
//     </div>
//   );
// }

// export default CustomPagingComponent;


// import React, { useState } from 'react';

// function CustomPagingComponent({pageSize, pageIndex, setPageIndex, setPageSize}) {
//   const handlePageSizeChange = (newPageSize) => {
//     setPageSize(newPageSize);
//     setPageIndex(0); // Reset the page index to 0 when changing page size
//     // You can perform custom actions here when the page size changes
//   }

//   const handlePageIndexChanged = (newPageIndex) => {
//     setPageIndex(newPageIndex);
//     // You can perform custom actions here when the page index changes
//   }

//   const totalItems = 1090889; // Total number of items (you can adjust this)

//   const totalPages = Math.ceil(totalItems / pageSize);

//   return (
//     <div>
//       <div>
//         Page Size: {pageSize} &nbsp;
//         <button onClick={() => handlePageSizeChange(5)}>5</button>
//         <button onClick={() => handlePageSizeChange(10)}>10</button>
//         <button onClick={() => handlePageSizeChange(20)}>20</button>
//         <button onClick={() => handlePageSizeChange(50)}>50</button>
//         <button onClick={() => handlePageSizeChange(100)}>100</button>
//       </div>
//       <div>
//         Page Index: {pageIndex}
//       </div>
//       <div>
//         Total Pages: {totalPages}
//       </div>
//       <button
//         onClick={() => handlePageIndexChanged(pageIndex - 1)}
//         disabled={pageIndex === 0}
//       >
//         Previous
//       </button>
//       <button
//         onClick={() => handlePageIndexChanged(pageIndex + 1)}
//         disabled={pageIndex === totalPages - 1}
//       >
//         Next
//       </button>
//     </div>
//   );
// }

// export default CustomPagingComponent;


// import React from 'react';

// function CustomPagingComponent({ pageSize, pageIndex, setPageIndex, setPageSize }) {
//   const totalItems = 1090889; // Total number of items (you can adjust this)
//   const totalPages = Math.ceil(totalItems / pageSize);

//   // Determine the number of page buttons to display around the current page
//   const maxButtonsToShow = 5; // Adjust as needed
//   const buttonsBeforeCurrent = Math.floor((maxButtonsToShow - 1) / 2);
//   const buttonsAfterCurrent = maxButtonsToShow - buttonsBeforeCurrent - 1;

//   // Create an array of page numbers to display
//   const pageButtons = [];
//   let startPage = Math.max(1, pageIndex - buttonsBeforeCurrent);
//   let endPage = Math.min(totalPages, pageIndex + buttonsAfterCurrent);

//   if (pageIndex <= buttonsBeforeCurrent) {
//     endPage = maxButtonsToShow;
//   } else if (pageIndex >= totalPages - buttonsAfterCurrent) {
//     startPage = totalPages - maxButtonsToShow + 1;
//   }

//   for (let i = startPage; i <= endPage; i++) {
//     pageButtons.push(
//       <button
//         key={i}
//         onClick={() => handlePageChange(i)}
//         className={i === pageIndex ? 'active' : ''}
//       >
//         {i}
//       </button>
//     );
//   }

//   const handlePageChange = (newPageIndex) => {
//     setPageIndex(newPageIndex);
//   };

//   const handlePageSizeChange = (newPageSize) => {
//     setPageSize(newPageSize);
//     setPageIndex(1); // Reset to the first page when changing page size
//   };

//   return (
//     <div>
//       <div>
//         Page Size: {pageSize} &nbsp;
//         {[5, 10, 20, 50, 100].map((size) => (
//           <button key={size} onClick={() => handlePageSizeChange(size)}>
//             {size}
//           </button>
//         ))}
//       </div>
//       <div>
//         {pageIndex > 1 && (
//           <button onClick={() => handlePageChange(pageIndex - 1)}>Previous</button>
//         )}
//         {pageButtons}
//         {pageIndex < totalPages && (
//           <button onClick={() => handlePageChange(pageIndex + 1)}>Next</button>
//         )}
//       </div>
//       <div>
//         Total Pages: {totalPages}
//       </div>
//     </div>
//   );
// }

// export default CustomPagingComponent;


import React from 'react';

function CustomPagingComponent({ pageSize, pageIndex, setPageIndex, setPageSize, totalItems }) {
  // Calculate the total pages by subtracting 1 to account for zero-based indexing
  const totalPages = Math.ceil(totalItems / pageSize) - 1;

  // Determine the number of page buttons to display around the current page
  const maxButtonsToShow = 5; // Adjust as needed
  const buttonsBeforeCurrent = Math.floor((maxButtonsToShow - 1) / 2);
  const buttonsAfterCurrent = maxButtonsToShow - buttonsBeforeCurrent - 1;

  // Create an array of page numbers to display
  const pageButtons = [];
  let startPage = Math.max(0, pageIndex - buttonsBeforeCurrent);
  let endPage = Math.min(totalPages, pageIndex + buttonsAfterCurrent);

  if (pageIndex <= buttonsBeforeCurrent) {
    endPage = maxButtonsToShow - 1;
  } else if (pageIndex >= totalPages - buttonsAfterCurrent) {
    startPage = totalPages - maxButtonsToShow + 1;
  }

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={i === pageIndex ? 'active' : ''}
      >
        {i + 1} {/* Add 1 to display 1-based page numbers */}
      </button>
    );
  }

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPageIndex(0); // Reset to the first page when changing page size
  };

  return (
    <div className='pager'>
      <div>
        {[20, 50, 100].map((size) => (
          <button key={size} onClick={() => handlePageSizeChange(size)}>
            {size}
          </button>
        ))}
      </div>
      <div>
        {pageIndex > 0 && (
          <button onClick={() => handlePageChange(pageIndex - 1)}>Previous</button>
        )}
        {startPage > 0 && (
          <>
            <button onClick={() => handlePageChange(0)}>1</button>
            {startPage > 1 && <span>...</span>}
          </>
        )}
        {pageButtons}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span>...</span>}
            <button onClick={() => handlePageChange(totalPages)}>{totalPages + 1}</button> {/* Add 1 for 1-based page numbering */}
          </>
        )}
        {pageIndex < totalPages && (
          <button onClick={() => handlePageChange(pageIndex + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}

export default CustomPagingComponent;


