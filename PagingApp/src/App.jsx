import React, { useEffect, useState } from 'react';
import 'devextreme/dist/css/dx.light.css';
import { DataGrid } from 'devextreme-react/data-grid';
import CustomPagingComponent from './Pager';
import './App.css'
import Loader from './Loader';
 
function App() {
    const [pageSize, setPageSize] = useState(20);
    const [pageIndex, setPageIndex] = useState(0);
    const [loading, setLoading] = useState();
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true)

        const apiUrl = `https://localhost:7080/Test/GetRoles?page=${pageIndex}&pageSize=${pageSize}`;

        // Make a GET request to the server using fetch()
        fetch(apiUrl)
        .then((response) => {
            // Check if the response status is OK (status code 200)
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }

            // Parse the response as JSON
            return response.json();
        })
        .then((data) => {
            // Handle the JSON data here

            setDataSource(data)
            console.log('Data received');
            setLoading(false)

            // Perform any further processing or rendering of the data
        })
        .catch((error) => {
            // Handle errors, such as network issues or invalid JSON
            console.error('Fetch error:', error);
            setLoading(false)
        });
        
    }, [pageIndex, pageSize])

    return (
        <>
            <div className="App">
                <DataGrid
                id="dataGrid"
                dataSource={dataSource}
                height={650}
                paging={false}
                >
                    {/* Configuration goes here */}
                </DataGrid>
                <CustomPagingComponent 
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    setPageIndex={setPageIndex}
                    setPageSize={setPageSize}
                    totalItems={1090889}
                />
            </div>
            {loading && 
            
                (<div id="loader">
                    <Loader />
                </div>)
            }
        </>
    );
}
 
export default App;