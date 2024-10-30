import { Avatar, Flex } from "@chakra-ui/react"

export const Header = () => {
    return <Flex w='100%' alignItems='center' position='sticky' h='48px' bg='white' shadow='sm' top={0} zIndex={1}>
        <Avatar ml='8px' size='sm' />
    </Flex>
}