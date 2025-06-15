'use client';

import {
    Box, Heading, Text, VStack, HStack, IconButton, Tooltip,
    Table, Thead, Tbody, Tr, Th, Td, TableContainer, Badge,
    useColorModeValue, Flex, Spacer, Center, Spinner
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NextLink from 'next/link';
import { FiEye, FiCheckSquare, FiXSquare } from 'react-icons/fi';

type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

type Application = {
    id: string;
    jobId: string;
    jobTitle: string;
    applicantName: string;
    companyName: string;
    appliedDate: string;
    status: ApplicationStatus;
    resumeLink: string;
};

const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
        case 'PENDING': return 'yellow';
        case 'ACCEPTED': return 'green';
        case 'REJECTED': return 'red';
        default: return 'gray';
    }
};

export default function ApplicantsForJobPage() {
    const { id: jobId } = useParams<{ id: string }>();
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const headingColor = useColorModeValue('gray.700', 'white');
    const tableBg = useColorModeValue('white', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await fetch(`/applications/${jobId}`);
                if (!res.ok) throw new Error('Failed to fetch applicants');
                const data = await res.json();
                setApplications(data);
            } catch (err) {
                setError((err as Error).message || 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchApplications();
    }, [jobId]);

    if (isLoading) {
        return (
            <Center h="80vh">
                <VStack>
                    <Spinner size="xl" color="brand.500" />
                    <Text mt={3}>Loading applicants...</Text>
                </VStack>
            </Center>
        );
    }

    if (error) {
        return (
            <Center h="80vh">
                <VStack>
                    <Heading size="md" color="red.500">Error</Heading>
                    <Text>{error}</Text>
                </VStack>
            </Center>
        );
    }

    return (
        <VStack spacing={6} align="stretch">
            <Flex direction={{ base: 'column', md: 'row' }} align={{ base: 'stretch', md: 'center' }} gap={4}>
                <Box>
                    <Heading as="h1" size="lg" color={headingColor}>Applicants for Job #{jobId}</Heading>
                    <Text color={useColorModeValue('gray.600', 'gray.400')}>
                        Review and manage submissions
                    </Text>
                </Box>
                <Spacer />
            </Flex>

            {applications.length > 0 ? (
                <TableContainer bg={tableBg} borderRadius="lg" borderWidth="1px" borderColor={borderColor} shadow="md">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Applicant</Th>
                                <Th>Applied</Th>
                                <Th>Status</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {applications.map(app => (
                                <Tr key={app.id}>
                                    <Td fontWeight="medium">{app.applicantName}</Td>
                                    <Td>{new Date(app.appliedDate).toLocaleDateString()}</Td>
                                    <Td>
                                        <Badge colorScheme={getStatusColor(app.status)} px={2} py={1} borderRadius="md">
                                            {app.status}
                                        </Badge>
                                    </Td>
                                    <Td>
                                        <HStack spacing={1}>
                                            <Tooltip label="View">
                                                <IconButton as={NextLink} href={`/dashboard/applications/${app.id}`} icon={<FiEye />} aria-label="View" size="sm" variant="ghost" />
                                            </Tooltip>
                                            <Tooltip label="Approve">
                                                <IconButton icon={<FiCheckSquare />} aria-label="Approve" size="sm" variant="ghost" />
                                            </Tooltip>
                                            <Tooltip label="Reject">
                                                <IconButton icon={<FiXSquare />} aria-label="Reject" size="sm" variant="ghost" />
                                            </Tooltip>
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            ) : (
                <Center py={20}>
                    <Text color="gray.500">No applicants yet for this job.</Text>
                </Center>
            )}
        </VStack>
    );
}
