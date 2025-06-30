import React, { useRef, useState } from 'react';

const PrintUploader = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef();

  const handleFileUpload = (e) => {
    const uploaded = Array.from(e.target.files).map((file) => ({
      id: Date.now() + Math.random(),
      file,
      color: 'bw',
      copies: 1,
      bothSides: 'Yes',
    }));
    setFiles((prev) => [...prev, ...uploaded]);
  };

  const updateFile = (id, updates) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = async () => {
    for (const { file, color, copies, bothSides } of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('color', color);
      formData.append('copies', copies);
      formData.append('bothSides', bothSides);
      console.log('URL:', import.meta.env.VITE_BACKEND_URL);



      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
  method: 'POST',
  body: formData,
});


        const data = await res.json();
        console.log(`${file.name}: ${data.message}`);
      } catch (error) {
        console.error(`${file.name}: Upload failed`, error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Files to Print</h2>

      <div
        className="border-2 border-dashed border-blue-400 p-6 rounded cursor-pointer text-center text-blue-600 hover:bg-blue-50"
        onClick={() => fileInputRef.current.click()}
      >
        Click here to select and upload a file…
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="mt-6 max-h-96 overflow-y-auto space-y-4 pr-2">
          {files.map(({ id, file, color, copies, bothSides }) => (
            <div key={id} className="flex flex-col border rounded p-4 bg-gray-50">
              <div className="font-medium text-blue-700 truncate mb-2">
                {file.name}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span>Color:</span>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name={`color-${id}`}
                      checked={color === 'bw'}
                      onChange={() => updateFile(id, { color: 'bw' })}
                    />
                    B/W
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name={`color-${id}`}
                      checked={color === 'color'}
                      onChange={() => updateFile(id, { color: 'color' })}
                    />
                    Color
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <span>Copies:</span>
                  <button
                    onClick={() => updateFile(id, { copies: Math.max(1, copies - 1) })}
                    className="px-2 py-1 bg-blue-200 rounded"
                  >
                    -
                  </button>
                  <span>{copies}</span>
                  <button
                    onClick={() => updateFile(id, { copies: copies + 1 })}
                    className="px-2 py-1 bg-blue-200 rounded"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span>Both Sides:</span>
                  <select
                    className="border rounded px-2 py-1"
                    value={bothSides}
                    onChange={(e) => updateFile(id, { bothSides: e.target.value })}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <button
                  onClick={() => removeFile(id)}
                  className="ml-auto bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white font-semibold px-6 py-2 rounded hover:bg-green-700 active:bg-green-900 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            PRINT
          </button>
        </div>
      )}
    </div>
  );
};

export default PrintUploader;
