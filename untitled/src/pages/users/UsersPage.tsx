import Layout from "../../components/layout/Layout.tsx";
import {UsersGate} from "../../states/auth/gates.ts";
import {Box, Button, Flex, Text} from "@chakra-ui/react";
import BaseTable from "../../components/table/BaseTable.tsx";
import {columns} from "./components/Columns.tsx";
import {$allUsers, $isAllUsersLoading, $collectUserActivity} from "../../states/auth/stores.ts";
import {useGate, useUnit} from "effector-react";
import {$setUserActivityFx} from "../../states/auth/effects.ts";

function UsersPage() {
    useGate(UsersGate);
    const [allUsers,
        isLoading,
        setUserActivity,
        collectUserActivity] = useUnit([$allUsers, $isAllUsersLoading, $setUserActivityFx, $collectUserActivity]);
    return <Layout>
        {collectUserActivity.length > 0 && (<Flex marginBottom={"4"} align="center" mt={4}>
            <Text color="orange.500" mr={4}>
                One or more users have been modified.
            </Text>
            <Button colorScheme="blue" onClick={() => {
                setUserActivity(collectUserActivity);
            }}>
                Save
            </Button>
        </Flex>)}
        <Box className="ag-theme-alpine" h="400px" w="100%">
            <BaseTable rowData={allUsers} columnDefs={columns} isLoading={isLoading}/>
        </Box>
    </Layout>;
}

export default UsersPage;
