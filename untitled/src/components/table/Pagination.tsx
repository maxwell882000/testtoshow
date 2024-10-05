import { Button, HStack, Select, Box, Text } from "@chakra-ui/react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalRows: number;
  onPageChange: (page: number) => void;
  setPageSize: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
                                                 currentPage,
                                                 pageSize,
                                                 totalRows,
                                                 onPageChange,
                                                 setPageSize,
                                               }) => {
  const totalPages = Math.ceil(totalRows / pageSize);

  const generatePageNumbers = () => {
    const pages = [];

    // Determine the range of visible pages
    const pageWindowSize = 3; // Number of pages before and after the current page
    const startPage = Math.max(2, currentPage - pageWindowSize); // Start from page 2 onwards
    const endPage = Math.min(totalPages - 1, currentPage + pageWindowSize);

    // Show the first page (always visible)
    pages.push(1);

    // Add dots before the window of pages if needed
    if (startPage > 2) {
      pages.push("...");
    }

    // Add the visible range of pages (current page +/- window size)
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add dots after the window of pages if needed
    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    // Show the last page (always visible)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <HStack justify="space-between" mt={4}>
      <Box>
        <Select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          width="100px"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </Select>
      </Box>
      <HStack>
        <Button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>

        {/* Render page number buttons with dots */}
        {pageNumbers.map((page, index) =>
          typeof page === "string" ? (
            <Text key={index} mx={1}>
              {page}
            </Text>
          ) : (
            <Button
              key={page}
              onClick={() => onPageChange(page)}
              variant={currentPage === page ? "solid" : "outline"}
              colorScheme={currentPage === page ? "blue" : "gray"}
            >
              {page}
            </Button>
          )
        )}

        <Button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </HStack>
    </HStack>
  );
};

export default Pagination;
