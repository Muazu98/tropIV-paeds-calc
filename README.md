# TropPaeds Clinical Calculator

A clinical utility app for bedside use in Tropical Paediatrics, built for medical students and clinicians practicing in the tropics. Based on the Azubike Tropical Paediatrics textbook and WHO/IMCI guidelines.

---

## Project Overview


**Target users:** Medical students, house officers, paediatricians — especially in tropical/low-resource settings.

**Platform:** Progressive Web App (React + Vite + Tailwind CSS) — cross-platform Android, iOS, & Desktop

**Current Version:** v1.0 (Live Production Build)

---

## Modules

### 1. IV Infusion Rate Calculator
Calculates drip rate (drops/min) and flow rate (mL/hr) for any IV fluid order.
- Supports adult and paediatric patients
- Giving set options: 20 drops/mL (adult), 60 drops/mL (paeds burette), 15 drops/mL
- Alerts for very high rates (>200 mL/hr) and rates requiring pump (>60 drops/min)

### 2. Holliday-Segar Fluid Requirements
Calculates daily and hourly maintenance fluid requirements.
- Standard Holliday-Segar formula
- Modifiers for SAM (25% reduction, F-75 protocol)
- Modifiers for cerebral malaria (25% fluid restriction)
- Neonatal warnings (Day 1 = 60 mL/kg protocol)

### 3. Fluid Resuscitation & Shock Management
Azubike-classified shock assessment with phased fluid management.
- 5 clinical grades (see FORMULAS.md)
- Red alert system for severe/septic shock
- Phase 1 (bolus) → Phase 2 (deficit) → Phase 3 (maintenance) structure
- Sepsis-6 bundle prompt for septic shock

### 4. Oral Rehydration Therapy (ORT)
WHO Plan A and Plan B volumes with tropical disease modifiers.
- Gastroenteritis, cholera (1.5× volume), typhoid
- Ongoing stool loss replacement
- 4-hour reassessment prompts

### 5. Specific Fluid Recommender & Modifiers
Recommends exact isotonic or maintenance fluids based on the phase of treatment and WHO guidelines.
- Resuscitation: Restricts options to 0.9% Normal Saline or Ringer's Lactate.
- Maintenance: Defaults to 4.3% Dextrose in 0.18% Saline.
- Neonatal: Defaults to 10% Dextrose in water (Day 1).
- Potassium Stricture: Safety toggle ensures no KCl is added until urine output is clinically verified.

### 6. Blood Transfusion Calculator
Calculates exact volume for blood products based on actual vs. target PCV.
- Supports Packed Red Blood Cells (PRBC) and Whole Blood multipliers.
- Automated Furosemide stricture alert (1mg/kg) to prevent volume overload during transfusion.

---

## Alert System

| Level | Colour | Meaning |
|-------|--------|---------|
| Safe | 🟢 Green | Proceed — values within normal range |
| Caution | 🟡 Amber | Monitor closely — clinical context needed |
| Emergency | 🔴 Red | Escalate immediately — senior review required |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native (Expo) |
| Language | JavaScript / TypeScript |
| Navigation | React Navigation |
| Prototype | Vanilla HTML/CSS/JS |
| Target stores | Google Play Store, Apple App Store |

---

## Project Structure (planned React Native)

```
TropPaedsApp/
├── app/
│   ├── index.jsx              # Home / tab navigator
│   ├── iv-infusion.jsx        # IV Infusion screen
│   ├── holliday-segar.jsx     # Maintenance fluids screen
│   ├── resuscitation.jsx      # Shock & resuscitation screen
│   └── ort.jsx                # ORT screen
├── components/
│   ├── ResultCard.jsx         # Reusable result display
│   ├── AlertBanner.jsx        # Green/amber/red alert
│   └── InputField.jsx         # Labelled numeric input
├── utils/
│   └── formulas.js            # All clinical calculation logic
├── constants/
│   └── clinical.js            # Reference values, age ranges
└── README.md
```

---

## Clinical References

- Azubike JC, Nkanginieme KEO. *Paediatrics and Child Health in a Tropical Region*. 2nd ed.
- WHO. *Pocket Book of Hospital Care for Children*. 2nd ed. Geneva: WHO; 2013.
- Holliday MA, Segar WE. The maintenance need for water in parenteral fluid therapy. *Pediatrics*. 1957;19(5):823–832.
- WHO/UNICEF. *Clinical Management of Acute Diarrhoea*. 2004.

---

## Disclaimer

This app is a **clinical decision support tool** — not a replacement for clinical judgement. All results must be interpreted in the context of the individual patient. Always reassess, verify, and escalate appropriately.

---

## Development Status

- [x] HTML prototype — all 4 modules working
- [ ] React Native project setup (Expo)
- [ ] Screen-by-screen migration
- [ ] Drug dose calculator module (planned)
- [ ] Weight-based antibiotic dosing (planned)
- [ ] Malaria severity score (planned)
- [ ] Play Store submission
