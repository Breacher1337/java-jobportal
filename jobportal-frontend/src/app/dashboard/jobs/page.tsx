'use client';

import {
    Box, Button, Heading, Text, VStack, HStack, Icon, Input, InputGroup,
    InputLeftElement, SimpleGrid, Link as ChakraLink, Tag, useColorModeValue,
    Flex, Spacer, Center, Spinner
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiSearch, FiMapPin, FiBriefcase, FiClock, FiDollarSign, FiFilter } from 'react-icons/fi';
import { FaBuilding } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import api from '@/lib/axios'; // ✅ Assumes axios instance with Authorization header is configured

type Job = {
    createdAt: string;
    id: string;
    title: string;
    location: string;
    jobType: string;
    salaryRange?: string;
    remote: boolean;
};

const JobCard = ({ job }: { job: Job }) => {
    const cardBg = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.400');

    return (
        <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            bg={cardBg}
            _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
            transition="all 0.2s"
        >
            <VStack align="stretch" spacing={3}>
                <HStack spacing={3}>
                    <Icon as={FaBuilding} w={6} h={6} color="gray.500" />
                    <Box>
                        <Heading as="h3" size="md" noOfLines={1}>
                            <ChakraLink
                                as={NextLink}
                                href={`/dashboard/jobs/${job.id}`}
                                _hover={{ textDecoration: 'underline' }}
                            >
                                {job.title}
                            </ChakraLink>
                        </Heading>
                        <Text fontSize="sm" color="brand.500" fontWeight="medium">
                            {/* Since we don't have `company`, fallback or remove */}
                            {job.remote ? 'Remote Role' : 'On-site'}
                        </Text>
                    </Box>
                </HStack>
                <HStack fontSize="sm" color={textColor} spacing={4} flexWrap="wrap">
                    <HStack><Icon as={FiMapPin} /> <Text>{job.location}</Text></HStack>
                    <HStack><Icon as={FiBriefcase} /> <Text>{job.remote ? 'Remote' : 'On-site'}</Text></HStack>
                    {job.salaryRange && (
                        <HStack><Icon as={FiDollarSign} /> <Text>{job.salaryRange}</Text></HStack>
                    )}
                </HStack>
                <Flex alignItems="center" mt={3}>
                    <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')}>
                        <Icon as={FiClock} mr={1} verticalAlign="middle" />
                        Posted {new Date(job.createdAt).toLocaleDateString()}
                    </Text>
                    <Spacer />
                    <Button
                        as={NextLink}
                        href={`/dashboard/jobs/${job.id}`}
                        size="sm"
                        colorScheme="brand"
                        variant="outline"
                    >
                        View Details
                    </Button>
                </Flex>
            </VStack>
        </Box>
    );
};


export default function JobsListPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoadingPageData, setIsLoadingPageData] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const headingColor = useColorModeValue('gray.700', 'white');

    useEffect(() => {
        const fetchJobs = async () => {
            setIsLoadingPageData(true);
            setError(null);
            try {
                const res = await api.get('/jobs', {
                    params: { page: 0, size: 6 }
                });
                setJobs(res.data.content);
            } catch (e) {
                console.error(e);
                setError("Failed to load jobs.");
            } finally {
                setIsLoadingPageData(false);
            }
        };
        fetchJobs();
    }, []);

    if (isLoadingPageData) {
        return (
            <Center h="80vh">
                <VStack>
                    <Spinner size="xl" color="brand.500" />
                    <Text mt={3}>Loading jobs...</Text>
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
            <Box>
                <Heading as="h1" size="lg" color={headingColor}>Job Listings</Heading>
                <Text>Find your next opportunity.</Text>
            </Box>

            <HStack spacing={4} as="form" onSubmit={(e) => e.preventDefault()}>
                <InputGroup flex={2}>
                    <InputLeftElement pointerEvents="none"><Icon as={FiSearch} color="gray.400" /></InputLeftElement>
                    <Input type="text" placeholder="Search by title, company, keyword..." />
                </InputGroup>
                <Input placeholder="Location (e.g., City, Remote)" flex={1} />
                <Button type="submit" colorScheme="brand" variant="outline" leftIcon={<Icon as={FiFilter} />}>Search</Button>
            </HStack>

            {jobs.length > 1 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {jobs.map((job) => <JobCard key={job.id} job={job} />)}
                </SimpleGrid>
            ) : (
                <Center minH="200px">
                    <Text>No jobs found. Try adjusting your filters or check back later.</Text>
                </Center>
            )}
        </VStack>
    );
}
