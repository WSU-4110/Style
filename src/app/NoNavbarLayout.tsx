export default function NoNavbarLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>
          <main className="min-h-screen">{children}</main>
        </body>
      </html>
    );
  }
  