import Layout from "../Layout/layout";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  ChakraProvider,
} from "@chakra-ui/react";
import { ListHomeAsUser } from "../ui/Detail/User";

export default function AbsentDetail() {
  return (
    <Layout>
      <ChakraProvider>
        <Tabs colorScheme="blue">
          <TabList>
            <div className="px-5 flex">
              <Tab>
                <div className="p-2">Home</div>
              </Tab>
              <Tab>
                <div className="p-2">People</div>
              </Tab>
            </div>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ListHomeAsUser />
            </TabPanel>
            <TabPanel>
              <p>People</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ChakraProvider>
    </Layout>
  );
}
