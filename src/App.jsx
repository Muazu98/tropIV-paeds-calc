import React, { useState } from 'react';
import { Activity, Droplet, AlertTriangle, Info, Syringe, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('iv');

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg flex flex-col">
      {/* Header */}
      <div className="bg-blue-900 text-white p-4 pt-6 text-center shadow-md">
        <h1 className="text-xl font-bold tracking-wide flex items-center justify-center gap-2">
          <Activity size={24} /> IV-infusion Calc
        </h1>
        <p className="text-blue-200 text-xs mt-1">Azubuike & WHO Guidelines</p>
      </div>

     {/* Main Content Area */}
      <div className="flex-grow p-4 overflow-y-auto pb-24 bg-gray-50">
        {activeTab === 'iv' && <IVModule />}
        {activeTab === 'maintenance' && <MaintenanceModule />}
        {activeTab === 'shock' && <ShockModule />}
        {activeTab === 'ort' && <ORTModule />}
        {activeTab === 'blood' && <TransfusionModule />} 
      </div>

     {/* Bottom Navigation (Mobile Tab Bar) */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex justify-around pb-safe">
        <TabButton icon={<Droplet />} label="IV Rate" isActive={activeTab === 'iv'} onClick={() => setActiveTab('iv')} />
        <TabButton icon={<Activity />} label="Maint." isActive={activeTab === 'maintenance'} onClick={() => setActiveTab('maintenance')} />
        <TabButton icon={<AlertTriangle />} label="Shock" isActive={activeTab === 'shock'} onClick={() => setActiveTab('shock')} />
        <TabButton icon={<Syringe />} label="ORT" isActive={activeTab === 'ort'} onClick={() => setActiveTab('ort')} />
        <TabButton icon={<Heart />} label="Blood" isActive={activeTab === 'blood'} onClick={() => setActiveTab('blood')} />
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
   MODULE 1: IV Infusion Rate
   ========================================= */
function IVModule() {
  const [volume, setVolume] = useState('');
  const [duration, setDuration] = useState('');
  const [dropFactor, setDropFactor] = useState(60);

  const vol = parseFloat(volume) || 0;
  const hrs = parseFloat(duration) || 0;

  let flowRate = 0;
  let dripRate = 0;
  let alert = { level: 'green', msg: 'Normal rates' };

  if (vol > 0 && hrs > 0) {
    flowRate = (vol / hrs).toFixed(1);
    dripRate = Math.round((vol * dropFactor) / (hrs * 60));

    if (flowRate > 200) {
      alert = { level: 'red', msg: 'Rate > 200 mL/hr. Confirm values, risk of overload.' };
    } else if (dripRate > 60) {
      alert = { level: 'amber', msg: 'Drip rate > 60. Use infusion pump.' };
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2">IV Infusion Rate</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500 font-semibold uppercase">Volume (mL)</label>
          <input type="number" value={volume} onChange={(e) => setVolume(e.target.value)} className="w-full mt-1 p-3 border rounded-lg" placeholder="e.g. 500" />
        </div>
        <div>
          <label className="text-xs text-gray-500 font-semibold uppercase">Duration (Hours)</label>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full mt-1 p-3 border rounded-lg" placeholder="e.g. 8" />
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-500 font-semibold uppercase">Giving Set</label>
        <select value={dropFactor} onChange={(e) => setDropFactor(Number(e.target.value))} className="w-full mt-1 p-3 border rounded-lg bg-white">
          <option value={60}>60 drops/mL (Paediatric Microdrip)</option>
          <option value={20}>20 drops/mL (Adult Standard)</option>
          <option value={15}>15 drops/mL (Blood / Macrodrip)</option>
        </select>
      </div>

      {vol > 0 && hrs > 0 && (
        <div className="mt-6 space-y-3">
          <AlertBanner level={alert.level} text={alert.msg} />
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
              <span className="text-xs text-blue-500 uppercase font-bold">Flow Rate</span>
              <p className="text-2xl font-bold text-blue-900">{flowRate} <span className="text-sm">mL/hr</span></p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
              <span className="text-xs text-blue-500 uppercase font-bold">Drip Rate</span>
              <p className="text-2xl font-bold text-blue-900">{dripRate} <span className="text-sm">gtt/min</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================
   MODULE 2: Holliday-Segar Maintenance
   ========================================= */
function MaintenanceModule() {
  const [weight, setWeight] = useState('');
  const [modifier, setModifier] = useState('standard');
  const [passedUrine, setPassedUrine] = useState(false);

  const wt = parseFloat(weight) || 0;
  let dailyVol = 0;
  let fluidType = '';

  if (wt > 0) {
    if (modifier === 'neonate') {
      dailyVol = wt * 60; 
      fluidType = "10% Dextrose in Water (No added Na+ or K+)";
    } else {
      if (wt <= 10) dailyVol = wt * 100;
      else if (wt <= 20) dailyVol = 1000 + ((wt - 10) * 50);
      else dailyVol = 1500 + ((wt - 20) * 20);

      if (modifier === 'sam') {
        dailyVol = dailyVol * 0.75;
        fluidType = "F-75 Therapeutic Milk via Oral/NGT. (Avoid IV maintenance in SAM!)";
      } else if (modifier === 'cerebral') {
        dailyVol = dailyVol * 0.75;
        fluidType = "4.3% Dextrose in 0.18% Saline (Monitor glucose closely)";
      } else {
        fluidType = "4.3% Dextrose in 0.18% Saline (Standard Paediatric Maintenance)";
      }
    }
  }

  const hourlyRate = (dailyVol / 24).toFixed(1);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Maintenance Fluid</h2>
      
      <div>
        <label className="text-xs text-gray-500 font-semibold uppercase">Patient Weight (kg)</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full mt-1 p-3 border rounded-lg text-lg" placeholder="e.g. 14" />
      </div>

      <div>
        <label className="text-xs text-gray-500 font-semibold uppercase">Clinical Context (Modifiers)</label>
        <select value={modifier} onChange={(e) => setModifier(e.target.value)} className="w-full mt-1 p-3 border rounded-lg bg-white">
          <option value="standard">Standard (No Modifiers)</option>
          <option value="sam">Severe Acute Malnutrition (25% reduction)</option>
          <option value="cerebral">Cerebral Malaria (25% restriction)</option>
          <option value="neonate">Neonate - Day 1 (60 mL/kg)</option>
        </select>
      </div>

      <label className="flex items-center space-x-2 mt-2 p-3 bg-white border rounded-lg shadow-sm">
        <input type="checkbox" checked={passedUrine} onChange={(e) => setPassedUrine(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" />
        <span className="text-sm font-semibold text-gray-700">Patient has passed urine</span>
      </label>

      {wt > 0 && (
        <div className="mt-6 space-y-4">
          {modifier === 'sam' && <AlertBanner level="amber" text="Start F-75. Aggressive IV fluids dangerous in SAM." />}
          {modifier === 'neonate' && <AlertBanner level="amber" text="Day 1 volume. Increases ~10-20mL/kg per postnatal day." />}
          
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
            <span className="text-xs text-blue-600 font-bold uppercase">Recommended Fluid</span>
            <p className="text-sm font-semibold text-gray-800 mt-1">{fluidType}</p>
          </div>

          {modifier !== 'neonate' && modifier !== 'sam' && (
            passedUrine ? (
              <AlertBanner level="green" text="Urine output confirmed: Add 20 mmol/L of KCl to the fluid." />
            ) : (
              <AlertBanner level="red" text="No urine output verified: Do NOT add Potassium." />
            )
          )}

          <div className="mt-2 bg-gray-800 text-white p-5 rounded-xl text-center shadow-md">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">Total 24H Volume</span>
            <p className="text-4xl font-black mt-1">{Math.round(dailyVol)} <span className="text-lg font-medium text-gray-300">mL</span></p>
            <div className="border-t border-gray-600 mt-4 pt-3 text-sm">
              Run at <strong className="text-xl text-blue-300 mx-1">{hourlyRate}</strong> mL/hour
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================
   MODULE 3: Resuscitation (Shock)
   ========================================= */
function ShockModule() {
  const [weight, setWeight] = useState('');
  const [grade, setGrade] = useState('mild');

  const wt = parseFloat(weight) || 0;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Resuscitation (Azubuike)</h2>
      
      <div>
        <label className="text-xs text-gray-500 font-semibold uppercase">Patient Weight (kg)</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full mt-1 p-3 border rounded-lg" />
      </div>

      <div>
        <label className="text-xs text-gray-500 font-semibold uppercase">Shock / Dehydration Grade</label>
        <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full mt-1 p-3 border rounded-lg bg-white">
          <option value="mild">Mild (~5%) - No Shock</option>
          <option value="moderate">Moderate (5-10%) - Early Shock</option>
          <option value="severe">Severe (&gt;10%) - Established Shock</option>
          <option value="septic">Septic / Distributive Shock</option>
        </select>
      </div>

      {wt > 0 && (
        <div className="mt-6 space-y-4">
          {grade === 'mild' && (
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <AlertBanner level="green" text="First line: Oral Rehydration Therapy (ORT)." />
              <div className="mt-3">
                <p className="text-sm text-gray-600">If IV required (e.g. vomiting):</p>
                <div className="bg-gray-50 border border-gray-200 p-2 rounded mt-2 mb-2">
                  <span className="text-xs text-gray-500 font-bold uppercase">Fluid:</span>
                  <span className="text-sm font-semibold text-gray-800 ml-2">4.3% Dextrose in 0.18% Saline</span>
                </div>
                <p className="text-lg font-bold text-gray-800 mt-1">Deficit: {wt * 50} mL</p>
                <p className="text-sm font-semibold text-blue-600">Give at {((wt * 50) / 8).toFixed(1)} mL/hr over 8 hrs</p>
              </div>
            </div>
          )}

          {grade === 'moderate' && (
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <AlertBanner level="amber" text="Reassess HR, CRT, UO 15 mins after bolus." />
              <div className="mt-3 space-y-3">
                <div className="border-l-4 border-amber-400 pl-3">
                  <span className="text-xs font-bold text-gray-500">PHASE 1 (BOLUS)</span>
                  <p className="text-xs text-blue-600 font-bold mb-1">Use: 0.9% Normal Saline or Ringer's Lactate</p>
                  <p className="text-lg font-bold text-gray-800">{wt * 10} mL over 20-30 min</p>
                </div>
                <div className="border-l-4 border-blue-400 pl-3">
                  <span className="text-xs font-bold text-gray-500">PHASE 2 (REMAINING DEFICIT)</span>
                  <p className="text-xs text-blue-600 font-bold mb-1">Use: 4.3% Dextrose in 0.18% Saline</p>
                  <p className="text-lg font-bold text-gray-800">{(wt * 75) - (wt * 10)} mL</p>
                  <p className="text-sm text-blue-600">Run at {(((wt * 75) - (wt * 10)) / 8).toFixed(1)} mL/hr for 8 hrs</p>
                </div>
              </div>
            </div>
          )}

          {grade === 'severe' && (
            <div className="bg-white p-4 rounded-xl border-red-200 shadow-sm border">
              <AlertBanner level="red" text="Emergency: Escalate to senior immediately." />
              <div className="mt-3 space-y-3">
                <div className="border-l-4 border-red-500 pl-3">
                  <span className="text-xs font-bold text-red-500">PHASE 1 (RESUSCITATION)</span>
                  <p className="text-xs text-red-600 font-bold mb-1">Use ONLY: 0.9% Normal Saline or Ringer's Lactate</p>
                  <p className="text-xl font-black text-red-600">{wt * 20} mL over 15-30 min</p>
                  <p className="text-xs text-gray-600 mt-1">Repeat 10 mL/kg if no improvement.</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-3">
                  <span className="text-xs font-bold text-gray-500">PHASE 2 (REMAINING DEFICIT)</span>
                  <p className="text-xs text-amber-600 font-bold mb-1">Use: 4.3% Dextrose in 0.18% Saline</p>
                  <p className="text-lg font-bold text-gray-800">{(wt * 100) - (wt * 20)} mL</p>
                  <p className="text-sm text-amber-600">Run at {(((wt * 100) - (wt * 20)) / 8).toFixed(1)} mL/hr for 8 hrs</p>
                </div>
              </div>
            </div>
          )}

          {grade === 'septic' && (
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <AlertBanner level="red" text="Initiate Sepsis-6 Bundle." />
              <div className="mt-3">
                <p className="text-xs text-red-700 font-bold mb-1">Use: 0.9% Normal Saline or Ringer's Lactate</p>
                <p className="text-2xl font-black text-red-700">{wt * 20} mL over 5-10 min</p>
                <p className="text-sm text-red-600 mt-1 font-medium">May repeat x3 (up to {wt * 60} mL total).</p>
                <ul className="text-xs text-gray-700 mt-3 list-disc pl-4 space-y-1">
                  <li>High-flow oxygen</li>
                  <li>Blood cultures (before ABX)</li>
                  <li>IV antibiotics within 1 hr</li>
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
   MODULE 4: ORT (Plan A/B)
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
   MODULE 5: Blood Transfusion
   ========================================= */
function TransfusionModule() {
  const [weight, setWeight] = useState('');
  const [actualPcv, setActualPcv] = useState('');
  const [targetPcv, setTargetPcv] = useState('30');
  const [bloodType, setBloodType] = useState('prbc');

  const wt = parseFloat(weight) || 0;
  const aPcv = parseFloat(actualPcv) || 0;
  const tPcv = parseFloat(targetPcv) || 0;

  let volume = 0;
  let furosemide = 0;

  if (wt > 0 && aPcv > 0 && tPcv > aPcv) {
    const factor = bloodType === 'prbc' ? 4 : 6;
    volume = Math.round(wt * (tPcv - aPcv) * factor);
    furosemide = wt * 1; // Standard 1mg/kg
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Blood Transfusion</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="text-xs text-gray-500 font-semibold uppercase">Patient Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full mt-1 p-3 border rounded-lg" />
        </div>
        
        <div>
          <label className="text-xs text-gray-500 font-semibold uppercase">Actual PCV (%)</label>
          <input type="number" value={actualPcv} onChange={(e) => setActualPcv(e.target.value)} className="w-full mt-1 p-3 border rounded-lg" placeholder="e.g. 15" />
        </div>

        <div>
          <label className="text-xs text-gray-500 font-semibold uppercase">Target PCV (%)</label>
          <input type="number" value={targetPcv} onChange={(e) => setTargetPcv(e.target.value)} className="w-full mt-1 p-3 border rounded-lg" />
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-500 font-semibold uppercase">Blood Product</label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <button onClick={() => setBloodType('prbc')} className={`p-3 rounded-lg border text-sm font-semibold ${bloodType === 'prbc' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600'}`}>Packed Cells (PRBC)</button>
          <button onClick={() => setBloodType('whole')} className={`p-3 rounded-lg border text-sm font-semibold ${bloodType === 'whole' ? 'bg-red-800 text-white border-red-800' : 'bg-white text-gray-600'}`}>Whole Blood</button>
        </div>
      </div>

      {volume > 0 && (
        <div className="mt-6 space-y-4">
          <div className="bg-red-50 p-5 rounded-xl border border-red-200 text-center shadow-sm">
            <span className="text-xs text-red-600 uppercase font-bold tracking-widest">Total Volume Required</span>
            <p className="text-4xl font-black mt-1 text-red-900">{volume} <span className="text-lg font-medium text-red-700">mL</span></p>
            <p className="text-sm text-red-600 mt-2 font-medium">Run slowly over 4 hours.</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm">
            <div className="flex items-start gap-3">
              <Syringe className="text-amber-500 mt-0.5" size={20} />
              <div>
                <span className="text-sm font-bold text-gray-800">Furosemide Stricture</span>
                <p className="text-sm text-gray-600 mt-1">
                  Give <strong className="text-amber-600">{furosemide} mg</strong> of IV Furosemide midway through the transfusion to prevent volume overload.
                </p>
              </div>
            </div>
          </div>
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