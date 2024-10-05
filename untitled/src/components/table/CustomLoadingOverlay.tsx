import { Box, Spinner } from "@chakra-ui/react";

function CustomLoadingOverlay() {
  return <Box display="flex" justifyContent="center" alignItems="center" height="100%">
    <Spinner size="lg" color={"blue.400"} />
    <Box ml={3}>Loading Data...</Box>
  </Box>;
}

export default CustomLoadingOverlay;
