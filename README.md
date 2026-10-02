# The Last Alibi — A Noir Detective Investigation Game

> *"Every suspect has a story. Only one has the truth."*

**The Last Alibi** is a cinematic, atmospheric noir interactive detective mystery game set in the 1940s–1950s. The player takes the role of a homicide detective dispatched to **Blackwood Manor** to solve the murder of wealthy industrialist **Victor Blackwood**, found dead inside his private study at 11:47 PM behind a locked oak door.

---

## 🔍 The Mystery Dossier

- **Victim:** Victor Blackwood (Age 54, Industrialist & Real Estate Tycoon)
- **Time of Death:** Approximately 11:47 PM (Corroborated by shattered pocket watch)
- **Crime Scene:** Master Study (Oak Room, 2nd Floor North), Blackwood Manor
- **The Core Paradox:** The heavy oak study door was bolted from the inside with an internal brass slide bolt. However, the north casement window overlooking the rose trellis was found unlatched in the storm, with fresh mud on the sill.

### The Four Suspects

1. **Eleanor Blackwood (The Estranged Wife):** Claims she was reading *The Count of Monte Cristo* in the ground-floor library from 10:30 PM to midnight.
2. **Marcus Vale (The Business Partner):** Claims he left the manor at 10:15 PM sharp following an argument over corporate embezzlement.
3. **Clara Reed (The Executive Assistant):** Claims she worked on quarterly balance sheets in the East Wing office until 11:30 PM, then went to bed.
4. **Daniel Cross (The Disowned Nephew):** Claims he was pacing in the garden courtyard outside on an urgent overseas phone call from 11:00 PM to 11:45 PM.

---

## 🔎 The Canonical Deduction & Solution

The mystery is strictly logical and backed by forensic evidence:

1. **The Locked Room Solution:** The study door was bolted from the inside. Hallway entry was impossible. The intruder entered and fled via the **unlocked north casement window** by scaling the exterior garden rose trellis in the heavy downpour.
2. **The Muddy Footprint:** Fresh garden mud matching a size 10.5 men’s Italian dress oxford was found on the window sill.
3. **The Shattered Alibi:** Daniel Cross claimed he was on an overseas phone call in the garden from 11:00 PM to 11:45 PM. However, telecommunications carrier records prove **his call terminated abruptly at 11:18 PM**, leaving an unverified 29-minute gap in the garden right beneath the study window.
4. **The Motive:** Daniel was facing insurmountable gambling debts. Victor had instructed Clara to draft a revised will cutting Daniel off completely. Scraps of this revoked will were found partly burned in the library fireplace where Daniel attempted to incinerate them.
5. **The Warning Text:** At 11:32 PM, Clara texted Victor: *"He knows about the revised will. He is furious and looking for you. Lock your door."* Victor bolted the inner door, but Daniel climbed the trellis to confront him.
6. **The Fatal Struggle at 11:47 PM:** Victor's pocket watch shattered against the mahogany desk at 11:47 PM during the violent struggle with Daniel.

---

## 🕹️ Interactive Features

- **Cinematic Landing Page:** Film grain overlay, moving fog particle canvas, vintage stamps, typewriter quotes, and ambient soundtrack.
- **Procedural Noir Audio Synthesizer (Web Audio API):**
  - Zero external MP3 files needed—synthesizes pink-noise rain, low dark cello/drone, vinyl crackles, typewriter keystrokes, and a diminished chord contradiction sting.
  - Toggleable soundscape with persistent audio state.
- **Crime Scene Blueprint & Case File:** Detailed architectural schematic of the master study, window trellis, garden grounds, and floor layout.
- **Interactive Evidence Room (10 Items):**
  1. Broken Pocket Watch (11:47 PM)
  2. Threatening Letter (Marcus)
  3. Security Footage (Marcus 10:15 PM)
  4. Deleted Phone Message (11:32 PM)
  5. Burned Document (Library hearth)
  6. Muddy Footprint (Size 10.5 on sill)
  7. Computer Activity (Clara 11:41 PM)
  8. Phone Records (Daniel 11:18 PM disconnect)
  9. Handwritten Note (Victor to Eleanor)
  10. Unlocked Study Window (Rose trellis route)
- **Chronological Timeline (10:00 PM to Midnight):** Filterable scrubber highlighting contradictions and the fatal window.
- **Detective Investigation Board (Corkboard & Red Yarn):**
  - Interactive corkboard where the player links suspects to clues.
  - Dynamically draws animated SVG red yarn strings between pushpins with gentle sag physics.
  - Flag suspects as "Prime Suspect" or "Cleared".
- **Interrogation Room with Dynamic Dialogue Trees:**
  - Seated suspect under the spotlight.
  - Typewriter dialogue output.
  - Live nervous tension meter that reacts to pressure.
  - Real-time "CONTRADICTION DETECTED" alert banner and audio sting upon uncovering lies.
- **Detective Field Notebook:**
  - Slide-out drawer tracking inspected clues and discovered contradictions.
  - Auto-saved scratchpad for personal detective notes using `localStorage`.
- **Final Accusation & Verdict Screen:**
  - Confront the suspects and select the smoking gun.
  - If **Daniel Cross** is accused: Cinematic "CASE SOLVED" breakdown and confession transcript.
  - If any other suspect is accused: Detailed forensic exculpation explaining why they are innocent and directing the player back to the evidence.

---

## 📂 Project Architecture

```
/
├── index.html                   # Semantic HTML5 investigation portal
├── style.css                    # Responsive noir stylesheet & animations
├── script.js                    # Core mystery engine, Web Audio synth & state
├── README.md                    # Project documentation & story lore
└── assets/
    └── images/                  # High-fidelity vector illustrations & SVGs
        ├── victor_blackwood.svg
        ├── eleanor_blackwood.svg
        ├── marcus_vale.svg
        ├── clara_reed.svg
        ├── daniel_cross.svg
        ├── manor_map.svg
        ├── evidence_pocket_watch.svg
        ├── evidence_threatening_letter.svg
        ├── evidence_security_footage.svg
        ├── evidence_deleted_message.svg
        ├── evidence_burned_document.svg
        ├── evidence_muddy_footprint.svg
        ├── evidence_computer_activity.svg
        ├── evidence_phone_records.svg
        ├── evidence_handwritten_note.svg
        └── evidence_unlocked_window.svg
```

---

## 🚀 How to Run Locally

No external build tools or backend dependencies are required.

1. Clone or open the project folder in your terminal:
   ```bash
   cd website
   ```
2. Start any local static server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

Alternatively, simply double-click `index.html` to open it directly in modern browsers (Chrome, Safari, Firefox, Edge).

---

## 🌐 Deploy to Netlify / GitHub Pages

### Netlify:
1. Drag and drop the `website` folder directly into [Netlify Drop](https://app.netlify.com/drop).
2. Or push to a GitHub repository and deploy via Netlify with publish directory set to `/` (or root).

### GitHub Pages:
1. Push this directory to your GitHub repository.
2. In **Settings** > **Pages**, select the `main` branch and `/ (root)` folder.
3. Save, and your detective game will be live!

---

*Designed and engineered with passion for classic noir cinema and interactive mystery games.*
