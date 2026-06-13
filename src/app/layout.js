import "./globals.css"

export const metadata = {
  title: "FestPro",
  description: "Fest Management System",
  manifest: "/manifest.json",
  themeColor: "#000000",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
}

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en"
      className="bg-black"
    >
      <body
        className="bg-black text-white"
      >
        {children}
      </body>
    </html>
  )
}