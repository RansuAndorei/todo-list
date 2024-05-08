import Header from "@/components/Header/Header";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

export const metadata = {
  title: "My Mantine Todo List App",
  description: "Todo List App Created using Mantine and Supabase",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications />
          <Header />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
