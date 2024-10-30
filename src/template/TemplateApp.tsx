import { Box, Button, ChakraProvider, extendTheme, Text } from "@chakra-ui/react";
import { MobileLimiter } from "../components/core/MobileLimiter";
import { Notes } from "./Notes";
import { useEffect, useState } from "react";
import { Models, OAuthProvider } from "appwrite";
import { Header } from "../components/core/Header";

import { account, init, getUser, User } from "../appwrite";


const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          bg: "",
        },
      }),
    },
});

export const TemplateApp = () => {

  const [inited, setInited] = useState(false);
  const [user, setUser] = useState<User|null>(null);

  const initApp = async () => {
    await init();
    const user = getUser();
    setUser(user);
    setInited(true);
  }

  const handleLogin = () => {
    console.log('handleLogin');
    account.createOAuth2Session(OAuthProvider.Google, window.location.href, window.location.href);
  }

  useEffect(() => {
    //account.deleteSession('current');
    initApp();
  }, []);

  // TODO: Display a loading spinner
  if (!inited) return;

  return <>
    <ChakraProvider theme={theme}>
      <Box position='relative'>
        <Header />
        <Box zIndex={0} position='relative'>

      { 
        !user?.$id ? <Button onClick={handleLogin}>Login</Button> :
        <>
          <Notes />
          { Array.from({ length: 100}).map(() => <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus bibendum nec neque vel maximus. Maecenas quis consectetur purus. Praesent et malesuada est, ut dictum metus.</Text> )}
        </>
      }
      </Box>
      </Box>
    </ChakraProvider>
  </>
};