
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { MadrasaInfo, Student } from '../types';
import { FileSpreadsheet, Download, RefreshCw, Printer } from 'lucide-react';
import AdmitCard from './AdmitCard';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Props {
  madrasaInfo: MadrasaInfo;
}

const HomeView: React.FC<Props> = ({ madrasaInfo }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];

        const parsedStudents: Student[] = data.slice(1).map(row => ({
          name: String(row[0] || ''),
          fatherName: String(row[1] || ''),
          jammat: String(row[2] || ''),
          roll: String(row[3] || ''),
          dakhila: String(row[4] || '')
        })).filter(s => s.name.trim() !== '');

        setStudents(parsedStudents);
      } catch (err) {
        alert("এক্সেল ফাইলটি পড়তে সমস্যা হয়েছে। দয়া করে সঠিক ফরম্যাট ব্যবহার করুন।");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleDownloadPDF = async () => {
    if (students.length === 0) return;
    setLoading(true);

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const container = document.getElementById('admit-card-container');
      if (!container) return;

      const cards = container.querySelectorAll('.admit-card-static');
      for (let i = 0; i < cards.length; i++) {
        const canvas = await html2canvas(cards[i] as HTMLElement, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        if (i > 0 && i % 2 === 0) {
          pdf.addPage();
        }
        
        const yOffset = (i % 2 === 0) ? 10 : 150;
        pdf.addImage(imgData, 'PNG', 10, yOffset, imgWidth, imgHeight);
      }

      pdf.save(`${madrasaInfo.nameBn}_Admit_Cards.pdf`);
    } catch (err) {
      alert("পিডিএফ তৈরি করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!showPreview ? (
        <div className="bg-white p-6 md:p-12 rounded-2xl shadow-xl text-center border border-gray-100 mx-2">
          <div className="mb-6 bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-indigo-600">
            <FileSpreadsheet size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-2">এক্সেল ফাইল আপলোড করুন</h2>
          <p className="text-gray-500 mb-8 px-4">আপনার মাদ্রাসার ছাত্রদের তালিকাটি এখানে আপলোড করুন।</p>
          
          <div className="relative mb-8 group">
            <input 
              type="file" 
              accept=".xlsx, .xls" 
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="border-2 border-dashed border-indigo-200 rounded-xl p-12 group-hover:border-indigo-500 group-hover:bg-indigo-50 transition-all duration-300">
              <span className="text-indigo-600 font-bold block mb-2">ফাইল নির্বাচন করতে এখানে ক্লিক করুন</span>
              {students.length > 0 && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold inline-block">
                  {students.length} জন ছাত্র লোড হয়েছে
                </div>
              )}
            </div>
          </div>

          {students.length > 0 && (
            <button 
              onClick={() => setShowPreview(true)}
              className="w-full md:w-auto bg-indigo-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 mx-auto transition-all active:scale-95"
            >
              প্রবেশপত্র জেনারেট করুন
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4 px-2">
          {/* Mobile Friendly Toolbar */}
          <div className="flex flex-col md:flex-row gap-3 justify-between items-center bg-white p-4 rounded-xl shadow-md sticky top-[72px] z-40 border border-indigo-50">
            <button 
              onClick={() => setShowPreview(false)}
              className="w-full md:w-auto text-gray-600 hover:text-indigo-600 font-bold flex items-center justify-center gap-2 p-2"
            >
              <RefreshCw size={20} /> নতুন ফাইল
            </button>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <button 
                onClick={handleDownloadPDF}
                disabled={loading}
                className="w-full md:w-auto bg-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 disabled:bg-gray-400"
              >
                {loading ? 'প্রসেসিং...' : <><Download size={20} /> PDF ডাউনলোড</>}
              </button>
              <button 
                onClick={() => window.print()}
                className="w-full md:w-auto bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 no-print"
              >
                <Printer size={20} /> প্রিন্ট
              </button>
            </div>
          </div>

          {/* Cards Preview with scaling for mobile */}
          <div id="admit-card-container" className="flex flex-col gap-6 items-center py-6 bg-gray-200/50 rounded-2xl">
            {students.map((student, idx) => (
              <div key={idx} className="card-wrapper w-full flex justify-center no-print">
                <div className="card-scaler">
                  <AdmitCard student={student} madrasaInfo={madrasaInfo} />
                </div>
              </div>
            ))}
            
            {/* Hidden static cards for PDF generation (ensures high quality) */}
            <div className="absolute opacity-0 pointer-events-none -z-50 left-[-9999px]">
               {students.map((student, idx) => (
                 <div key={`static-${idx}`} className="admit-card-static">
                   <AdmitCard student={student} madrasaInfo={madrasaInfo} />
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;
