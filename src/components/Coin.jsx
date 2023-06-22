import {useState,useEffect} from "react";
import axios from "axios";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import Loader from "../Loader";
import { Link } from "react-router-dom";

const CoinCard = ({ id,img,name,price,currencySymbol='₹',symbol }) => {
  return (
    <Link to={`/coin/${id}`}>
      <VStack
        w={"52"}
        shadow={"lg"}
        p={"8"}
        borderRadius={"lg"}
        transition={"all 0.3s"}
        m={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image
          src={img}
          w={"10"}
          h={"10"}
          objectFit={"contain"}
          alt={"Exchange"}
        />
        <Heading size={"md"} noOfLines={1}>
        {symbol}
      </Heading>

      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
    </VStack>
    </Link>
  );
};
const Coin = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setloading] = useState(true);
  const fetchCoin = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_APP_SERVER}/coins/markets/?vs_currency=inr`);
    console.log(data);
    setCoin(data);
    setloading(false);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  return (
    <Container maxW={"container.lg"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"}>
            {coin.map((i) => (
              <CoinCard
                key={i.id}
                id = {i.id}
                name={i.name}
                img={i.image}
                price={i.current_price}
                symbol = {i.symbol}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coin;
