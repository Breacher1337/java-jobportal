'use client';

import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaLinkedin } from 'react-icons/fa';

export default function LandingPage() {
  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');

  return (
      <Box bg={bgColor} minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Container maxW="container.md" textAlign="center" py={16}>
          <VStack spacing={8}>
            <Icon as={FaLinkedin} w={20} h={20} color="brand.500" />
            <Heading as="h1" size="2xl" color="brand.500">
              Welcome to FakedIn
            </Heading>
            <Text fontSize="xl" color={textColor} maxW="lg" mx="auto">
              Your new professional community. Connect, share, and grow your career with FakedIn.
            </Text>
            <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justifyContent="center"
                width="100%"
                maxW="sm"
                mx="auto"
            >
              <Button
                  as={NextLink}
                  href="/login"
                  size="lg"
                  width="100%"
              >
                Sign In
              </Button>
              <Button
                  as={NextLink}
                  href="/register"
                  variant="outline"
                  size="lg"
                  width="100%"
              >
                Join Now
              </Button>
            </Stack>
          </VStack>
        </Container>
      </Box>
  );
}