import Header from "./Header";
import { Footer } from "./Footer";
import { Box, Flex } from "@chakra-ui/core";

const SiteLayout: React.FC = ({ children }) => {
  return (
    <Box overflowX="hidden" margin="0 auto" bg="gray.100">
      <Header />
      <Box>{children}</Box>
      <Footer />
    </Box>
  );
};

export default SiteLayout;
