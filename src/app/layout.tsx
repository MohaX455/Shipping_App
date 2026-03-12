import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthModalProvider } from '@/contexts/AuthModalContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastContainer } from '@/components/ui/ToastContainer';

export const metadata: Metadata = {
    title: 'Social Shipping - Save Money Shipping, Make Money Traveling',
    description:
        'Connect travelers and senders effortlessly. Save money on shipping. Make money traveling.',
    keywords: [
        'shipping',
        'travelers',
        'save money',
        'earn money',
        'parcel delivery',
        'affordable shipping',
    ],
    openGraph: {
        title: 'Social Shipping',
        description:
            'Connect travelers and senders effortlessly. Save money on shipping. Make money traveling.',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <link rel="icon" href="/images/tab_logo.png" type="image/png" />
            </head>
            <body className={`min-h-screen flex flex-col bg-white text-slate-800`}>
                <AuthProvider>
                    <AuthModalProvider>
                        <Header />
                        <main className="grow">
                            {children}
                        </main>
                        <Footer />
                        <ToastContainer />
                    </AuthModalProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
