import { Box, Typography, Pagination } from "@mui/material";
import { Metadata } from "../models/pagination";

interface Props {
  metaData: Metadata;
  onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
  const { currentPage, totalCount, totalPages, pageSize } = metaData;

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography color='grey' fontSize={13}>
        Displaying {(currentPage - 1) * pageSize + 1}-
        {currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize}{" "}
        of {totalCount} items
      </Typography>
      <Pagination
        color="secondary"
        size="small"
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
      />
    </Box>
  );
}
