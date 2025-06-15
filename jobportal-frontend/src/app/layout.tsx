// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Keep this for any base Tailwind resets or global styles not covered by Chakra
import { Providers } from './providers'; // Import the new Providers component
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'JavaCake (LinkedIn Clone)',
    description: 'Professional Networking Platform',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Providers> {/* Wrap with ChakraProvider */}
                {/* <main className="min-h-screen"> No need for min-h-screen here usually with Chakra */}
                {children}
                {/* </main> */}
        </Providers>
        </body>
        </html>
    );
}