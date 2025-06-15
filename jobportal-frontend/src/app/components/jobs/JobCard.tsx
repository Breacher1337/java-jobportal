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
