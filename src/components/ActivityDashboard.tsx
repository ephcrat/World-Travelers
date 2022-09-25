import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Link,
  Select,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { SetStateAction, useEffect, useState } from "react";
import { Activity } from "src/utils/interface";
import ActivityTable from "./ActivityTable";
import NextLink from "next/link";
import Pagination from "./pagination";
import { Select as ReactSelect } from "chakra-react-select";
export const ActivityDashboard = ({
  activities,
}: {
  activities: Activity[];
}) => {
  const captions = [
    "activity",
    "price",
    "availability",
    "active",
    "description",
    "edit",
    "delete",
  ];
  const cities = activities.map((a) => a.city.name);
  const citiesUnique: string[] = Array.from(new Set(cities)).sort(); // remove duplicates, sort alphabetically
  const background = useColorModeValue("#02b1b1", "#02b1b1");
  const textColor = useColorModeValue("gray.700", "white");
  const [data, setData] = useState(activities);
  const [city, setCity] = useState(undefined);
  const [sort, setSort] = useState<string>(undefined);
  const [availability, setAvailability] = useState(undefined);
  const [active, setActive] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesPerPage, setActivitiesPerPage] = useState(5);
  const max = Math.ceil(data.length / activitiesPerPage);
  const [inputPage, setInputPage] = useState(1);

  const handleActivitiesPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActivitiesPerPage(Number(e.target.value));
  };
  const handleCities = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
    if (!e.target.value) setAvailability(undefined);
    if (availability) {
      return setData(
        e.target.value
          ? activities.filter(
              (c) =>
                c.city.name === city &&
                activities.filter((a) =>
                  a.availability.includes(e.target.value)
                )
            )
          : activities
      );
    }
    setData(
      e.target.value
        ? activities.filter((a) => a.city.name === e.target.value)
        : activities
    );
  };
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    if (e.target.value === "asc") {
      return setData(data.sort((a, b) => a.price - b.price));
    }
    if (e.target.value === "desc") {
      return setData(data.sort((a, b) => b.price - a.price));
    }
  };
  const handleAvailability = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAvailability(e.target.value);
    if (!e.target.value) setActive(undefined);
    if (city) {
      return setData(
        e.target.value
          ? activities.filter(
              (a) =>
                a.availability.includes(e.target.value) && a.city.name === city
            )
          : activities.filter((a) => a.city.name === city)
      );
    }
    return setData(
      e.target.value
        ? activities.filter((a) => a.availability.includes(e.target.value))
        : activities
    );
  };

  const handleActive = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "true") {
      return setData(
        city
          ? data.filter((a) => a.active === true && a.city.name === city)
          : data.filter((a) => a.active === true)
      );
    }
    if (e.target.value === "false") {
      return setData(
        city
          ? data.filter((a) => a.active === false && a.city.name === city)
          : data.filter((a) => a.active === false)
      );
    }
    setData(city ? data.filter((a) => a.city.name === city) : activities);
  };
  return (
    <>
      <Button
        position={"absolute"}
        right={0}
        mr={10}
        bg={background}
        color={"white"}
        rounded={"md"}
        padding={"20px"}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
          bg: "#F3B46F",
          color: "black",
        }}
      >
        <NextLink href="/activities/create">
          <Link>Create Activity</Link>
        </NextLink>
      </Button>
      <Box
        textAlign={"center"}
        display={"inline-flex"}
        gap={5}
        mb={5}
        key={availability}
      >
        <Select
          width={250}
          value={sort}
          onChange={(e) => handleSort(e)}
          placeholder={"Sort by Price"}
        >
          <option value={"asc"}>Ascending</option>
          <option value={"desc"}>Descending</option>
        </Select>
        <Select
          width={250}
          placeholder="Filter By City"
          value={city}
          onChange={(e) => handleCities(e)}
        >
          {citiesUnique.map((c: string, i: number) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <Select
          width={250}
          value={active}
          onChange={(e) => handleActive(e)}
          placeholder={"Filter by Active"}
        >
          <option value={"true"}>Active</option>
          <option value={"false"}>Inactive</option>
        </Select>
        <Select
          width={250}
          value={availability}
          onChange={(e) => handleAvailability(e)}
          placeholder={"Filter by Availability"}
        >
          <option value={"Monday"}>Monday</option>
          <option value={"Tuesday"}>Tueday</option>
          <option value={"Wednesday"}>Wednesday</option>
          <option value={"Thursday"}>Thursday</option>
          <option value={"Friday"}>Friday</option>
          <option value={"Saturday"}>Saturday</option>
          <option value={"Sunday"}>Sunday</option>
        </Select>
      </Box>
      <Table>
        <Thead>
          <Tr my=".8rem" pl="0px" color={textColor} gap={5}>
            {captions.map((c, i) => {
              return (
                <Th
                  color={textColor}
                  key={i}
                  ps={i === 0 ? "10px" : null}
                  gap={50}
                  pl={30}
                >
                  {c}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody key={activitiesPerPage}>
          {data
            .slice(
              (currentPage - 1) * activitiesPerPage,
              (currentPage - 1) * activitiesPerPage + activitiesPerPage
            )
            .map((a: Activity) => {
              return <ActivityTable activity={a} key={a.id} />;
            })}
        </Tbody>
      </Table>
      <Center>
        <Flex gap={50}>
          <Select
            value={activitiesPerPage}
            name={"activitiesPerPage"}
            onChange={(e) => handleActivitiesPerPage(e)}
            w={130}
            mt={8}
          >
            <option value={5}>5 Results</option>
            <option value={10}>10 Results</option>
            <option value={20}>20 Results</option>
            <option value={50}>50 Results</option>
          </Select>
          <Pagination
            inputPage={inputPage}
            setInputPage={setInputPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            max={max}
          />
        </Flex>
      </Center>
    </>
  );
};