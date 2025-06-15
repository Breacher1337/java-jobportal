'use client';

import {
    Box,
    Heading,
    Container,
    Stack,
    Icon,
    VStack,
    Text,
    useColorModeValue,
    Link as ChakraLink,
} from '@chakra-ui/react';
import { FaLinkedin } from 'react-icons/fa';
import NextLink from 'next/link';
import LoginForm from '@/components/Auth/LoginForm';

export default function LoginPage() {
    const bgColor = useColorModeValue('gray.50', 'gray.800');
    const cardBgColor = useColorModeValue('white', 'gray.700');

    return (
        <Box bg={bgColor} minH="100vh" display="flex" alignItems="center" justifyContent="center">
            <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
                <Stack spacing="8">
                    <Stack spacing="6" alignItems="center">
                        <Icon as={FaLinkedin} w={12} h={12} color="brand.500" />
                        <Heading as="h1" size="xl" textAlign="center" color="brand.500">
                            JavaCake
                        </Heading>
                        <Heading as="h2" size="lg" textAlign="center" fontWeight="medium">
                            Sign in to your account
                        </Heading>
                    </Stack>

                    <Box
                        py={{ base: '0', sm: '8' }}
                        px={{ base: '4', sm: '10' }}
                        bg={cardBgColor}
                        boxShadow={{ base: 'none', sm: 'xl' }}
                        borderRadius={{ base: 'none', sm: 'xl' }}
                    >
                        <LoginForm />
                        <VStack spacing="4" mt={6}>
                            <Text fontSize="sm">
                                New to JavaCake?{' '}
                                <ChakraLink
                                    as={NextLink}
                                    href="/register"
                                    fontWeight="semibold"
                                    color="brand.500"
                                    _hover={{ textDecoration: 'underline' }}
                                >
                                    Join now
                                </ChakraLink>
                            </Text>
                        </VStack>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
