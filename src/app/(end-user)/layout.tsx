import Header from "@/components/Header";

export default function EndUserLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header /> <div className="pt-24 bg-gray-50">{children}</div>
    </>
  );
}
