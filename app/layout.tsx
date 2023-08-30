// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';

// components
import { ModalProvider } from '@/providers/modal-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Home Page',
  description: 'index page, home page, root page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="icon"
            href="/polres_logo.jpeg"
            type="image/jpg"
            sizes="any"
          />
        </head>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ModalProvider />
            <ClerkLoading>
              <div className="flex items-center justify-center">
                <p className="mt-28">Tunggu sebentar...</p>
              </div>
            </ClerkLoading>
            <ClerkLoaded>{children}</ClerkLoaded>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
