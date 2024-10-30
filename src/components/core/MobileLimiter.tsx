// React component that limit the children to an iPhone resolution

import { Box, Center } from "@chakra-ui/react"

type MobileLimiterProps = {
    children: React.ReactNode
}

export const MobileLimiter = ({ children }:MobileLimiterProps) => {
  return (
    <Center
      width='100%'
      height='100%'
      bg='#333'
      // style={{
      //   maxWidth: 375,
      //   maxHeight: 812,
      //   overflow: "auto",
      //   position: "relative",
      //   border: "1px solid black",
      // }}
    >
      <Box 
        border='1px solid black'
        w='100%'
        h='100%'
        maxW='512px'
        maxH='1024px'
        overflow='auto'
        bg='white'
      >
        {children}
      </Box>
    </Center>
  )
}
