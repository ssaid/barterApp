import { useRef, useState } from "react";
import { ImUpload } from "react-icons/im";


type DragAndDropFilesProps = {
  files: File[];
  onChange: (files: File[]) => void;
  accept?: string[]
}

export const DragAndDropFiles = ({ files, onChange, accept }: DragAndDropFilesProps) => {

  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);

  const handleChange = (e: any) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0])
        onChange([...files, ...e.target.files]);

  }

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) 
      onChange([...files, ...e.dataTransfer.files]);

  }

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  const openFileExplorer = () => {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div 
      className={`${
      dragActive ? "bg-content3" : "bg-content2"
      }  p-4 rounded-md  sm:h-32 w-full flex items-center border border-dashed cursor-pointer`}
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onClick={openFileExplorer}
    >
      <input
        placeholder="fileInput"
        className="hidden"
        ref={inputRef}
        type="file"
        multiple={true}
        onChange={handleChange}
        accept={accept?.join(",") ?? "*"}
      />

      <span className="flex gap-2 items-center justify-center w-full">
        <ImUpload />
        <p>Subir imagenes</p>
      </span>
    </div>
  );

}
