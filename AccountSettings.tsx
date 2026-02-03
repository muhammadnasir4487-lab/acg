
import React, { useState } from 'react';
import { MadrasaInfo } from '../types';
import { Save, Upload } from 'lucide-react';

interface Props {
  madrasaInfo: MadrasaInfo;
  setMadrasaInfo: (info: MadrasaInfo) => void;
  onSave: () => void;
}

const AccountSettings: React.FC<Props> = ({ madrasaInfo, setMadrasaInfo, onSave }) => {
  const [formData, setFormData] = useState<MadrasaInfo>(madrasaInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setMadrasaInfo(formData);
    alert('তথ্য সফলভাবে সেভ করা হয়েছে!');
    onSave();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">অ্যাকাউন্ট খুলুন / মাদ্রাসার তথ্য</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">মাদ্রাসার নাম (বাংলা)</label>
          <input 
            type="text" name="nameBn" value={formData.nameBn} onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="নাম লিখুন..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">মাদ্রাসার ঠিকানা (বাংলা)</label>
          <input 
            type="text" name="addressBn" value={formData.addressBn} onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="ঠিকানা লিখুন..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">মাদ্রাসার নাম (ইংরেজি)</label>
          <input 
            type="text" name="nameEn" value={formData.nameEn} onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Name in English..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">মাদ্রাসার ঠিকানা (ইংরেজি)</label>
          <input 
            type="text" name="addressEn" value={formData.addressEn} onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Address in English..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">মাদ্রাসার নাম (আরবি)</label>
          <input 
            type="text" name="nameAr" value={formData.nameAr} onChange={handleChange} dir="rtl"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="اسم المدرسة..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">মাদ্রাসার ঠিকানা (আরবি)</label>
          <input 
            type="text" name="addressAr" value={formData.addressAr} onChange={handleChange} dir="rtl"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="العنوان..."
          />
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">মাদ্রাসার লোগো আপলোড করুন</label>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
            {formData.logo ? (
              <img src={formData.logo} alt="Logo Preview" className="w-full h-full object-contain" />
            ) : (
              <Upload className="text-gray-400" size={32} />
            )}
          </div>
          <input 
            type="file" accept="image/*" onChange={handleLogoUpload}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
      </div>

      <button 
        onClick={handleSave}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
      >
        <Save size={20} /> সেভ করুন
      </button>
    </div>
  );
};

export default AccountSettings;
