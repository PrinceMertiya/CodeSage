interface Props {
  children: React.ReactNode;
}

export default function PageContainer({
  children,
}: Props) {
  return (
    <main className="mx-auto max-w-[1600px] p-8">
      {children}
    </main>
  );
}