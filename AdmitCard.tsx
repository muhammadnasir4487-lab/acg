
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { MadrasaInfo, Student } from '../types';

interface Props {
  student: Student;
  madrasaInfo: MadrasaInfo;
}

const AdmitCard: React.FC<Props> = ({ student, madrasaInfo }) => {
  const qrValue = `নাম: ${student.name}, পিতা: ${student.fatherName}, জামাত: ${student.jammat}, রোল: ${student.roll}, দাখেলা: ${student.dakhila}`;

  return (
    <div className="admit-card bg-[#fff9ea] w-[850px] shadow-2xl p-8 relative overflow-hidden mb-12 flex flex-col" style={{ minHeight: '600px', border: '1px solid rgba(0,0,0,0.05)' }}>
      
      {/* 1. Arabic Headers (Centered at top) */}
      <div className="text-center space-y-0 mb-4">
        <h2 className="text-[52px] font-arabic-top text-black leading-tight" dir="rtl">
          {madrasaInfo.nameAr}
        </h2>
        <p className="text-2xl font-arabic-sub text-black" dir="rtl">
          {madrasaInfo.addressAr}
        </p>
      </div>

      {/* 2. Identity Row (Bangla | Logo | English) */}
      <div className="flex items-center justify-between px-2 mb-4">
        {/* Left: Bangla */}
        <div className="flex-1 text-center">
          <h3 className="text-[32px] font-bold font-bangla text-[#1a1a1a] leading-none mb-1">
            {madrasaInfo.nameBn}
          </h3>
          <p className="text-[20px] font-bangla text-[#333]">
            {madrasaInfo.addressBn}
          </p>
        </div>

        {/* Middle: Logo (Circular) */}
        <div className="w-24 h-24 mx-4 flex-shrink-0 flex items-center justify-center">
          {madrasaInfo.logo ? (
            <img 
              src={madrasaInfo.logo} 
              alt="Logo" 
              className="w-full h-full object-contain rounded-full border-2 border-[#800000]/10 p-0.5" 
            />
          ) : (
            <div className="w-20 h-20 bg-[#800000] rounded-full flex items-center justify-center text-white text-xs">LOGO</div>
          )}
        </div>

        {/* Right: English */}
        <div className="flex-1 text-center">
          <h3 className="text-[22px] font-bold uppercase text-[#1a1a1a] leading-tight mb-1" style={{ fontFamily: 'Arial Black, sans-serif' }}>
            {madrasaInfo.nameEn}
          </h3>
          <p className="text-[16px] font-bold uppercase text-[#333]" style={{ fontFamily: 'Arial, sans-serif' }}>
            {madrasaInfo.addressEn}
          </p>
        </div>
      </div>

      {/* 3. Horizontal Separator Line */}
      <div className="h-[2px] bg-[#4a0404] w-full mb-8"></div>

      {/* 4. Admit Card Label (Brush Stroke) */}
      <div className="flex justify-center mb-10">
        <div className="brush-container">
          <span className="text-3xl font-bangla tracking-wider">প্রবেশপত্র</span>
        </div>
      </div>

      {/* 5. Main Information Section */}
      <div className="flex flex-1 px-10">
        {/* Student Details (Left) */}
        <div className="flex-1 space-y-4">
          <DetailRow label="নাম" value={student.name} />
          <DetailRow label="পিতার নাম" value={student.fatherName} />
          <DetailRow label="জামাত" value={student.jammat} />
          <DetailRow label="রোল নং" value={student.roll} />
          <DetailRow label="দাখেলা" value={student.dakhila} />
        </div>

        {/* QR Code (Right) */}
        <div className="ml-12 flex flex-col items-center">
          <div className="p-2 border border-black/10 bg-transparent">
            <QRCodeSVG value={qrValue} size={220} bgColor="transparent" />
          </div>
        </div>
      </div>

      {/* 6. Footer (Signature) */}
      <div className="mt-8 flex justify-center pb-4">
        <div className="text-center border-t border-black w-40 pt-1">
          <p className="font-bangla text-xl font-bold">মুহতামিম</p>
        </div>
      </div>
    </div>
  );
};

// Helper component for aligning the details exactly as shown in the image
const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex text-[28px] font-bangla text-[#222]">
    <div className="w-[140px] flex justify-between">
      <span>{label}</span>
      <span>:</span>
    </div>
    <div className="ml-4 font-bold flex-1">{value}</div>
  </div>
);

export default AdmitCard;
