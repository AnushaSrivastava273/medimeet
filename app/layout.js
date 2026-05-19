import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Medimeet - Doctors Appointment App",
  description: "Connect with doctors anytime, anywhere",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
     appearance={{
      baseTheme:dark,
      }}>
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {/* header can go here */}
         <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/*HEADER */}
            <Header/>
            <main className="min-h-screen">{children}</main>
            <Toaster />
            {/* FOOTER */}
            <footer className="bg-muted/50 py-12">
          <div className="container mx-auto px-4 text-center text-gray-1">
          <p>Happy Coding!</p>
          </div>
        </footer>
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
