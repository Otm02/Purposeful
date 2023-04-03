// By default, server components
// Since we want interaction with the user,
// we need to use client components
// see https://beta.nextjs.org/docs/rendering/server-and-client-components#when-to-use-server-vs-client-components
"use client";
import {
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Registration from "@/components/Registration";

export default function RegularUserRegistrationPage() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={4} mx={"auto"} maxW={"2xl"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading as="h1" size="2xl">
            Welcome to Purposeful!
          </Heading>
          <Text as="em" fontSize={"3xl"} color={"gray.500"}>
            Share. Create. Purposefully.
          </Text>
        </Stack>
        <Registration />
        <Text align={"center"}>
          Already a user?{" "}
          <Link color={"blue.400"} href="/login">
            Login
          </Link>
        </Text>
      </Stack>
    </Flex>
  );
}
