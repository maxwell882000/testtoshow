import {Box, Heading, Text} from "@chakra-ui/react";
import {useUnit} from "effector-react";
import {$user} from "../../states/auth/stores.ts";
import {WelcomeGate} from "../../states/auth/gates.ts";
import Layout from "../../components/layout/Layout.tsx";

function WelcomePage() {
    const user = useUnit($user);
    return <Layout>
        <Box w={"100%"}>
            <WelcomeGate/>
            <Heading as="h1" size="xl" mb={4}>
                Welcome, <Text as="span" fontWeight="bold"> {user?.userName} </Text>!
            </Heading>
        </Box>

    </Layout>
}

export default WelcomePage
