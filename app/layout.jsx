export const metadata = {
  title: 'HMT Industrial Machine Tools | Engineering. Relocation. Industrial Excellence.',
  description: 'From Greenfield Factory Development to Brownfield Modernization, HMT delivers complete industrial engineering, machine relocation, automation and turnkey project solutions worldwide.',
  icons: { icon: '/favicon.svg' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#ffffff',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/assets/hmt/hero-scroll-poster.jpg" />
        <link rel="preload" as="image" href="/assets/hmt/logo-hmt-light.png" />
        <link rel="stylesheet" href="/hmt-original.css" />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/redesign.css" />
      </head>
      <body className="hmt-site">{children}</body>
    </html>
  );
}
