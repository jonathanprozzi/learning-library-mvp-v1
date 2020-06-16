import Link from "next/link";
import {
  PseudoBox,
  AspectRatioBox,
  Image,
  Box,
  Badge,
  Text,
  ButtonGroup,
  Button,
  Flex,
  Tag,
} from "@chakra-ui/core";

type Props = {
  data: {
    title: string;
    id: string;
    os: string;
    pathway: string;
    image: string[];
    url: string;
  };
};

const ResourceCard = ({ data }: Props) => {
  return (
    <PseudoBox
      w="100%"
      h="auto"
      maxW="md"
      overflow="hidden"
      rounded="lg"
      borderWidth="1px"
    >
      <Link href="resources/[id]" as={`/resources/${data.id}`}>
        <PseudoBox _hover={{ cursor: "pointer" }}>
          <AspectRatioBox height="300px" ratio={16 / 9}>
            <Image src={data.image[0].url} alt={data.title} objectFit="cover" />
          </AspectRatioBox>
        </PseudoBox>
      </Link>
      <Box p="4" alignItems="center" justifyContent="center">
        <Box d="flex" alignItems="baseline">
          <Flex direction="row">
            <Badge rounded="md" marginRight="1" variantColor="purple">
              {data.os}
            </Badge>
            <Badge rounded="md" marginLeft="1" variantColor="teal">
              {data.pathway}
            </Badge>
          </Flex>
        </Box>
        <Box
          as="h3"
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          ml={0}
          paddingY={2}
        >
          {data.title}
        </Box>
        <Link href="resources/[id]" as={`/resources/${data.id}`}>
          <Button rightIcon="view" variantColor="gray">
            Learn More
          </Button>
        </Link>
      </Box>
    </PseudoBox>
  );
};

export default ResourceCard;
