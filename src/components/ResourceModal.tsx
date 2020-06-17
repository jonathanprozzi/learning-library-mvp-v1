import Link from "next/link";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  AspectRatioBox,
  Box,
  Badge,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Alert,
  Spinner,
  Grid,
  SimpleGrid,
  Link as ChakraLink,
  Icon,
  Stack,
  Tag,
  TagLabel,
  TagIcon,
  Divider,
} from "@chakra-ui/core";
import { TiTag } from "react-icons/ti";
const ReactMarkdown = require("react-markdown");

// type Props = {
//   data: {
//     title: string;
//     id: string;
//     os: string;
//     pathway: string;
//     image: string[];
//     url: string;
//     type: string;
//     author: string;
//     level: string;
//   };
// };

const ResourceModal = ({
  showResourceModal,
  closeResourceModal,
  title,
  image,
  description,
  os,
  pathway,
  url,
  tags,
  author,
  authorSite,
  type,
  rating,
  level,
}) => {
  return (
    <Modal isOpen={showPostModal} onClose={closePostModal} isCentered size="xl">
      <ModalOverlay bg="black" opacity=".7" />
      <ModalContent d="flex" alignItems="center" alignContent="center">
        <ModalCloseButton />
        <ModalHeader>{title}</ModalHeader>
        <ModalBody marginTop={2}>
          <Flex direction="column" justify="center" align="center">
            <Box
              maxWidth="960px"
              marginY={8}
              paddingX={8}
              paddingY={4}
              bg="white"
              rounded="md"
            >
              <SimpleGrid columns={[1, 1, 2, 2]} spacing={8} marginY={8}>
                <AspectRatioBox height="300px" ratio={16 / 9}>
                  <Image src={image} alt={title} objectFit="cover" />
                </AspectRatioBox>
                <Flex direction="column" align="flex-start">
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                  >
                    {type} &bull; {level}
                  </Box>
                  <Box d="flex" marginY="1" alignItems="center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <Icon
                          key={i}
                          name="star"
                          color={i < rating ? "purple.500" : "purple.100"}
                        />
                      ))}
                  </Box>
                  <Box paddingY={2} alignItems="center" justifyContent="center">
                    <Flex direction="row">
                      <Badge
                        padding="1"
                        rounded="md"
                        marginRight="1"
                        variantColor="purple"
                      >
                        {os}
                      </Badge>
                      <Badge
                        padding={1}
                        rounded="md"
                        marginLeft="1"
                        variantColor="teal"
                      >
                        {pathway}
                      </Badge>
                    </Flex>
                  </Box>
                  {tags && (
                    <Stack spacing={2} isInline>
                      {tags.map((tag) => (
                        <Tag
                          rounded="md"
                          size="md"
                          variantColor="gray"
                          variant="subtle"
                        >
                          <TagLabel>{tag}</TagLabel>
                          <TagIcon icon={TiTag} />
                        </Tag>
                      ))}
                    </Stack>
                  )}
                  <Stack marginTop={4}>
                    <Text>
                      Check it out:{" "}
                      <ChakraLink href={url} isExternal color="blue.500">
                        {title} <Icon name="external-link" mx="2px" />
                      </ChakraLink>
                    </Text>
                    <Text>
                      Contributed by{" "}
                      <ChakraLink href={authorSite} isExternal color="blue.500">
                        {author}
                      </ChakraLink>{" "}
                    </Text>
                  </Stack>
                </Flex>
              </SimpleGrid>
              <Divider />
              <Text>
                <ReactMarkdown source={description} />
              </Text>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

{
  /* // export async function getServerSideProps({ params, query }) {
//   const res = await fetch(
//     `https://api.airtable.com/v0/${baseId}/${tableName}/${params.id}?api_key=${apiKey}`
//   );
//   const data = await res.json();

//   return {
//     props: {
//       id: data.id,
//       title: data.fields["Resource Title"],
//       image: data.fields["Featured Image"][0].url,
//       url: data.fields["URL"],
//       os: data.fields["Operating System"],
//       pathway: data.fields["Pathway"],
//       level: data.fields["Skill Level"],
//       tags: data.fields["Tags"] || null,
//       description: data.fields["Description"],
//       type: data.fields["Content Type"],
//       author: data.fields["Author"],
//       authorSite: data.fields["Author Site"] || null,
//       rating: data.fields["Rating"],
//     },
//   };
} */
}

export default ResourceModal;