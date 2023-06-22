import { Container,Box, VStack,Image,Text,  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Badge,
  Progress,HStack
 } from "@chakra-ui/react";
import React, { useEffect,useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { useParams } from "react-router-dom";

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);


const CoinDetail = () => {
  const  {id } = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const fectchCoinDetail = async (id) => {
    const { data } = await axios.get(`${import.meta.env.VITE_APP_SERVER}/coins/${id}`);
    console.log(data)
    setCoin(data);
    setLoading(false);
  };
  useEffect(() => {
    fectchCoinDetail(id)
  }, [id])
  
  return (
    <Container maxW={"container.xl"}>{loading ? (<Loader />):( <>
      <Box width ={"full"} mt={'3'} borderWidth={1}>
      <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
              Last Updated On{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            <Image
              src={coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />
             <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {'₹'}
                {coin.market_data.current_price['inr']}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge
              fontSize={"2xl"}
              bgColor={"blackAlpha.800"}
              color={"white"}
            >{`#${coin.market_cap_rank}`}</Badge>

            <CustomBar
              high={`${'₹'}${coin.market_data.high_24h['inr']}`}
              low={`${'₹'}${coin.market_data.low_24h['inr']}`}
            />

            <Box w={"full"} p="4">
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
                <Item
                title={"Market Cap"}
                value={`${'₹'}${coin.market_data.market_cap['inr']}`}
              />
              <Item
                title={"All Time Low"}
                value={`${'₹'}${coin.market_data.atl['inr']}`}
              />
              <Item
                title={"All Time High"}
                value={`${'₹'}${coin.market_data.ath['inr']}`}
              />
            </Box>

            </VStack>
      </Box>
    </>)}</Container>
  );
};

export default CoinDetail;
