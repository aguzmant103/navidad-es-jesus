'use client';

import { useState } from "react";
import Image from "next/image";
import { ActionButton } from "./components/action-button";

export default function Home() {
  const [showDonorOptions, setShowDonorOptions] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [familyCount, setFamilyCount] = useState(1);
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleDonorClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowDonorOptions(true);
      setIsAnimating(false);
    }, 500);
  };

  const handleRegisterClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowRegistration(true);
      setIsAnimating(false);
    }, 500);
  };

  const handleIncrement = () => {
    setFamilyCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    setFamilyCount(prev => Math.max(1, prev - 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setFamilyCount(value);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      {/* Main Logo */}
      <div className="mb-12">
        <Image
          src="/holy-family-logo.svg"
          alt="Navidad es Jesús - Holy Family Logo"
          width={400}
          height={300}
          priority
          className="w-full max-w-md"
        />
      </div>

      {/* Action Buttons */}
      <div className={`flex flex-col sm:flex-row gap-6 w-full max-w-md transition-all duration-500 ${
        isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}>
        {!showDonorOptions && !showRegistration ? (
          <>
            <ActionButton variant="success">
              Quiero ser voluntario
            </ActionButton>
            <ActionButton variant="danger" onClick={handleDonorClick}>
              Quiero ser donante
            </ActionButton>
          </>
        ) : showDonorOptions && !showRegistration ? (
          <>
            <div className="flex flex-col items-center gap-2">
              <ActionButton variant="primary" onClick={handleRegisterClick}>
                Quiero completar el registro aquí
              </ActionButton>
              <span className="text-white text-sm opacity-75">5 min</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ActionButton variant="secondary">
                Quiero que me llamen
              </ActionButton>
              <span className="text-white text-sm opacity-75">1 día</span>
            </div>
          </>
        ) : (
          <div className="w-full max-w-md space-y-6">
            {/* Family Count Section */}
            <div>
              <h2 className="text-white text-xl font-bold text-center mb-6">
                ¿Cuántas familias (cajas) quiero ayudar?
              </h2>
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  onClick={handleDecrement}
                  className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white font-bold text-2xl rounded-lg transition-colors duration-200 shadow-lg flex items-center justify-center"
                >
                  -
                </button>
                <input
                  type="number"
                  value={familyCount}
                  onChange={handleInputChange}
                  min="1"
                  className="w-20 h-12 bg-white text-black font-bold text-xl text-center rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={handleIncrement}
                  className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white font-bold text-2xl rounded-lg transition-colors duration-200 shadow-lg flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Location Section */}
            <div>
              <h3 className="text-white text-lg font-bold text-center mb-4">
                ¿Dónde vives?
              </h3>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setLocation('este')}
                  className={`p-4 rounded-lg border-2 transition-colors duration-200 ${
                    location === 'este' 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'bg-transparent border-white text-white hover:bg-white hover:text-black'
                  }`}
                >
                  Este - Dejar caja en Comunidad
                </button>
                <button
                  onClick={() => setLocation('oeste')}
                  className={`p-4 rounded-lg border-2 transition-colors duration-200 ${
                    location === 'oeste' 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'bg-transparent border-white text-white hover:bg-white hover:text-black'
                  }`}
                >
                  Oeste - Dejar caja en Casa de Mariela
                </button>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-white text-lg font-bold text-center mb-3">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre completo"
                className="w-full h-12 bg-white text-black font-medium text-lg px-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block text-white text-lg font-bold text-center mb-3">
                Teléfono
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Tu número de teléfono"
                className="w-full h-12 bg-white text-black font-medium text-lg px-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
