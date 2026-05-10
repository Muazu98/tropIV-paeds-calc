# TropPaeds Clinical Calculator — Formula Reference

All clinical formulas, thresholds, and logic used in the app.
Based on Azubike Tropical Paediatrics, WHO guidelines, and standard paediatric practice.

---

## 1. IV Infusion Rate

### Flow rate
```
mL/hr = Volume (mL) ÷ Duration (hours)
```

### Drip rate
```
drops/min = [Volume (mL) × drops/mL] ÷ [Duration (hours) × 60]
```

### Giving set options
| Set type | Drops per mL |
|----------|-------------|
| Standard adult | 20 drops/mL |
| Paediatric burette | 60 drops/mL |
| Blood/alternative | 15 drops/mL |

### Alert thresholds
| Condition | Alert level |
|-----------|------------|
| Rate > 200 mL/hr | 🔴 Red — confirm values, risk of overload |
| Drip rate > 60 drops/min | 🟡 Amber — use infusion pump |
| All other rates | 🟢 Green |

---

## 2. Holliday-Segar Maintenance Fluid Formula

### Standard formula (daily requirement)
```
First 10 kg:     100 mL/kg/day
Next 10 kg:       50 mL/kg/day   (i.e. for weight 10–20 kg)
Each kg above 20:  20 mL/kg/day
```

### Examples
| Weight | Calculation | Daily volume |
|--------|-------------|-------------|
| 8 kg | 8 × 100 | 800 mL/day |
| 15 kg | (10×100) + (5×50) | 1250 mL/day |
| 25 kg | (10×100) + (10×50) + (5×20) | 1600 mL/day |

### Hourly rate
```
mL/hr = Daily volume ÷ 24
```

### Clinical modifiers (Azubike / tropical paediatrics)

| Context | Modifier | Rationale |
|---------|----------|-----------|
| Severe Acute Malnutrition (SAM) | × 0.75 (reduce 25%) | Risk of cardiac failure, refeeding syndrome; start F-75 |
| Cerebral malaria | × 0.75 (restrict 25%) | Reduces risk of raised ICP and pulmonary oedema |
| Neonates (Day 1) | 60 mL/kg/day | Increases by ~10–20 mL/kg/day per postnatal day; verify with NICU protocol |

---

## 3. Fluid Resuscitation & Shock Management

### Azubike Shock Classification

| Grade | Clinical features | Estimated deficit |
|-------|------------------|------------------|
| No shock | Alert, moist mucosae, CRT <2s, good pulse | — |
| Mild dehydration (~5%) | Thirsty, slightly dry mucosae, normal pulse | ~50 mL/kg |
| Moderate (5–10%) | Sunken eyes, reduced skin turgor, tachycardia, reduced UO | ~75 mL/kg |
| Severe (>10%) | Deeply sunken eyes, absent skin turgor, weak/absent pulse, lethargy/unconscious | ~100 mL/kg |
| Septic / distributive shock | Warm peripheries → cold, hypotension, fever/hypothermia, source of infection | Variable |

---

### Management by grade

#### No shock
- Continue or start maintenance fluids (Holliday-Segar rate)

#### Mild dehydration (~5%)
- **First line:** Oral rehydration therapy (ORT)
- **IV only if** vomiting or unable to drink:
```
IV rate (mL/hr) = Estimated deficit ÷ 8 hours
Estimated deficit = weight (kg) × 50 mL
```

#### Moderate dehydration — early shock (5–10%)
```
Phase 1 (bolus):
  10 mL/kg of chosen fluid over 20–30 min

Phase 2 (deficit replacement):
  Remaining deficit = (weight × 75) − bolus volume
  Rate (mL/hr) = Remaining deficit ÷ 8 hrs
```
- Reassess HR, CRT, urine output 15–20 min after bolus
- 🟡 Amber alert

#### Severe dehydration — established shock (>10%)
```
Phase 1 (resuscitation bolus):
  20 mL/kg over 15–30 min
  Repeat 10 mL/kg if no improvement

Phase 2 (deficit replacement):
  Remaining deficit = (weight × 100) − first bolus
  Rate (mL/hr) = Remaining deficit ÷ 8 hrs

Phase 3 (maintenance):
  Standard Holliday-Segar rate (run concurrently after stabilisation)
```
- Call senior/consultant immediately
- Check blood glucose, electrolytes, renal function
- 🔴 Red alert

#### Septic / distributive shock
```
Initial bolus: 20 mL/kg over 5–10 min
May repeat ×3 (up to 60 mL/kg total)
```
- **Sepsis-6 bundle:**
  1. High-flow oxygen
  2. Blood cultures (before antibiotics)
  3. IV antibiotics within 1 hour
  4. IV fluid resuscitation (as above)
  5. Check blood glucose and lactate
  6. Monitor urine output (catheterise)
- If no response after 3 boluses → vasopressors (dopamine first line in resource-limited settings)
- Escalate to ICU/HDU
- 🔴 Red alert

---

### Resuscitation fluid options
| Fluid | Notes |
|-------|-------|
| 0.9% NaCl (Normal saline) | First line in most settings |
| Ringer's Lactate | Preferred in burns, metabolic acidosis |
| Colloid / Albumin | Consider in hypoalbuminaemia, nephrotic syndrome |

---

## 4. Oral Rehydration Therapy (ORT)

### WHO Plan A — No dehydration
- Continue normal feeding
- Extra ORS after each loose stool:
```
<2 years:   50–100 mL per stool
≥2 years:   100–200 mL per stool
General:    5 mL/kg per stool
```

### WHO Plan B — Mild to moderate dehydration
```
Mild (~5%):     Rehydration volume = weight (kg) × 50 mL  over 4 hours
Moderate (5–10%): Rehydration volume = weight (kg) × 100 mL over 4 hours

ORS rate (mL/hr) = Rehydration volume ÷ 4
```
- Reassess after 4 hours
- If worsening or unable to tolerate ORS → switch to IV

### Ongoing stool loss replacement
```
Standard:  5 mL/kg per loose stool
Cholera:  10 mL/kg per loose stool
```

### Cholera modifier
```
Rehydration volume = standard volume × 1.5
Use low-osmolarity ORS (75 mEq/L Na, 75 mmol/L glucose)
```

### Maintenance after rehydration
- Standard Holliday-Segar daily volume

---

## 5. Key Clinical Reference Values

### Normal vital signs by age (paediatric)

| Age | Heart rate (bpm) | Respiratory rate | Systolic BP (mmHg) |
|-----|-----------------|-----------------|-------------------|
| Neonate (0–28d) | 100–160 | 40–60 | 60–90 |
| Infant (1–12m) | 100–150 | 30–40 | 70–100 |
| Toddler (1–3yr) | 90–140 | 24–40 | 80–110 |
| Pre-school (3–5yr) | 80–120 | 22–34 | 80–110 |
| School age (6–12yr) | 70–110 | 18–30 | 90–120 |
| Adolescent (>12yr) | 60–100 | 12–20 | 100–130 |

### Normal urine output
```
Children: 1–2 mL/kg/hr
Neonates: 2–5 mL/kg/hr
Minimum acceptable: 0.5 mL/kg/hr (oliguria if below this)
```

### CRT (Capillary Refill Time)
- Normal: <2 seconds
- Prolonged: ≥2 seconds → suggests poor perfusion

---

## Notes on Tropical Paediatrics Context (Azubike)

- **Malaria** is a leading cause of febrile illness and shock in tropical settings — always consider in differential
- **SAM** is common and dramatically changes fluid management; aggressive IV fluids are dangerous
- **Cerebral malaria** requires fluid restriction to limit cerebral oedema — in contrast to other shock states
- **Cholera** causes exceptionally high fluid losses — standard ORT volumes are insufficient
- **Typhoid fever** — risk of intestinal perforation; avoid NSAIDs; fluid management as standard

---

*Formula Reference v1.0 — TropPaeds Clinical Calculator*
*Based on: Azubike Tropical Paediatrics (2nd ed.), WHO Pocket Book of Hospital Care for Children (2013)*
