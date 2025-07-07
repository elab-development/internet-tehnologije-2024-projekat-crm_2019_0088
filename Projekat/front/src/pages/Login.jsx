import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  User,
  Lock,
  Mail,
  Building,
  UserCheck,
} from 'lucide-react';

const CRMLoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'user',
  });

  const roles = [
    {
      value: 'admin',
      label: 'Administrator',
      description: 'Potpun pristup sistemu',
    },
    {
      value: 'manager',
      label: 'Menadžer',
      description: 'Upravljanje timom i projektima',
    },
    {
      value: 'sales',
      label: 'Prodaja',
      description: 'Upravljanje klijentima i prodajom',
    },
    { value: 'user', label: 'Korisnik', description: 'Osnovni pristup' },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (data.success) {
          // Sačuvaj token i korisničke podatke
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          alert('Uspješno ste se prijavili!');
          // Preusmeri na dashboard
          // window.location.href = '/dashboard';
        } else {
          alert(data.message || 'Greška pri prijavi');
        }
      } else {
        const response = await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          // Sačuvaj token i korisničke podatke
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          alert('Uspješno ste se registrovali!');
          // Preusmeri na dashboard
          // window.location.href = '/dashboard';
        } else {
          alert(data.message || 'Greška pri registraciji');
        }
      }
    } catch (error) {
      alert('Greška pri povezivanju sa serverom');
      console.error('Error:', error);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      role: 'user',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">CRM Portal</h1>
            <p className="text-white/70">
              {isLogin ? 'Dobrodošli nazad!' : 'Kreirajte svoj nalog'}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Ime"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-10 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required={!isLogin}
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Prezime"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-10 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email adresa"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-10 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Lozinka"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-10 pr-10 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Potvrdite lozinku"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-10 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required={!isLogin}
                />
              </div>
            )}

            {!isLogin && (
              <div className="space-y-3">
                <label className="text-white/90 text-sm font-medium flex items-center">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Izaberite ulogu
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((role) => (
                    <label key={role.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={formData.role === role.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          formData.role === role.value
                            ? 'border-blue-500 bg-blue-500/20'
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-white text-sm font-medium">
                          {role.label}
                        </div>
                        <div className="text-white/60 text-xs">
                          {role.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              {isLogin ? 'Prijavite se' : 'Registrujte se'}
            </button>
          </div>

          {/* Toggle between login and register */}
          <div className="text-center mt-6">
            <p className="text-white/70">
              {isLogin ? 'Nemate nalog? ' : 'Već imate nalog? '}
              <button
                onClick={toggleMode}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                {isLogin ? 'Registrujte se' : 'Prijavite se'}
              </button>
            </p>
          </div>

          {isLogin && (
            <div className="text-center mt-4">
              <button className="text-white/50 hover:text-white/70 text-sm transition-colors">
                Zaboravili ste lozinku?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CRMLoginPage;
