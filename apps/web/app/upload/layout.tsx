import UploadButton from "@/components/UploadBtns";


export default function Upload({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex justify-center gap-12">
      <UploadButton />
      {children}
    </div>
  )
}