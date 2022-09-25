/* eslint-disable react-hooks/rules-of-hooks */
import {
  Badge,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  Avatar,
  Box,
  Wrap,
  WrapItem,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Trip } from "src/utils/interface";
import { UserData } from "./UserProfile";
import NextLink from "next/link";

interface Props {
  userDetail: UserData;
  trips: Trip[];
}

export const UserDetail = ({ userDetail, trips }: Props) => {
  const user = userDetail;

  const logo: string =
    "https://drive.google.com/file/d/1ti7xmFJWKOqUUNcuV2TEpMCb56NAaMU3/view";
  const tikTok: string =
    "https://pngfolio.com/images/all_img/copy/1631443365tiktok-icon.png";
  const instagram: string =
    "https://www.adverthia.com/wp-content/uploads/2020/02/instagram-logo-png-transparent-background-1024x1024-1.png";
  const facebook: string =
    "https://i0.wp.com/www.dpabogados.com/wp-content/uploads/2016/09/facebook-logo-png-transparent-background.png?fit=1600%2C1600&ssl=1";

  const tikTokPage = "https://www.tiktok.com/";
  const instaPage = "https://www.instagram.com/";
  const facePage = "https://es-es.facebook.com/";

  const defaulHashtags: string[] = ["trips", "traveling", "friends"];
  const arrInterests: string[] = user.keyWords
    ? user.keyWords.split(",")
    : defaulHashtags;

  const myCreatedActiveTrips: Trip[] = trips?.filter(
    (trip) => trip.planner.id === user?.id && trip.active === true
  );

  const tripsTravJoined: Trip[] = trips
    ?.map((trip) => trip.tripOnUser)
    .flat()
    .map((trip) => trip.trip);

  return (
    <>
      <Center pt={6}>
        <Heading>Meet the traveler</Heading>
      </Center>

      <Grid
        templateAreas={`
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"14vw 1fr 1vh"}
        gridTemplateColumns={"45vw 1fr"}
        h="60vh"
        gap="1"
        margin={"2%"}
        fontWeight="bold"
      >
        <GridItem pl="2" area={"nav"}>
          <Center py={2} h={"55vh"}>
            <Stack
              borderWidth="1px"
              borderRadius="lg"
              w={{ sm: "100%", md: "540px" }}
              height={{ sm: "476px", md: "20rem" }}
              direction={{ base: "column", md: "row" }}
              bg={useColorModeValue("white", "gray.900")}
              boxShadow={"2xl"}
              padding={4}
            >
              <Flex flex={1}>
                <Image
                  alt="image user"
                  borderRadius={"xl"}
                  objectFit="cover"
                  boxSize="100%"
                  src={user?.avatar ? user.avatar.toString() : logo}
                />
              </Flex>
              <Stack
                flex={1}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                p={1}
                pt={2}
              >
                <Heading fontSize={"2xl"} fontFamily={"body"}>
                  {user && user?.name}
                </Heading>
                <Text
                  textAlign={"center"}
                  color={useColorModeValue("gray.700", "gray.400")}
                  px={3}
                >
                  {user && user?.description}
                </Text>
                <Stack
                  align={"center"}
                  justify={"center"}
                  direction={"row"}
                  mt={6}
                >
                  {arrInterests?.map((int, index) => {
                    return (
                      <Badge
                        key={index}
                        px={2}
                        py={1}
                        bg={useColorModeValue("gray.50", "gray.800")}
                        fontWeight={"400"}
                      >
                        {`#${int.toLowerCase()}`}
                      </Badge>
                    );
                  })}
                </Stack>
                <Center>
                  <Stack
                    width={"100%"}
                    mt={"1rem"}
                    direction={"row"}
                    padding={2}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <a
                      href={user?.urlTikTok ? user.urlTikTok : tikTokPage}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                        boxSize="40px"
                        objectFit="cover"
                        src={tikTok}
                        alt="tikTok-icon"
                      />
                    </a>
                    <a
                      href={user?.urlInstagram ? user.urlInstagram : instaPage}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                        boxSize="40px"
                        objectFit="cover"
                        src={instagram}
                        alt="instagram-icon"
                      />
                    </a>
                    <a
                      href={user?.urlFaceBook ? user.urlFaceBook : facePage}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                        boxSize="40px"
                        objectFit="cover"
                        src={facebook}
                        alt="facebook-icon"
                      />
                    </a>
                  </Stack>
                </Center>
              </Stack>
            </Stack>
          </Center>
        </GridItem>
        <GridItem pl="2" area={"main"}>
          <Text
            textAlign={"center"}
            color={useColorModeValue("#293541", "#F3B46F")}
            fontSize={"xl"}
            fontFamily={"body"}
            p={2}
          >
            Trips created by this traveler
          </Text>
          <Wrap align={"center"} justify={"center"}>
            {myCreatedActiveTrips?.map((trip) => {
              return (
                <WrapItem key={trip.id}>
                  <Box
                    margin={2}
                    display={"flex"}
                    key={trip.id}
                    flexDirection={"column"}
                  >
                    <NextLink href={`/trips/${trip.id}`}>
                      <Avatar
                        cursor={"pointer"}
                        alignSelf={"center"}
                        name={trip.name}
                        rounded={"full"}
                        size={"lg"}
                        objectFit={"cover"}
                        src={trip.image ? trip.image.toString() : logo}
                      />
                    </NextLink>
                    <Text noOfLines={2} textAlign={"center"} fontSize={"sm"}>
                      {" "}
                      {trip.name}{" "}
                    </Text>
                  </Box>
                </WrapItem>
              );
            })}
          </Wrap>
        </GridItem>
        <GridItem pl="2" area={"footer"}>
          <Text
            textAlign={"center"}
            color={useColorModeValue("#293541", "#F3B46F")}
            fontSize={"xl"}
            fontFamily={"body"}
            p={2}
          >
            Trips traveler joined
          </Text>
          <Wrap align={"center"} justify={"center"}>
            {tripsTravJoined?.map((t: Trip) => {
              return (
                <WrapItem key={t.id}>
                  <Box
                    margin={2}
                    display={"flex"}
                    key={t.id}
                    flexDirection={"column"}
                  >
                    <NextLink href={`/trips/${t.id}`}>
                      <Avatar
                        cursor={"pointer"}
                        alignSelf={"center"}
                        name={t.name}
                        rounded={"full"}
                        size={"lg"}
                        objectFit={"cover"}
                        src={t.image ? t.image.toString() : logo}
                      />
                    </NextLink>
                    <Text noOfLines={2} textAlign={"center"} fontSize={"sm"}>
                      {" "}
                      {t.name}{" "}
                    </Text>
                  </Box>
                </WrapItem>
              );
            })}
          </Wrap>
        </GridItem>
      </Grid>
    </>
  );
};

export default UserDetail;
