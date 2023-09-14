import { Spinner } from "@nextui-org/react";



export const LoadingWithBackdrop = () => (
  <>
    <div className="w-screen h-screen bg-background opacity-90 absolute top-0"/>
    <div className="flex justify-center w-full p-2 absolute top-1/2 left-0">
      <Spinner />
    </div>
  </>
)
