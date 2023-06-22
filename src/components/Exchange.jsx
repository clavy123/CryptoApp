import { useEffect, useState } from "react";
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

const ExchangeCard = ({ name, img, rank, url }) => {
  return (
    <a href={url} target={"blank"}>
      <VStack
        w={"52"}
        shadow={"lg"}
        p={"8"}
        borderRadius={"lg"}
        transition={"all 0.3s"}
        m={'4'}
        css={{
            "&:hover":{
                transform:"scale(1.1)",
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
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );
};
const Exchange = () => {
  const [exchange, setexchange] = useState([]);
  const [loading, setloading] = useState(true);
  const fetchExchange = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_APP_SERVER}/exchanges`);
    console.log(data);
    setexchange(data);
    setloading(false);
  };

  useEffect(() => {
    fetchExchange();
  }, []);

  return (
    <Container maxW={"container.lg"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"}>
            {exchange.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Exchange;
