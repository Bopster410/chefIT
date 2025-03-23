import { Navbar } from "@/shared/uikit/navbar";

export default function RecipeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white rounded-t-4xl h-full px-4 py-8">
      <Navbar />
      {children}
    </div>
  );
}
