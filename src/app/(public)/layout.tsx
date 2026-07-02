import { auth } from "@/auth";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="bg-background text-on-background min-h-screen font-sans antialiased overflow-x-hidden relative selection:bg-primary-container selection:text-on-primary-container flex flex-col justify-between">
      {/* Global Header */}
      <Header isLoggedIn={isLoggedIn} />

      {/* Main Content Area */}
      <main className="pt-20 flex-grow">
        {children}
      </main>

      {/* Global Footer */}
      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
}
