import { Box, Heading } from '@chakra-ui/react';
import RegisterForm from '@/components/Auth/RegisterForm';

export default function RegisterPage() {

    return (
        <Box maxW="md" mx="auto" mt={10}>
            <Heading mb={6}>Register</Heading>
            <RegisterForm />
        </Box>
    );
}
