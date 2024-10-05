import React from "react";
import {Box} from "@chakra-ui/react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-alpine.css";
import CustomLoadingOverlay from "./CustomLoadingOverlay.tsx"; // Theme CSS

interface BaseTableProps {
    rowData: any[]; // Accepts any row data array
    columnDefs: any[]; // Accepts column definitions array
    onGridReady?: () => void;
    isLoading?: boolean;
}

const BaseTable: React.FC<BaseTableProps> = ({rowData, columnDefs, onGridReady, isLoading = false}) => {
    return (
        <Box className="ag-theme-alpine" w="100%">
            <AgGridReact
                loading={isLoading}
                onGridReady={onGridReady}
                loadingOverlayComponent={CustomLoadingOverlay}
                defaultColDef={{
                    flex: 1
                }} rowData={rowData} columnDefs={columnDefs} domLayout="autoHeight"/>
        </Box>
    );
};

export default BaseTable;