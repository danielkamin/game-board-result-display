import React from 'react';

interface ImageUploadProps {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  teamName: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  setImage,
  image,
  teamName,
}) => {
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filePath = (file as any).path;
      if (filePath) {
        setImage(filePath);
      }
    }
  };

  const removeImage = () => {
    if (image) {
      setImage('');
    }
  };

  return (
    <div className="flex">
      <div className="mb-2 text-center">
        <label
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
          htmlFor={`image-${teamName}`}
        >
          Dodaj logo
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileInput}
            id={`image-${teamName}`}
          />
        </label>
      </div>

      <div className="w-[100px] h-[100px] border-2 border-dashed border-gray-300 rounded relative group">
        {image ? (
          <>
            <img
              src={`file://${image}`}
              alt="Team logo"
              className="w-full h-full object-cover rounded"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
            >
              ×
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm text-center px-2">
            No image uploaded
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
