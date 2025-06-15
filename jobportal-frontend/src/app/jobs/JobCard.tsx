'use client';
import { Box, Heading, Text, Stack, Badge } from '@chakra-ui/react';

interface JobCardProps {
    title: string;
    companyName: string;
    location: string;
    createdAt: string;
}

export default function JobCard({ title, companyName, location, createdAt }: JobCardProps) {
    return (
        <Box borderWidth="1px" borderRadius="md" p={4} shadow="md">
            <Stack spacing={2}>
                <Heading size="md">{title}</Heading>
                <Text fontSize="sm" color="gray.600">{companyName} • {location}</Text>
                <Badge colorScheme="green">{new Date(createdAt).toLocaleDateString()}</Badge>
            </Stack>
        </Box>
    );
}
