import React, { useState } from 'react';
import { Activity, Droplet, AlertTriangle, Info, Syringe, Heart } from 'lucide-react';

/* =========================================
   MAIN APPLICATION CONTROLLER
   ========================================= */
export default function App() {
  const [activeTab, setActiveTab] = useState('maintenance');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper to change tabs and close the menu automatically
  const handleNavigation = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  // Module configuration for clean rendering
  const modules = [
    { id: 'maintenance', label: 'Maintenance & Losses' },
    { id: 'shock', label: 'Resuscitation (Shock)' },
    { id: 'electrolytes', label: 'Electrolyte Corrections' },
    { id: 'tpn', label: 'TPN Builder' },
    { id: 'blood', label: 'Blood Products' },
    { id: 'iv_rate', label: 'IV Drip Rate' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-10 font-sans">
      
      {/* Header with Hamburger Toggle */}
      <header className="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-30 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black tracking-tight text-white">Paediatrics</h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Clinical Calculator</p>
        </div>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="p-2 bg-gray-800 rounded-lg text-gray-200 hover:text-white hover:bg-gray-700 transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            /* Close (X) Icon */
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            /* Hamburger Menu Icon */
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      </header>

      {/* Full-Screen Dark Overlay & Dropdown Menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900 bg-opacity-60 backdrop-blur-sm transition-opacity mt-[76px]" 
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className="bg-white shadow-2xl overflow-hidden animate-in slide-in-from-top-2 duration-200 border-b-4 border-blue-600 rounded-b-2xl" 
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col divide-y divide-gray-100">
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => handleNavigation(mod.id)}
                  className={`px-6 py-4 text-left font-bold transition-colors w-full flex justify-between items-center ${activeTab === mod.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'}`}
                >
                  <span className="text-lg">{mod.label}</span>
                  {activeTab === mod.id && (
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto p-4 relative z-0">
        
        {/* Active Module Rendering Engine */}
        <main className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mt-2">
          {activeTab === 'maintenance' && <MaintenanceModule />}
          {activeTab === 'shock' && <ShockModule />}
          {activeTab === 'electrolytes' && <ElectrolyteModule />}
          {activeTab === 'tpn' && <TpnModule />}
          {activeTab === 'blood' && <BloodModule />}
          {activeTab === 'iv_rate' && <IvRateModule />}
        </main>

      </div>
    </div>
  );
}

function TabButton({ icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full py-3 ${
        isActive ? 'text-blue-600 border-t-2 border-blue-600' : 'text-gray-400'
      }`}
    >
      {React.cloneElement(icon, { size: 20 })}
      <span className="text-[10px] mt-1 font-medium">{label}</span>
    </button>
  );
}

/* =========================================
   MODULE 1: IV Drip Rate Calculator
   ========================================= */
function IvRateModule() {
  const [volume, setVolume] = useState('');
  const [timeHours, setTimeHours] = useState('');
  const [dropFactor, setDropFactor] = useState('60');

  const vol = parseFloat(volume) || 0;
  const hrs = parseFloat(timeHours) || 0;
  const factor = parseInt(dropFactor) || 60;

  // Math calculations
  const mlPerHour = hrs > 0 ? vol / hrs : 0;
  const dropsPerMin = hrs > 0 ? (vol * factor) / (hrs * 60) : 0;
  const dropsPer10Sec = dropsPerMin / 6;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Gravity Drip Rate Converter</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500 font-semibold uppercase block">Total Volume (mL)</label>
          <input 
            type="number" 
            value={volume} 
            onChange={(e) => setVolume(e.target.value)} 
            className="w-full mt-1 p-3 border rounded-lg text-lg font-bold" 
            placeholder="e.g. 500" 
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 font-semibold uppercase block">Time (Hours)</label>
          <input 
            type="number" 
            value={timeHours} 
            onChange={(e) => setTimeHours(e.target.value)} 
            className="w-full mt-1 p-3 border rounded-lg text-lg font-bold" 
            placeholder="e.g. 4" 
            step="0.5"
          />
        </div>
      </div>

      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 shadow-sm mt-4">
        <label className="text-xs text-blue-800 font-bold uppercase block mb-2">Giving Set Drop Factor</label>
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => setDropFactor('60')} 
            className={`p-3 rounded border text-sm font-bold transition-colors ${dropFactor === '60' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-blue-800'}`}
          >
            <span className="block text-lg">60</span>
            <span className="text-[10px] font-normal uppercase">Microdrip (Paeds)</span>
          </button>
          <button 
            onClick={() => setDropFactor('20')} 
            className={`p-3 rounded border text-sm font-bold transition-colors ${dropFactor === '20' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-blue-800'}`}
          >
            <span className="block text-lg">20</span>
            <span className="text-[10px] font-normal uppercase">Macrodrip (Adult)</span>
          </button>
        </div>
        <p className="text-[10px] text-blue-600 mt-2 italic font-semibold">*Check the IV set packaging. Adult sets are usually 15 or 20 drops/mL.</p>
      </div>

      {vol > 0 && hrs > 0 && (
        <div className="mt-6 space-y-4 animate-in fade-in duration-300">
          
          <div className="bg-gray-800 text-white p-5 rounded-xl text-center shadow-md border-b-4 border-gray-900">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-widest block mb-2">Target Infusion Rate</span>
            
            <div className="flex justify-center items-end space-x-2">
              <span className="text-5xl font-black text-green-400">{Math.round(dropsPerMin)}</span>
              <span className="text-lg font-bold text-gray-300 pb-1">drops / min</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-700">
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Pump Setting</p>
                <p className="text-xl font-bold text-white mt-1">{mlPerHour.toFixed(1)} <span className="text-xs text-gray-300">mL/hr</span></p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Bedside Calibration</p>
                <p className="text-xl font-bold text-amber-400 mt-1">{Math.round(dropsPer10Sec)} <span className="text-xs text-gray-300">drops / 10 sec</span></p>
              </div>
            </div>
          </div>
          
          {factor === 60 && (
            <div className="bg-green-50 p-3 rounded border border-green-200 text-center">
              <span className="text-xs font-bold text-green-800 uppercase">Pediatric Rule Engaged</span>
              <p className="text-sm text-green-900 mt-1 font-semibold">With a 60-drop set, drops per minute is exactly equal to mL per hour.</p>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
/* =========================================
   MODULE 2: Holliday-Segar Maintenance & Ongoing Losses
   ========================================= */
function MaintenanceModule() {
  const [weight, setWeight] = useState('');
  const [temperature, setTemperature] = useState('');
  const [modifier, setModifier] = useState('standard');
  const [passedUrine, setPassedUrine] = useState(false);
  const [lossEpisodes, setLossEpisodes] = useState(0);
  
  // New Neonatal State
  const [birthWeightGrams, setBirthWeightGrams] = useState('');
  const [neonateDay, setNeonateDay] = useState(1);

  const wt = parseFloat(weight) || 0;
  const temp = parseFloat(temperature) || 37.0;
  let baseVol = 0;
  let fluidType = '';
  let neoRate = 0;

  
  // Base Maintenance Calculation
  if (wt > 0) {
    if (modifier === 'neonate') {
      const bw = parseFloat(birthWeightGrams) || 0;
      if (bw > 0) {
        // Table 136-IV Logic
        if (bw < 1000) {
          neoRate = [80, 100, 120, 130, 140, 150, 160][neonateDay - 1];
        } else if (bw >= 1000 && bw <= 1500) {
          neoRate = [80, 95, 110, 120, 130, 140, 150][neonateDay - 1];
        } else {
          neoRate = [60, 75, 90, 105, 120, 135, 150][neonateDay - 1];
        }
        baseVol = wt * neoRate;
        fluidType = "10% Dextrose in Water (Electrolytes usually added after 48h based on lab values)";
      }
    } else {
      // Table 136-III Logic (Local Protocol: 20mL/kg for >20kg)
      if (wt <= 10) baseVol = wt * 100;
      else if (wt <= 20) baseVol = 1000 + ((wt - 10) * 50);
      else baseVol = 1500 + ((wt - 20) * 20);

      if (modifier === 'sam') {
        baseVol = baseVol * 0.75;
        fluidType = "F-75 Therapeutic Milk via Oral/NGT. (Avoid IV maintenance in SAM!)";
      } else if (modifier === 'cerebral') {
        baseVol = baseVol * 0.75;
        fluidType = "4.3% Dextrose in 0.18% Saline (Monitor glucose closely)";
      } else {
        fluidType = "4.3% Dextrose in 0.18% Saline (Standard Paediatric Maintenance)";
      }
    }
  }

  // Fever Modifier Calculation (10% increase per 1°C above 37.5°C)
  let feverExtraVol = 0;
  if (temp > 37.5 && wt > 0) {
    const feverDegrees = temp - 37.5;
    feverExtraVol = baseVol * (feverDegrees * 0.10);
  }

  // Ongoing Losses Calculation (ABUTH Protocol: 10mL/kg per output)
  const ongoingLossVol = wt > 0 ? (wt * 10 * lossEpisodes) : 0;
  
  const totalDailyVol = baseVol + feverExtraVol + ongoingLossVol;
  const hourlyRate = (totalDailyVol / 24).toFixed(1);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Maintenance Fluid & Losses</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500 font-semibold uppercase">Current Wt (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full mt-1 p-3 border rounded-lg text-lg font-bold" placeholder="e.g. 14" />
        </div>
        <div>
          <label className="text-xs text-gray-500 font-semibold uppercase">Temp (°C)</label>
          <input type="number" step="0.1" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="w-full mt-1 p-3 border rounded-lg text-lg font-bold" placeholder="37.0" />
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-500 font-semibold uppercase">Clinical Context (Modifiers)</label>
        <select value={modifier} onChange={(e) => setModifier(e.target.value)} className="w-full mt-1 p-3 border rounded-lg bg-white shadow-sm font-bold text-gray-700">
          <option value="standard">Standard (No Modifiers)</option>
          <option value="sam">Severe Acute Malnutrition (25% reduction)</option>
          <option value="cerebral">Cerebral Malaria (25% restriction)</option>
          <option value="neonate">Neonate (1st Week of Life)</option>
        </select>
      </div>

      {/* Neonatal Specific Inputs */}
      {modifier === 'neonate' && (
        <div className="grid grid-cols-2 gap-4 p-3 bg-amber-50 border border-amber-200 rounded-lg shadow-inner animate-in fade-in duration-200">
          <div>
            <label className="text-xs text-amber-800 font-bold uppercase">Birth Wt (grams)</label>
            <input type="number" value={birthWeightGrams} onChange={(e) => setBirthWeightGrams(e.target.value)} className="w-full mt-1 p-2 border rounded font-semibold" placeholder="e.g. 1200" />
          </div>
          <div>
            <label className="text-xs text-amber-800 font-bold uppercase">Day of Life</label>
            <select value={neonateDay} onChange={(e) => setNeonateDay(Number(e.target.value))} className="w-full mt-1 p-2 border rounded bg-white font-semibold">
              {[1, 2, 3, 4, 5, 6, 7].map(d => (
                <option key={d} value={d}>Day {d}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Ongoing Losses Tracker */}
      <div className="bg-white p-3 border rounded-lg shadow-sm">
        <label className="text-xs text-gray-500 font-semibold uppercase block mb-2">Ongoing Abnormal Losses (Diarrhea/Vomiting)</label>
        <div className="flex items-center justify-between bg-gray-50 p-2 rounded border">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-800">Outputs Charted: {lossEpisodes}</span>
            <span className="text-xs text-amber-600 font-semibold">+ {Math.round(ongoingLossVol)} mL deficit to replace</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLossEpisodes(Math.max(0, lossEpisodes - 1))}
              className="w-10 h-10 flex items-center justify-center bg-white border rounded-full text-gray-600 font-bold hover:bg-gray-100 shadow-sm"
            >-</button>
            <button 
              onClick={() => setLossEpisodes(lossEpisodes + 1)}
              className="w-10 h-10 flex items-center justify-center bg-blue-100 border border-blue-200 rounded-full text-blue-700 font-bold hover:bg-blue-200 shadow-sm"
            >+</button>
          </div>
        </div>
      </div>

      <label className="flex items-center space-x-2 mt-2 p-3 bg-white border rounded-lg shadow-sm cursor-pointer transition-colors hover:bg-gray-50">
        <input type="checkbox" checked={passedUrine} onChange={(e) => setPassedUrine(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" />
        <span className="text-sm font-semibold text-gray-700">Patient has passed urine</span>
      </label>

      {wt > 0 && (modifier !== 'neonate' || parseFloat(birthWeightGrams) > 0) && (
        <div className="mt-6 space-y-4 animate-in fade-in duration-300">
          
          {temp > 37.5 && (
            <AlertBanner level="amber" text={`Fever detected (${temp}°C): Added ${Math.round(feverExtraVol)} mL to maintenance to compensate for hypermetabolic state.`} />
          )}
          {modifier === 'sam' && <AlertBanner level="amber" text="Start F-75. Aggressive IV fluids dangerous in SAM." />}
          
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-xs text-blue-600 font-bold uppercase">Recommended Fluid</span>
              {modifier === 'neonate' && <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded font-bold">{neoRate} mL/kg/day</span>}
            </div>
            <p className="text-sm font-semibold text-gray-800 mt-1">{fluidType}</p>
          </div>

          {modifier !== 'neonate' && modifier !== 'sam' && (
            passedUrine ? (
              <AlertBanner level="green" text="Urine output confirmed: Add 20 mmol/L of KCl to the fluid." />
            ) : (
              <AlertBanner level="red" text="No urine output verified: Do NOT add Potassium." />
            )
          )}

{/* Automatic GIR Calculator for Neonates */}
          {modifier === 'neonate' && wt > 0 && (
            <div className="mt-2 bg-purple-50 border border-purple-200 p-3 rounded-lg shadow-sm text-center">
              <span className="text-xs text-purple-700 font-bold uppercase block">Calculated Glucose Infusion Rate (10% Dextrose)</span>
              <p className="text-2xl font-black text-purple-800 mt-1">
                {((hourlyRate * 10) / (wt * 6)).toFixed(1)} <span className="text-sm font-semibold text-purple-600">mg/kg/min</span>
              </p>
              <p className="text-[10px] text-purple-600 mt-1 italic font-medium">Target: 4.0 - 8.0 mg/kg/min. Adjust fluid volume or dextrose concentration if out of range.</p>
            </div>
          )}
          <div className="mt-2 bg-gray-800 text-white p-5 rounded-xl text-center shadow-md border-b-4 border-gray-900">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">Total 24H Volume</span>
            <p className="text-4xl font-black mt-1 text-white">{Math.round(totalDailyVol)} <span className="text-lg font-medium text-gray-300">mL</span></p>
            <div className="text-xs text-gray-400 mt-1 space-x-2">
              <span>Base: {Math.round(baseVol)}</span>
              {feverExtraVol > 0 && <span>| Fever: +{Math.round(feverExtraVol)}</span>}
              {ongoingLossVol > 0 && <span>| Losses: +{Math.round(ongoingLossVol)}</span>}
            </div>
            <div className="border-t border-gray-700 mt-4 pt-3 text-sm">
              Run at <strong className="text-2xl text-blue-400 mx-1">{hourlyRate}</strong> mL/hour
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
/* =========================================
   MODULE 3: Resuscitation (Shock & Severe Dehydration)
   ========================================= */
function ShockModule() {
  const [weight, setWeight] = useState('');
  const [grade, setGrade] = useState('severe');
  const [ageGroup, setAgeGroup] = useState('infant');
  const [isSam, setIsSam] = useState(false);

  const wt = parseFloat(weight) || 0;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Resuscitation (WHO & Azubuike)</h2>
      
      <div>
        <label className="text-xs text-gray-500 font-semibold uppercase">Patient Weight (kg)</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full mt-1 p-3 border rounded-lg text-lg" placeholder="e.g. 8" />
      </div>

      <label className="flex items-center space-x-2 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg shadow-sm cursor-pointer transition-colors hover:bg-red-100">
        <input type="checkbox" checked={isSam} onChange={(e) => setIsSam(e.target.checked)} className="w-5 h-5 text-red-600 rounded" />
        <span className="text-sm font-bold text-red-800">Patient has Severe Acute Malnutrition (SAM)</span>
      </label>

      {!isSam && (
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 font-semibold uppercase mt-2 block">Age Group</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              <button 
                onClick={() => setAgeGroup('neonate')} 
                className={`p-2 rounded-lg border text-xs font-bold transition-colors ${ageGroup === 'neonate' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-600'}`}
              >
                &lt; 28 Days
              </button>
              <button 
                onClick={() => setAgeGroup('infant')} 
                className={`p-2 rounded-lg border text-xs font-bold transition-colors ${ageGroup === 'infant' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-600'}`}
              >
                1 - 12 Mos
              </button>
              <button 
                onClick={() => setAgeGroup('child')} 
                className={`p-2 rounded-lg border text-xs font-bold transition-colors ${ageGroup === 'child' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-600'}`}
              >
                &gt; 12 Mos
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 font-semibold uppercase block">Shock / Dehydration Grade</label>
            <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full mt-1 p-3 border rounded-lg bg-white shadow-sm font-medium">
              <option value="mild">Mild/Moderate - No Shock</option>
              <option value="severe">Severe - Established Shock</option>
              <option value="septic">Septic / Distributive Shock</option>
            </select>
          </div>
        </div>
      )}

      {wt > 0 && (
        <div className="mt-6 space-y-4 animate-in fade-in duration-300">
          
         {/* SAM OVERRIDE PROTOCOL */}
          {isSam && (
            <div className="bg-white p-4 rounded-xl border-2 border-red-500 shadow-md">
              <AlertBanner level="red" text="CRITICAL: Standard WHO Plan C is FATAL in SAM." />
              <div className="mt-4 space-y-3">
                <div className="border-l-4 border-red-600 pl-3">
                  <span className="text-xs font-black text-red-600 tracking-wider">SAM SHOCK BOLUS (15 mL/kg)</span>
                  <p className="text-xs text-gray-800 font-bold mb-1 mt-1">Fluid Options (must include 5% Dextrose):<br/>• Ringer's Lactate<br/>• Half-Strength Darrow's<br/>• 0.45% NaCl</p>
                  
                  <p className="text-3xl font-black text-red-700 mt-2">{Math.round(wt * 15)} <span className="text-lg">mL</span></p>
                  <p className="text-sm font-bold text-red-600 mt-1">Run strictly over 1 Hour</p>
                  <p className="text-[11px] text-gray-600 mt-1 italic font-semibold">Monitor pulse rate & breathing rate every 5–10 mins.</p>

                  <div className="text-xs text-gray-800 mt-4 border-t border-red-100 pt-3 space-y-3">
                    <div>
                      <strong className="text-green-700 text-sm">If improving:</strong> 
                      <p className="mt-1">1. <strong>REPEAT</strong> this {Math.round(wt * 15)} mL bolus over another 1 hour.</p>
                      <p>2. Then switch to oral/NGT ReSoMal (10 mL/kg/hr for up to 10 hrs).</p>
                    </div>
                    
                    <div>
                      <strong className="text-amber-700 text-sm">If fails to improve (after 2 boluses):</strong>
                      <p className="mt-1">1. Give maintenance IV fluid at <strong>{Math.round(wt * 4)} mL/hr</strong> while waiting for blood.</p>
                      <p>2. Transfuse fresh whole blood (10 mL/kg slowly over 3 hrs).</p>
                      <p>3. Start IV antibiotics.</p>
                    </div>

                    <div className="bg-red-50 p-2 border border-red-200 rounded mt-2">
                      <strong className="text-red-700 font-black uppercase">STOP INFUSION IF DETERIORATING:</strong>
                      <p className="text-red-800 mt-1 leading-tight">If RR increases by 5/min, HR increases by 15/min, liver enlarges, or fine crackles develop, stop IV immediately (inducing pulmonary edema).</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
         {/* MILD / MODERATE (NON-SAM) */}
          {!isSam && grade === 'mild' && (
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <AlertBanner level="green" text="First line: Oral Rehydration Therapy (ORS) over 4 hrs." />
              <div className="mt-3 border-l-4 border-green-500 pl-3">
                <p className="text-xs text-gray-600 font-bold">If IV required (e.g. intractable vomiting):</p>
                <p className="text-xs text-green-700 font-bold mb-1 mt-1">Use: 4.3% Dextrose in 0.18% Saline</p>
                <p className="text-xl font-bold text-gray-800 mt-1">Total Deficit: {Math.round(wt * 75)} mL</p>
                
                {ageGroup === 'neonate' ? (
                  <div className="mt-2 bg-amber-50 p-2 rounded border border-amber-200">
                    <p className="text-sm font-bold text-amber-700">NEONATE CAUTION:</p>
                    <p className="text-xs font-semibold text-amber-800 mt-1">Do NOT run rapidly over 4 hours. Spread this deficit slowly over <strong>24 hours</strong> (Add to daily maintenance volume).</p>
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-green-700 mt-1">Run at {((wt * 75) / 4).toFixed(1)} mL/hr over 4 hours</p>
                )}
              </div>
            </div>
          )}

          {/* SEVERE DEHYDRATION WHO PLAN C (NON-SAM, INFANT & CHILD) */}
          {!isSam && grade === 'severe' && ageGroup !== 'neonate' && (
            <div className="bg-white p-4 rounded-xl border-red-200 shadow-sm border">
              <AlertBanner level="red" text="Emergency: Immediate IV Resuscitation." />
              <div className="mt-4 space-y-4">
                <div className="border-l-4 border-red-500 pl-3 bg-red-50 py-2 pr-2 rounded-r-lg">
                  <span className="text-xs font-bold text-red-500 tracking-wider">PHASE 1 (BOLUS: 30 mL/kg)</span>
                  <p className="text-xs text-red-700 font-bold mb-1 mt-1">Use ONLY: Ringer's Lactate or 0.9% Normal Saline</p>
                  <p className="text-2xl font-black text-red-700">{Math.round(wt * 30)} <span className="text-base font-bold">mL</span></p>
                  <p className="text-sm font-bold text-red-800 mt-1 bg-red-100 inline-block px-2 py-1 rounded">
                    Give over {ageGroup === 'infant' ? '1 Hour' : '30 Minutes'}
                  </p>
                  <p className="text-xs text-gray-600 mt-2 border-t border-red-200 pt-2">Assess radial pulse. Repeat Phase 1 if pulse is still very weak.</p>
                </div>
                
                <div className="border-l-4 border-amber-400 pl-3 py-1">
                  <span className="text-xs font-bold text-gray-500 tracking-wider">PHASE 2 (DEFICIT: 70 mL/kg)</span>
                  <p className="text-xs text-amber-700 font-bold mb-1 mt-1">Use: Ringer's Lactate or 0.9% Normal Saline</p>
                  <p className="text-xl font-bold text-gray-800">{Math.round(wt * 70)} <span className="text-sm">mL</span></p>
                  <p className="text-sm font-bold text-amber-600 mt-1">
                    Give over {ageGroup === 'infant' ? '5 Hours' : '2.5 Hours'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SEPTIC SHOCK (NON-SAM) */}
          {!isSam && grade === 'septic' && (
            <div className="bg-red-50 p-4 rounded-xl border border-red-300 shadow-sm">
              <AlertBanner level="red" text="Initiate Sepsis-6 Bundle Immediately." />
              <div className="mt-3">
                <div className="border-l-4 border-red-600 pl-3">
                  <p className="text-xs text-red-800 font-bold mb-1">Use: 0.9% Normal Saline or Ringer's Lactate</p>
                  <p className="text-3xl font-black text-red-700 mt-1">{Math.round(wt * 20)} <span className="text-lg">mL</span></p>
                  <p className="text-sm font-bold text-red-800 mt-1 bg-red-100 inline-block px-2 py-1 rounded">Push over 5-10 minutes</p>
                  <p className="text-xs text-red-700 mt-2 font-semibold">May repeat x3 (up to {Math.round(wt * 60)} mL total) if no hepatomegaly or crackles develop.</p>
                </div>
                <ul className="text-xs text-gray-800 mt-4 list-disc pl-5 space-y-1 bg-white p-3 rounded-lg border border-red-100">
                  <li>Administer High-flow oxygen</li>
                  <li>Draw Blood cultures (before ABX)</li>
                  <li>Give IV antibiotics within 1 hr</li>
                  <li>Check glucose & lactate</li>
                </ul>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

/* =========================================
   MODULE 4: Dyselectrolytemia (Na+ & K+)
   ========================================= */
function ElectrolyteModule() {
  const [ion, setIon] = useState('sodium');
  const [weight, setWeight] = useState('');
  const [sex, setSex] = useState('male');
  
  // Sodium States
  const [currentNa, setCurrentNa] = useState('');
  const [targetNa, setTargetNa] = useState('135');
  
  // Potassium States
  const [kStatus, setKStatus] = useState('hyperkalemia');
  const [symptomatic, setSymptomatic] = useState(false);

  const wt = parseFloat(weight) || 0;
  const cNa = parseFloat(currentNa) || 0;
  const tNa = parseFloat(targetNa) || 0;

  // Sodium Math: TBW is 0.6 for males, 0.5 for females (as per ABUTH slides)
  const tbw = sex === 'male' ? wt * 0.6 : wt * 0.5;
  const naDeficit = tbw * (tNa - cNa);
  const isHyponatremia = cNa > 0 && cNa < 135;
  const isHypernatremia = cNa > 145;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Dyselectrolytemia & Corrections</h2>

      {/* Main Ion Toggle */}
      <div className="grid grid-cols-2 gap-2 mt-1">
        <button 
          onClick={() => setIon('sodium')} 
          className={`p-3 rounded-lg border text-sm font-bold transition-colors ${ion === 'sodium' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-600'}`}
        >
          Sodium (Na+)
        </button>
        <button 
          onClick={() => setIon('potassium')} 
          className={`p-3 rounded-lg border text-sm font-bold transition-colors ${ion === 'potassium' ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white text-gray-600'}`}
        >
          Potassium (K+)
        </button>
      </div>

      <div>
        <label className="text-xs text-gray-500 font-semibold uppercase">Patient Weight (kg)</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full mt-1 p-3 border rounded-lg text-lg font-bold" placeholder="e.g. 10" />
      </div>

      {/* ================= SODIUM MODULE ================= */}
      {ion === 'sodium' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 font-semibold uppercase">Biological Sex</label>
              <select value={sex} onChange={(e) => setSex(e.target.value)} className="w-full mt-1 p-3 border rounded-lg bg-white shadow-sm font-medium">
                <option value="male">Male (0.6 TBW)</option>
                <option value="female">Female (0.5 TBW)</option>
              </select>
            </div>
            <div>
               {/* Spacer for alignment */}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 font-semibold uppercase">Current Na+ (mmol/L)</label>
              <input type="number" value={currentNa} onChange={(e) => setCurrentNa(e.target.value)} className="w-full mt-1 p-3 border rounded-lg font-bold text-red-600" placeholder="e.g. 120" />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-semibold uppercase">Desired Na+ (mmol/L)</label>
              <input type="number" value={targetNa} onChange={(e) => setTargetNa(e.target.value)} className="w-full mt-1 p-3 border rounded-lg font-bold text-green-600" />
            </div>
          </div>

          {wt > 0 && cNa > 0 && (
            <div className="mt-4">
              {/* HYPONATREMIA */}
              {isHyponatremia && (
                <div className="bg-white p-4 rounded-xl border-2 border-blue-300 shadow-md">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg mb-3">
                    <span className="text-xs font-black text-blue-700 tracking-wider">HYPONATREMIA CORRECTION</span>
                    <p className="text-2xl font-black text-blue-800 mt-1">{naDeficit.toFixed(1)} <span className="text-sm font-bold">mmol Na+ Deficit</span></p>
                    <p className="text-xs text-blue-800 mt-1 font-semibold">Formula: {sex === 'male' ? '0.6' : '0.5'} × BW × (Desired - Actual)</p>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-800 border-t pt-3">
                    <p className="font-bold text-red-600 uppercase text-xs">Correction Speed Limits[cite: 89, 90]:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Symptomatic:</strong> Max increase of 3 mmol/L in 1 hr (or 5 mmol/L in 2 hrs).</li>
                      <li><strong>Asymptomatic:</strong> Max 0.5 mmol/hr (Do not exceed 10 mmol/day).</li>
                    </ul>
                    <div className="bg-gray-100 p-2 rounded mt-2 text-xs font-semibold">
                      Use 3% NaCl or 0.9% Normal Saline for correction[cite: 88]. Dilutional hyponatremia requires water restriction (60-70% of maintenance)[cite: 91].
                    </div>
                  </div>
                </div>
              )}

              {/* HYPERNATREMIA */}
              {isHypernatremia && (
                <div className="bg-white p-4 rounded-xl border-2 border-orange-300 shadow-md">
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded-r-lg mb-3">
                    <span className="text-xs font-black text-orange-700 tracking-wider">HYPERNATREMIA MANAGEMENT</span>
                    <p className="text-2xl font-black text-orange-800 mt-1">{Math.abs(naDeficit).toFixed(1)} <span className="text-sm font-bold">mmol Na+ Excess</span></p>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-800 border-t pt-3">
                    <p className="font-bold text-red-600 uppercase text-xs">Correction Speed Limits[cite: 147]:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Max Reduction Rate:</strong> 10 - 12 mmol/L in 24 hours (0.5 mmol/L per hour).</li>
                      <li className="text-red-700 font-bold">Rapid correction causes cerebral edema and seizures.</li>
                    </ul>
                    <div className="bg-gray-100 p-2 rounded mt-2 text-xs font-semibold space-y-1">
                      <p><strong>Shock:</strong> Give 20ml/kg NS over 30 mins first[cite: 143].</p>
                      <p><strong>Correction Fluids:</strong> Never give hypotonic fluids as a bolus[cite: 142]. Lowering is achieved over 2-3 days[cite: 147].</p>
                    </div>
                  </div>
                </div>
              )}

              {!isHyponatremia && !isHypernatremia && (
                <div className="bg-green-50 p-3 rounded border border-green-200 text-green-800 font-bold text-center">
                  Current Na+ is within normal range (135 - 145 mmol/L).
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ================= POTASSIUM MODULE ================= */}
      {ion === 'potassium' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div>
            <label className="text-xs text-gray-500 font-semibold uppercase block">Clinical State</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button 
                onClick={() => setKStatus('hypokalemia')} 
                className={`p-2 rounded-lg border text-xs font-bold transition-colors ${kStatus === 'hypokalemia' ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600'}`}
              >
                Hypokalemia (&lt; 3.5)
              </button>
              <button 
                onClick={() => setKStatus('hyperkalemia')} 
                className={`p-2 rounded-lg border text-xs font-bold transition-colors ${kStatus === 'hyperkalemia' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600'}`}
              >
                Hyperkalemia (&gt; 5.5)
              </button>
            </div>
          </div>

          {wt > 0 && kStatus === 'hyperkalemia' && (
            <div className="bg-red-50 p-4 rounded-xl border-2 border-red-400 shadow-md">
              <div className="border-b border-red-200 pb-2 mb-3">
                <span className="text-xs font-black text-red-700 tracking-wider block">HYPERKALEMIA CRASH COCKTAIL</span>
                <span className="text-[10px] text-red-600 font-bold uppercase">All treatments mandate continuous ECG monitoring [cite: 262]</span>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border border-red-100 shadow-sm">
                  <p className="text-xs text-gray-500 font-bold uppercase">1. Cardioprotection</p>
                  <p className="text-sm font-black text-gray-800">10% Calcium Gluconate: <span className="text-red-600 text-lg">{(wt * 0.5).toFixed(1)} mL</span></p>
                  <p className="text-xs text-gray-600">Give IV slowly over 10 minutes[cite: 258].</p>
                </div>
                
                <div className="bg-white p-3 rounded border border-red-100 shadow-sm">
                  <p className="text-xs text-gray-500 font-bold uppercase">2. Intracellular Shift (Glucose & Insulin)</p>
                  <p className="text-sm font-black text-gray-800">Glucose: <span className="text-blue-600 text-lg">{(wt * 0.5).toFixed(1)} g</span></p>
                  <p className="text-sm font-black text-gray-800">Insulin: <span className="text-blue-600 text-lg">1 Unit</span></p>
                  <p className="text-xs text-gray-600">Give glucose together with 1 unit of insulin[cite: 259].</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white p-3 rounded border border-red-100 shadow-sm">
                    <p className="text-xs text-gray-500 font-bold uppercase">3. Elimination</p>
                    <p className="text-sm font-black text-gray-800">Kayexalate: <span className="text-green-600">{(wt * 1).toFixed(1)} g</span></p>
                    <p className="text-[10px] text-gray-600">Administer rectally[cite: 260].</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-red-100 shadow-sm">
                    <p className="text-xs text-gray-500 font-bold uppercase">4. Redistribution</p>
                    <p className="text-sm font-black text-gray-800">Salbutamol</p>
                    <p className="text-xs text-gray-600">5 - 10 mg[cite: 261].</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {wt > 0 && kStatus === 'hypokalemia' && (
            <div className="bg-white p-4 rounded-xl border border-orange-300 shadow-md">
              <label className="flex items-center space-x-2 mb-4 p-2 bg-orange-50 rounded border border-orange-200">
                <input type="checkbox" checked={symptomatic} onChange={(e) => setSymptomatic(e.target.checked)} className="w-5 h-5 text-orange-600 rounded" />
                <span className="text-sm font-bold text-orange-800">Patient is Symptomatic (ECG changes, weakness)</span>
              </label>

              {symptomatic ? (
                <div className="border-l-4 border-orange-500 pl-3">
                  <span className="text-xs font-black text-orange-600 tracking-wider">SYMPTOMATIC IV CORRECTION</span>
                  <p className="text-sm font-bold text-gray-800 mt-2">Give IV 0.2 mmol/L of 40 mmol/L KCl in 20 mL of 5% glucose over 30 mins[cite: 211].</p>
                  <p className="text-xs text-red-600 font-bold mt-2">Requires continuous ECG monitoring. Do not exceed 80 mmol/L[cite: 211].</p>
                </div>
              ) : (
                <div className="border-l-4 border-green-500 pl-3">
                  <span className="text-xs font-black text-green-600 tracking-wider">ASYMPTOMATIC ORAL CORRECTION</span>
                  <p className="text-sm font-bold text-gray-800 mt-2">Use oral potassium tablets (e.g., 600mg of KCl)[cite: 210].</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
/* =========================================
   MODULE 5: Total Parenteral Nutrition (TPN) Builder
   ========================================= */
function TpnModule() {
  const [weight, setWeight] = useState('');
  const [totalVolume, setTotalVolume] = useState('');
  const [dextrosePercent, setDextrosePercent] = useState('10');
  const [aaPerKg, setAaPerKg] = useState(2);
  const [lipidPerKg, setLipidPerKg] = useState(2);

  const wt = parseFloat(weight) || 0;
  const vol = parseFloat(totalVolume) || 0;
  const dext = parseFloat(dextrosePercent) || 10;

  // Macros & Calories Calculations
  const aaGrams = wt * aaPerKg;
  const lipidGrams = wt * lipidPerKg;
  const dextroseGrams = (vol * dext) / 100;

  const aaCals = aaGrams * 4;
  const lipidCals = lipidGrams * 9;
  const dextroseCals = dextroseGrams * 3.4; // IV Dextrose yields 3.4 kcal/g
  
  const totalCals = aaCals + lipidCals + dextroseCals;
  const nonProteinCals = lipidCals + dextroseCals;

  // Calorie Nitrogen Ratio (CNR) 
  // Formula: Non-Protein Calories / (Amino Acids / 6.25)
  const cnr = aaGrams > 0 ? (nonProteinCals * 6.25) / aaGrams : 0;
  const isCnrOptimal = cnr >= 100 && cnr <= 200;

  // Electrolyte Spiking Requirements (ABUTH Guidelines)
  const naReq = wt * 3;
  const kReq = wt * 2;
  const caReq = wt * 2;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2">TPN Prescription Builder</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500 font-semibold uppercase">Patient Wt (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full mt-1 p-3 border rounded-lg text-lg font-bold" placeholder="e.g. 1.5" />
        </div>
        <div>
          <label className="text-xs text-gray-500 font-semibold uppercase">Target TPN Vol (mL)</label>
          <input type="number" value={totalVolume} onChange={(e) => setTotalVolume(e.target.value)} className="w-full mt-1 p-3 border rounded-lg text-lg font-bold" placeholder="e.g. 150" />
          <p className="text-[10px] text-gray-400 mt-1">*From 24H maintenance calc</p>
        </div>
      </div>

      {wt > 0 && vol > 0 && (
        <div className="space-y-5 animate-in fade-in duration-300">
          
          {/* Macronutrient Sliders */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase border-b pb-2">Macronutrients</h3>
            
            <div>
              <div className="flex justify-between items-end mb-1">
                <label className="text-xs font-bold text-blue-700">Amino Acids (g/kg/day)</label>
                <span className="text-sm font-black text-blue-800">{aaPerKg} g/kg</span>
              </div>
              <input type="range" min="1" max="4" step="0.5" value={aaPerKg} onChange={(e) => setAaPerKg(parseFloat(e.target.value))} className="w-full accent-blue-600" />
              <p className="text-[10px] text-gray-500 flex justify-between mt-1"><span>Target: 1.0 - 3.0</span><span>{aaGrams.toFixed(1)}g total</span></p>
            </div>

            <div>
              <div className="flex justify-between items-end mb-1">
                <label className="text-xs font-bold text-amber-600">Lipids (g/kg/day)</label>
                <span className="text-sm font-black text-amber-700">{lipidPerKg} g/kg</span>
              </div>
              <input type="range" min="0" max="3" step="0.5" value={lipidPerKg} onChange={(e) => setLipidPerKg(parseFloat(e.target.value))} className="w-full accent-amber-500" />
              <p className="text-[10px] text-gray-500 flex justify-between mt-1"><span>Target: 1.0 - 3.0</span><span>{lipidGrams.toFixed(1)}g total</span></p>
            </div>

            <div>
              <label className="text-xs font-bold text-purple-700 block mb-1">Dextrose Concentration (%)</label>
              <select value={dextrosePercent} onChange={(e) => setDextrosePercent(e.target.value)} className="w-full p-2 border rounded-lg bg-gray-50 text-sm font-bold text-purple-800">
                <option value="5">5% Dextrose</option>
                <option value="10">10% Dextrose</option>
                <option value="12.5">12.5% Dextrose (Max Peripheral)</option>
                <option value="15">15% Dextrose (Central Line Only)</option>
              </select>
            </div>
          </div>

          {/* Calorie & CNR Output */}
          <div className={`p-4 rounded-xl border-2 shadow-md ${isCnrOptimal ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
            <div className="flex justify-between items-center border-b pb-2 mb-2 border-opacity-20 border-black">
              <span className="text-xs font-black tracking-wider uppercase">Calorie Nitrogen Ratio (CNR)</span>
              <span className={`text-xl font-black ${isCnrOptimal ? 'text-green-700' : 'text-red-700'}`}>{cnr.toFixed(0)}</span>
            </div>
            {isCnrOptimal ? (
              <p className="text-xs text-green-800 font-bold">Optimal! (Target: 100 - 200). Protein will be used for tissue synthesis.</p>
            ) : (
              <p className="text-xs text-red-800 font-bold">Suboptimal. Adjust Dextrose/Lipids (energy) or Amino Acids to hit 100-200.</p>
            )}
            
            <div className="grid grid-cols-3 gap-2 mt-4 text-center divide-x divide-gray-300">
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-500">Total Kcal</p>
                <p className="text-lg font-black text-gray-800">{totalCals.toFixed(0)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-500">Kcal / kg</p>
                <p className="text-lg font-black text-gray-800">{(totalCals / wt).toFixed(0)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-500">GIR</p>
                <p className="text-lg font-black text-purple-700">{((dextroseGrams * 1000) / (wt * 24 * 60)).toFixed(1)}</p>
              </div>
            </div>
          </div>

          {/* Electrolyte Prescription */}
          <div className="bg-gray-800 text-white p-4 rounded-xl shadow-md border-b-4 border-gray-900">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-widest block mb-3 border-b border-gray-700 pb-2">Electrolyte Additives</span>
            <div className="space-y-2 text-sm font-medium">
              <div className="flex justify-between items-center bg-gray-700 p-2 rounded">
                <span>Sodium (Na+) <span className="text-[10px] text-gray-400 ml-1">@ 3 mEq/kg</span></span>
                <span className="font-bold text-blue-400 text-lg">{naReq.toFixed(1)} mEq</span>
              </div>
              <div className="flex justify-between items-center bg-gray-700 p-2 rounded">
                <span>Potassium (K+) <span className="text-[10px] text-gray-400 ml-1">@ 2 mEq/kg</span></span>
                <span className="font-bold text-red-400 text-lg">{kReq.toFixed(1)} mEq</span>
              </div>
              <div className="flex justify-between items-center bg-gray-700 p-2 rounded">
                <span>Calcium (Ca2+) <span className="text-[10px] text-gray-400 ml-1">@ 2 mEq/kg</span></span>
                <span className="font-bold text-orange-400 text-lg">{caReq.toFixed(1)} mEq</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

/* =========================================
   MODULE 6: ORT (Plan A/B)
   ========================================= */
function ORTModule() {
  const [weight, setWeight] = useState('');
  const [plan, setPlan] = useState('a');
  const [cholera, setCholera] = useState(false);

  const wt = parseFloat(weight) || 0;
  const multiplier = cholera ? 1.5 : 1;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Oral Rehydration (ORT)</h2>
      
      <div>
        <label className="text-xs text-gray-500 font-semibold uppercase">Patient Weight (kg)</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full mt-1 p-3 border rounded-lg" />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <button onClick={() => setPlan('a')} className={`p-3 rounded-lg border text-sm font-semibold ${plan === 'a' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600'}`}>Plan A (None)</button>
        <button onClick={() => setPlan('b_mild')} className={`p-3 rounded-lg border text-sm font-semibold ${plan === 'b_mild' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-gray-600'}`}>Plan B (Mild)</button>
        <button onClick={() => setPlan('b_mod')} className={`p-3 rounded-lg border text-sm font-semibold col-span-2 ${plan === 'b_mod' ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600'}`}>Plan B (Moderate)</button>
      </div>

      <label className="flex items-center space-x-2 mt-4 p-3 bg-white border rounded-lg">
        <input type="checkbox" checked={cholera} onChange={(e) => setCholera(e.target.checked)} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
        <span className="text-sm font-semibold text-gray-700">Cholera Suspected (1.5x Volume)</span>
      </label>

      {wt > 0 && (
        <div className="mt-4 bg-white p-5 rounded-xl border shadow-sm">
          {plan === 'a' && (
            <div>
              <h3 className="font-bold text-green-600">Plan A: Prevent Dehydration</h3>
              <p className="text-sm text-gray-600 mt-1">Extra ORS after each loose stool:</p>
              <p className="text-xl font-black text-gray-800 mt-2">{Math.round((wt * 5) * multiplier)} mL per stool</p>
            </div>
          )}
          {(plan === 'b_mild' || plan === 'b_mod') && (
            <div>
              <h3 className="font-bold text-amber-600">Plan B: Treat Dehydration</h3>
              <p className="text-sm text-gray-600 mt-1">Total volume to give over 4 hours:</p>
              {plan === 'b_mild' ? (
                 <p className="text-2xl font-black text-gray-800 mt-2">{Math.round((wt * 50) * multiplier)} mL</p>
              ) : (
                 <p className="text-2xl font-black text-gray-800 mt-2">{Math.round((wt * 100) * multiplier)} mL</p>
              )}
              <div className="mt-3 text-sm bg-gray-50 p-2 rounded text-gray-700 border">
                <strong>Pacing:</strong> Give roughly {(plan === 'b_mild' ? Math.round(((wt*50)*multiplier)/4) : Math.round(((wt*100)*multiplier)/4))} mL every hour.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================
   MODULE 6: Blood Transfusion & Products
   ========================================= */
function BloodModule() {
  const [weight, setWeight] = useState('');
  const [product, setProduct] = useState('prbc_standard');
  const [calcMode, setCalcMode] = useState('targeted'); // 'emergency' or 'targeted'
  const [measureType, setMeasureType] = useState('pcv'); // 'pcv' or 'hb'
  const [currentVal, setCurrentVal] = useState('');
  const [targetVal, setTargetVal] = useState('');
  
  const wt = parseFloat(weight) || 0;
  const curr = parseFloat(currentVal) || 0;
  const targ = parseFloat(targetVal) || 0;

  // Targeted Volume Math
  const deficit = targ > curr ? targ - curr : 0;
  let factor = 1;
  let factorText = "";

  if (measureType === 'hb') {
    factor = product === 'prbc_standard' ? 4 : 6;
    factorText = product === 'prbc_standard' ? "4 mL/kg per 1 g/dL rise" : "6 mL/kg per 1 g/dL rise";
  } else {
    factor = product === 'prbc_standard' ? 1 : 2;
    factorText = product === 'prbc_standard' ? "1 mL/kg per 1% rise" : "2 mL/kg per 1% rise";
  }
  
  const targetedVolume = wt * deficit * factor;
  const isRedBloodProduct = product === 'prbc_standard' || product === 'whole_blood';

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Blood Transfusion & Products</h2>

      <div>
        <label className="text-xs text-gray-500 font-semibold uppercase">Patient Wt (kg)</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full mt-1 p-3 border rounded-lg text-lg font-bold" placeholder="e.g. 12" />
      </div>

      <div>
        <label className="text-xs text-gray-500 font-semibold uppercase">Blood Product / Indication</label>
        <select value={product} onChange={(e) => setProduct(e.target.value)} className="w-full mt-1 p-3 border rounded-lg bg-white shadow-sm font-bold text-gray-700">
          <option value="prbc_standard">Packed Red Blood Cells (PRBCs)</option>
          <option value="whole_blood">Fresh Whole Blood</option>
          <option value="ffp">Fresh Frozen Plasma (FFP)</option>
          <option value="platelets">Platelets</option>
          <option value="exchange">Neonatal Exchange Transfusion (Double Vol)</option>
        </select>
      </div>

      {/* Target/Emergency Toggle (Only for PRBCs and Whole Blood) */}
      {isRedBloodProduct && (
        <div className="bg-gray-50 p-2 rounded-lg border flex gap-2">
          <button 
            onClick={() => setCalcMode('targeted')}
            className={`flex-1 py-2 text-xs font-bold rounded ${calcMode === 'targeted' ? 'bg-red-600 text-white shadow-sm' : 'bg-transparent text-gray-600 hover:bg-gray-200'}`}
          >
            Targeted Correction (Lab)
          </button>
          <button 
            onClick={() => setCalcMode('emergency')}
            className={`flex-1 py-2 text-xs font-bold rounded ${calcMode === 'emergency' ? 'bg-red-600 text-white shadow-sm' : 'bg-transparent text-gray-600 hover:bg-gray-200'}`}
          >
            Emergency Bolus (No Lab)
          </button>
        </div>
      )}

      {/* Lab Inputs for Targeted Correction */}
      {isRedBloodProduct && calcMode === 'targeted' && (
        <div className="grid grid-cols-3 gap-2 bg-red-50 p-3 rounded-lg border border-red-200">
          <div>
            <label className="text-[10px] text-red-800 font-bold uppercase">Metric</label>
            <select value={measureType} onChange={(e) => setMeasureType(e.target.value)} className="w-full mt-1 p-2 border rounded font-semibold text-sm">
              <option value="pcv">PCV (%)</option>
              <option value="hb">Hb (g/dL)</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-red-800 font-bold uppercase">Current</label>
            <input type="number" value={currentVal} onChange={(e) => setCurrentVal(e.target.value)} className="w-full mt-1 p-2 border rounded font-semibold text-sm" placeholder={measureType === 'pcv' ? "15" : "5.0"} />
          </div>
          <div>
            <label className="text-[10px] text-red-800 font-bold uppercase">Target</label>
            <input type="number" value={targetVal} onChange={(e) => setTargetVal(e.target.value)} className="w-full mt-1 p-2 border rounded font-semibold text-sm text-green-700" placeholder={measureType === 'pcv' ? "30" : "10.0"} />
          </div>
        </div>
      )}

      {wt > 0 && (
        <div className="mt-6 space-y-4 animate-in fade-in duration-300">
          
          {/* PRBCs & Whole Blood Output */}
          {isRedBloodProduct && (
            <div className={`p-4 rounded-xl border-2 shadow-sm ${product === 'prbc_standard' ? 'bg-red-50 border-red-300' : 'bg-red-100 border-red-400'}`}>
              <div className={`border-l-4 pl-3 ${product === 'prbc_standard' ? 'border-red-600' : 'border-red-800'}`}>
                <span className="text-xs font-black tracking-wider text-red-900 uppercase">
                  {product === 'prbc_standard' ? 'PACKED CELLS (PRBCs)' : 'FRESH WHOLE BLOOD'}
                  {calcMode === 'emergency' ? ' - EMERGENCY BOLUS' : ' - LAB TARGETED'}
                </span>
                
                {calcMode === 'targeted' ? (
                  <>
                    <p className="text-3xl font-black text-red-900 mt-1">{Math.round(targetedVolume)} <span className="text-lg font-bold">mL</span></p>
                    {deficit > 0 && (
                      <p className="text-[11px] text-red-700 font-bold mt-1">Formula: {wt}kg × {deficit.toFixed(1)} {measureType} deficit × factor</p>
                    )}
                    <p className="text-[10px] text-gray-600 italic">Factor used: {factorText}</p>
                  </>
                ) : (
                  <>
                    <p className="text-3xl font-black text-red-900 mt-1">{Math.round(wt * (product === 'prbc_standard' ? 10 : 20))} <span className="text-lg font-bold">mL</span></p>
                    <p className="text-[10px] text-red-700 font-bold mt-1">Standard {product === 'prbc_standard' ? '10 mL/kg' : '20 mL/kg'} empiric bolus.</p>
                  </>
                )}
                
                <p className={`text-sm font-bold mt-2 inline-block px-2 py-1 rounded ${product === 'prbc_standard' ? 'text-red-700 bg-red-100' : 'text-red-900 bg-red-200'}`}>
                  Run slowly over 3 to 4 hours
                </p>
              </div>

              <div className="mt-4 bg-white p-3 rounded border border-red-200 shadow-sm">
                <p className="text-xs font-bold text-red-600 uppercase mb-1">Prevent Fluid Overload (TACO)</p>
                <p className="text-sm font-bold text-gray-800">Give IV Frusemide: <span className="text-blue-600">{wt * 1} mg</span> to <span className="text-blue-600">{wt * 2} mg</span></p>
                <p className="text-xs text-gray-600 mt-1">Administer at the start or halfway through the transfusion.</p>
              </div>
            </div>
          )}

          {/* FFP & Platelets */}
          {(product === 'ffp' || product === 'platelets') && (
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-300 shadow-sm">
              <div className="border-l-4 border-amber-500 pl-3">
                <span className="text-xs font-black text-amber-700 tracking-wider uppercase">{product === 'ffp' ? 'Fresh Frozen Plasma (FFP)' : 'Platelet Concentrate'}</span>
                <p className="text-3xl font-black text-amber-800 mt-1">{Math.round(wt * 10)} - {Math.round(wt * 15)} <span className="text-lg font-bold">mL</span></p>
                <p className="text-sm font-bold text-amber-700 mt-1">
                  {product === 'ffp' ? 'Run over 30 - 60 minutes' : 'Run over 15 - 30 minutes'}
                </p>
              </div>
            </div>
          )}

          {/* Neonatal Exchange Transfusion */}
          {product === 'exchange' && (
            <div className="bg-purple-50 p-4 rounded-xl border-2 border-purple-400 shadow-sm">
              <div className="border-l-4 border-purple-600 pl-3">
                <span className="text-xs font-black text-purple-700 tracking-wider">DOUBLE VOLUME EXCHANGE</span>
                <p className="text-3xl font-black text-purple-900 mt-1">{Math.round(wt * 170)} <span className="text-lg font-bold">mL total</span></p>
                <p className="text-xs text-purple-700 mt-1 font-bold">Formula: Weight × 85 mL/kg × 2</p>
              </div>
              <div className="mt-4 bg-white p-3 rounded border border-purple-200 space-y-2">
                <p className="text-xs font-bold text-purple-800 uppercase border-b pb-1">Procedure Aliquots</p>
                <p className="text-sm font-bold text-gray-800">Push/Pull Volume: <span className="text-purple-600">{Math.round(wt * 5)} mL</span> per cycle.</p>
                <p className="text-xs text-gray-600">Do not exceed 10% of total blood volume per aliquot to prevent hemodynamic instability.</p>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
/* =========================================
   UI COMPONENTS
   ========================================= */
function AlertBanner({ level, text }) {
  const colors = {
    green: 'bg-green-100 text-green-800 border-green-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    red: 'bg-red-100 text-red-800 border-red-200',
  };
  
  return (
    <div className={`p-3 rounded-lg border text-sm font-medium flex items-start gap-2 ${colors[level]}`}>
      <Info size={16} className="mt-0.5 shrink-0" />
      <p>{text}</p>
    </div>
  );
}