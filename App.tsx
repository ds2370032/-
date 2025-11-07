import React, { useState, useCallback } from 'react';
import Dropdown from './components/Dropdown';
import LoadingSpinner from './components/LoadingSpinner';
import GeneratedNamesDisplay from './components/GeneratedNamesDisplay';
import { AnimalType, NameStyle } from './types';
import { ANIMAL_TYPE_OPTIONS, NAME_STYLE_OPTIONS } from './constants';
import { generatePetNames } from './services/geminiService';

const App: React.FC = () => {
  const [animalType, setAnimalType] = useState<AnimalType>(AnimalType.Dog);
  const [nameStyle, setNameStyle] = useState<NameStyle>(NameStyle.Cute);
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateNames = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedNames([]); // Clear previous names
    try {
      const names = await generatePetNames(animalType, nameStyle);
      setGeneratedNames(names);
    } catch (err: any) {
      console.error(err);
      setError(err.message || '名前の生成中にエラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
  }, [animalType, nameStyle]);

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 border border-purple-300">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-purple-800 mb-6 sm:mb-8 tracking-tight">
          ペットの名前ジェネレーター
        </h1>
        <p className="text-center text-gray-600 mb-8 sm:mb-10 text-base sm:text-lg">
          新しいペットにぴったりの、日本語発音しやすいカタカナの名前を見つけましょう！
        </p>

        <Dropdown
          id="animal-type-select"
          label="動物の種類を選択"
          options={ANIMAL_TYPE_OPTIONS}
          selectedValue={animalType}
          onChange={setAnimalType}
          disabled={isLoading}
        />

        <Dropdown
          id="name-style-select"
          label="名前の系統を選択"
          options={NAME_STYLE_OPTIONS}
          selectedValue={nameStyle}
          onChange={setNameStyle}
          disabled={isLoading}
        />

        <button
          onClick={handleGenerateNames}
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-lg text-white font-bold text-lg sm:text-xl transition duration-300 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75
            ${isLoading
              ? 'bg-purple-400 cursor-not-allowed animate-pulse'
              : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 active:scale-98 shadow-lg hover:shadow-xl'
            }`}
        >
          {isLoading ? '生成中...' : '名前を生成'}
        </button>

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center text-sm sm:text-base">
            <p>{error}</p>
          </div>
        )}

        {isLoading && <LoadingSpinner />}
        
        <GeneratedNamesDisplay names={generatedNames} />
      </div>
    </div>
  );
};

export default App;
