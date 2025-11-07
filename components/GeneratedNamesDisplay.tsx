import React from 'react';

interface GeneratedNamesDisplayProps {
  names: string[];
}

const GeneratedNamesDisplay: React.FC<GeneratedNamesDisplayProps> = ({ names }) => {
  if (names.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-purple-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">提案された名前</h2>
      <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
        {names.map((name, index) => (
          <li key={index} className="flex items-center justify-center">
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold shadow-sm text-center">
              {name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GeneratedNamesDisplay;
