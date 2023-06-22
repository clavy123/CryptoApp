import { Button, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <HStack  pt={4} shadow={"base"} bgColor={"blackAlpha.900"} display={'flex'} justifyContent={'center'}>
       <Button variant={'unstyled'} color={'white'}>
        <Link to="/">Home</Link>
       </Button>
       <Button variant={'unstyled'} color={'white'}>
        <Link to="/coin">Coin</Link>
       </Button>
       <Button variant={'unstyled'} color={'white'}>
        <Link to="/exchange">Exchange</Link>
       </Button>
       <Button variant={'unstyled'} color={'white'}>
        <Link to="/coin/:id">CoinDetail</Link>
       </Button>
    </HStack>
  )
}

export default Header