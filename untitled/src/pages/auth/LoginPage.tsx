import {Box, Button, CircularProgress, Flex, FormControl, FormLabel, Heading, Input, Stack} from "@chakra-ui/react";
import React, {useState} from "react";
import {useUnit} from "effector-react";
import {$login} from "../../states/auth/events.ts";
import {$isLoginLoading} from "../../states/auth/stores.ts";

function LoginPage() {
    const [login, isLoading] = useUnit([$login, $isLoginLoading]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(e);
    };

    return (
        (
            <Flex
                height="100vh" // Takes full viewport height
                width="100vw"
                alignItems="center" // Centers vertically
                justifyContent="center" // Centers horizontally
                bg="gray.100" // Light background color
            >
                <Box
                    w="100%"
                    maxW="400px"
                    p="8"
                    boxShadow="md"
                    borderRadius="md"
                    bg="white"
                >
                    <Heading as="h2" size="lg" textAlign="center" mb="6">
                        Login
                    </Heading>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <FormControl id="userName" isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="text"
                                    name={"userName"}
                                />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    name={"password"}
                                />
                            </FormControl>
                            <Button isLoading={isLoading} type="submit" colorScheme="teal" size="lg" w="full">
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Flex>
        )
    );
}

export default LoginPage;
