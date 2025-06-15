'use client';
import api from '@/lib/axios';
import { useEffect, useState } from 'react';
import {Box, Heading, List, ListItem, Text} from '@chakra-ui/react';

export default function SeekerDash() {
    const [apps, setApps] = useState<any[]>([]);
    useEffect(() => {
        api.get('/applications/me').then(r => setApps(r.data));
    }, []);

    return (
        <Box p={8}>
            <Heading>Your Applications</Heading>
            <List spacing={3} mt={4}>
                {apps.map(a => (
                    <ListItem key={a.id}>
                        <Text fontWeight="bold">{a.jobTitle} at {a.companyName}</Text>
                        <Text>Status: {a.status}</Text>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
