import { PaginateDto } from "../../dtos/common/paginateDto.ts";
import { PaginatedDto } from "../../dtos/common/paginatedDto.ts";
import { useEffect, useState } from "react";
import BaseTable from "./BaseTable.tsx";
import Pagination from "./Pagination.tsx";

interface Props {
  columnDefs: any[],
  fetchingData: (request: PaginateDto) => Promise<PaginatedDto<any>>;
  initPageSize?: number;
  isLoading?: boolean
}

function PaginatedTable({
                          columnDefs,
                          fetchingData,
                          initPageSize = 10,
                          isLoading = false
                        }: Props) {
  const [rowData, setRowData] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initPageSize);
  const [totalRows, setTotalRows] = useState<number>(0);

  async function loadRowData(size, page) {
    const data = await fetchingData({
      size: size,
      page: page
    });
    setRowData(data.items);
    setTotalRows(data.total);
  }

  function changeCurrentPage(page: number) {
    setCurrentPage(page);
    loadRowData(pageSize, page);
  }

  function changePageSize(size: number) {
    setPageSize(size);
    loadRowData(size, 1);
  }

  return <>
    <BaseTable onGridReady={() => {
      loadRowData(initPageSize, 1);
    }} rowData={rowData} columnDefs={columnDefs} isLoading={isLoading}/>
    <Pagination
      currentPage={currentPage}
      pageSize={pageSize}
      totalRows={totalRows}
      onPageChange={changeCurrentPage}
      setPageSize={changePageSize}
    />
  </>;
}

export default PaginatedTable;
