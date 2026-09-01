import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";
import { NotificationProvider } from "./context/NotificationContext";


export const metadata: Metadata = {
	title: "Insta Mart",
	description: "E-commerce application",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en">
			<body className={""}>
				<NotificationProvider>
					{children}
				</NotificationProvider>
			</body>
		</html>
	);
}
