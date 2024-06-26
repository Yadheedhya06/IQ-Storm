import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

export const runtime = 'edge'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "PEPE Brains",
	description: "PEPE Brains",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Toaster richColors />
				{children}
			</body>
		</html>
	);
}
