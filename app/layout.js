export const metadata = {
  title: 'CopyForge — AI Content Generator',
  description: 'Generate professional content powered by Claude AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}