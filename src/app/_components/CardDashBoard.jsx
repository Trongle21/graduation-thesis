import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React from "react";

const CardDashBoard = ({ text, icon, quantity, width }) => {
  return (
    <Card height="fit-content" borderRadius="10px" width={width}>
      <CardHeader>
        <Text textAlign="center">{text}</Text>
      </CardHeader>
      <Flex justifyContent="center" fontSize={40}>
        {icon}
      </Flex>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Flex justifyContent="center">
            <Text fontSize="26px" fontWeight={600}>{quantity}</Text>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CardDashBoard;
