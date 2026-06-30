import UploadButton from "@/components/UploadBtns";


export default function Upload({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="m-6 flex justify-center gap-12">
      <div className="self-start">
        <UploadButton />
      </div>
      {children}
    </div>
  )
}