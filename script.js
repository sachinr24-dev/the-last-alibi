/**
 * THE LAST ALIBI - NOIR DETECTIVE MYSTERY ENGINE
 * Fully client-side interactive game engine with Web Audio synthesis,
 * canvas atmosphere, evidence tracking, interrogation dialogue trees,
 * dynamic corkboard yarn rendering, and airtight deductive logic.
 */

// ==========================================================================
// 1. DATA REPOSITORIES: SUSPECTS & EVIDENCE
// ==========================================================================

const SUSPECTS_DATA = {
  eleanor: {
    id: 'eleanor',
    name: 'Eleanor Blackwood',
    role: "Victim's Estranged Wife",
    age: 49,
    claimedAlibi: 'Reading alone in the ground-floor library from 10:30 PM to midnight.',
    initialSuspicion: 'HIGH (70%)',
    motive: 'Victor was drafting a revised will and filing for divorce, threatening to strip her of the Blackwood estate and family trust funds.',
    bio: 'Eleanor married Victor twenty-five years ago. In recent years, the marriage deteriorated into icy silence. She spent most evenings sequestered in the ground-floor library with literature.',
    alibiDetail: 'Claims she never left the armchair beside the library reading lamp between 10:30 PM and midnight, when screams from the second floor alerted her.',
    contradiction: null,
    exculpatory: 'The study door was locked with a heavy internal brass slide bolt. As Eleanor was on the ground floor, she had no physical means to scale the 2nd-floor exterior rose trellis in the rain. Furthermore, Victor’s handwritten note in her book proves she had no knowledge of his confrontation that night.',
    questions: [
      {
        id: 'q_el_1',
        text: 'Where were you at 11:30 PM?',
        response: '"I was seated in the library reading The Count of Monte Cristo. The fireplace had dwindled to coals. The rain was pounding against the glass, and I remained there until Martha’s screams shook the house."',
        tension: 30,
        isContradiction: false
      },
      {
        id: 'q_el_2',
        text: 'Did you know Victor was planning to change his will?',
        response: '"Victor was always threatening to rewrite documents whenever someone displeased him. But he told me earlier that evening that Daniel had come to him demanding advance inheritance, shouting like a lunatic."',
        tension: 45,
        isContradiction: false
      },
      {
        id: 'q_el_3',
        text: 'What was burning in the library fireplace while you were reading?',
        response: '"Someone hastily threw papers into the hearth around 11:40 PM while I had stepped into the adjacent pantry for water. When I came back, the chimney was smoking. It wasn’t me who burned them!"',
        tension: 60,
        isContradiction: true,
        contradictionNote: 'Eleanor saw someone toss papers into the library fireplace around 11:40 PM. Matches the burned will disinheriting Daniel.'
      },
      {
        id: 'q_el_4',
        text: 'Can anyone confirm your alibi in the library?',
        response: '"Martha brought me a pot of chamomile tea at 10:30 PM. Beyond that, I was alone with my book. But Detective, look at my slippers—dry as bone. Whoever entered that study climbed the rain-soaked garden trellis."'
      }
    ]
  },

  marcus: {
    id: 'marcus',
    name: 'Marcus Vale',
    role: 'Business Partner & Hedge Fund Director',
    age: 52,
    claimedAlibi: 'Departed Blackwood Manor at 10:15 PM sharp following a board dispute.',
    initialSuspicion: 'CRITICAL (80%)',
    motive: 'Victor discovered Marcus had embezzled $4.2M from their logistics venture and was preparing to deliver evidence to the District Attorney.',
    bio: 'Marcus has co-managed Blackwood Capital Logistics for over a decade. Known for his aggressive temper and luxury tastes, he arrived at 9:00 PM for dinner and left in a fury.',
    alibiDetail: 'Claims he stormed out of the manor study after an argument at 10:15 PM, started his sedan, and drove directly to his downtown penthouse.',
    contradiction: null,
    exculpatory: 'Surveillance footage from the West Gate camera confirms Marcus’s sedan exited down the driveway at 10:15:08 PM. Highway toll records at the Blackwood River Bridge corroborate his car passing 18 miles away at 10:42 PM.',
    questions: [
      {
        id: 'q_mv_1',
        text: 'Where were you at 11:30 PM?',
        response: '"I was driving along the river turnpike toward my penthouse in the city. Check the highway toll transponders if you doubt my word. I had been off that cursed property for over an hour."',
        tension: 35,
        isContradiction: false
      },
      {
        id: 'q_mv_2',
        text: 'What was the meaning of the threatening letter found in Victor’s desk blotter?',
        response: '"Business negotiations between partners can be forceful. Victor was threatening to torpedo our public offering over accounting discrepancies. Yes, I wrote that letter yesterday. But writing a sharp letter is not murder."',
        tension: 65,
        isContradiction: false
      },
      {
        id: 'q_mv_3',
        text: 'Did anyone see you leave the mansion grounds?',
        response: '"Your own gate security cameras caught my car passing through the gate at 10:15 PM. Do you think I parachuted back in through the storm to smash his pocket watch? You are chasing shadows, Detective."',
        tension: 40,
        isContradiction: true,
        contradictionNote: 'Marcus’s departure at 10:15 PM is verified by camera and toll logs. He was 18 miles away when Victor died at 11:47 PM.'
      },
      {
        id: 'q_mv_4',
        text: 'Can anyone confirm where you were at 11:47 PM?',
        response: '"My penthouse doorman in the city logged me in at 11:10 PM. I was pouring myself a scotch on 5th Avenue while Victor was taking his last breath. My alibi is steel."'
      }
    ]
  },

  clara: {
    id: 'clara',
    name: 'Clara Reed',
    role: "Victor's Personal Executive Assistant",
    age: 28,
    claimedAlibi: 'Working on quarterly audit balance sheets in the East Wing office until 11:30 PM, then retired to her guest quarters.',
    initialSuspicion: 'MODERATE (65%)',
    motive: 'Victor had coerced her into countersigning fraudulent offshore holding contracts, placing her at risk of federal indictment.',
    bio: 'Clara is a sharp, quiet executive secretary who knew all of Victor’s private dealings. She stayed at the manor during the weekend to prepare year-end audit files.',
    alibiDetail: 'Claims she logged off her office terminal at 11:30 PM and was asleep in the east guest suite by 11:35 PM.',
    contradiction: 'Her office workstation recorded active keystrokes and file exports at 11:41 PM, proving she was still awake and working.',
    exculpatory: 'While she lied about going to sleep at 11:30 PM, her 11:41 PM computer activity and corridor security camera prove she was in the East Wing administrative suite 400 feet away when Victor was attacked at 11:47 PM. She was frantically backing up evidence to exonerate herself.',
    questions: [
      {
        id: 'q_cr_1',
        text: 'Where were you at 11:30 PM?',
        response: '"I was finishing the audit sheets in the East Wing office. I was exhausted, so I shut everything down and went straight to bed. I didn’t hear anything until the commotion later."',
        tension: 40,
        isContradiction: false
      },
      {
        id: 'q_cr_2',
        text: 'Server logs show your computer was active at 11:41 PM. Why did you lie?',
        response: '"(She pales and adjusts her glasses) ...Fine. I panicked. Victor had forged my signature on offshore tax documents. At 11:41 PM, I was desperately exporting the server logs to a flash drive to protect myself before Victor could frame me! But I never left that desk!"',
        tension: 85,
        isContradiction: true,
        contradictionNote: 'Clara admits she was at her computer at 11:41 PM in the East Wing. This proves she was NOT in the study during the 11:47 PM murder.'
      },
      {
        id: 'q_cr_3',
        text: 'Who sent the deleted text message to Victor at 11:32 PM?',
        response: '"I sent it! At 11:30 PM, I overheard Daniel shouting in the foyer. He discovered Victor was disinheriting him. Daniel said he was going to make Victor pay. I texted Victor: \'He knows... lock your door.\' That is why Victor bolted the study door!"',
        tension: 90,
        isContradiction: true,
        contradictionNote: 'Clara reveals she warned Victor about Daniel at 11:32 PM, explaining why Victor locked the study door from the inside!'
      },
      {
        id: 'q_cr_4',
        text: 'Could someone have entered the study through the window?',
        response: '"The north study window has a heavy rose trellis running right down to the courtyard. Anyone in the garden could easily climb it within two minutes."'
      }
    ]
  },

  daniel: {
    id: 'daniel',
    name: 'Daniel Cross',
    role: "Victor's Nephew & Sole Heir Apparent",
    age: 26,
    claimedAlibi: 'Pacing outside in the courtyard garden on an overseas broker phone call between 11:00 PM and 11:45 PM.',
    initialSuspicion: 'ELEVATED (75%)',
    motive: 'Massive offshore gambling debts to violent loan sharks. Victor discovered his debts and drafted a codicil that evening cutting him out of the entire inheritance.',
    bio: 'Charismatic, reckless, and financially desperate. Daniel lived on Victor’s allowances while accumulating immense betting debts in European casinos.',
    alibiDetail: 'Claims he stayed in the garden courtyard from 11:00 PM to 11:45 PM continuously speaking with his currency broker in London.',
    contradiction: 'Carrier records prove his phone call abruptly ended at 11:18 PM. For the next 29 minutes (11:18 PM to 11:47 PM), he was unaccounted for in the rainy garden—exactly where the rose trellis leads to the unlocked study window!',
    exculpatory: null,
    questions: [
      {
        id: 'q_dc_1',
        text: 'Where were you between 11:00 PM and 11:45 PM?',
        response: '"I’ve told you twice already. I was outside in the garden courtyard on an urgent phone call with my commodities broker in London. I paced under the stone arches the entire time until 11:45 PM."',
        tension: 50,
        isContradiction: false
      },
      {
        id: 'q_dc_2',
        text: 'Carrier records prove your call disconnected at 11:18 PM. What were you doing for those 29 minutes?',
        response: '"(His jaw tightens, sweating) ...The call dropped! The storm caused bad reception! I was... I was trying to reconnect! Pacing around waiting for a signal! That doesn’t make me a killer!"',
        tension: 88,
        isContradiction: true,
        contradictionNote: 'FATAL CONTRADICTION: Daniel has an unverified 29-minute gap (11:18 - 11:47 PM) while alone in the rainy garden right outside Victor’s window.'
      },
      {
        id: 'q_dc_3',
        text: 'How do you explain fresh garden mud matching your size 10.5 oxfords on the study window sill?',
        response: '"(Daniel stumbles backward) Mud? Anyone could have tracked garden mud! The servants... the groundskeeper! You have no proof those were my shoes!"',
        tension: 98,
        isContradiction: true,
        contradictionNote: 'PHYSICAL LINK: Daniel was in the garden in the heavy rain. Fresh mud on the rose trellis window matches his bespoke Italian shoes.'
      },
      {
        id: 'q_dc_4',
        text: 'Did you know Victor was revoking your inheritance in the library hearth?',
        response: '"Uncle Victor was an arrogant tyrant! He thought he could throw twenty years of family away with a flick of his pen! But I didn’t... I didn’t mean for him to fall against that desk..." (Daniel freezes, realizing what he just said)',
        tension: 100,
        isContradiction: true,
        contradictionNote: 'SLIP OF THE TONGUE: Daniel mentions Victor falling against the desk—a forensic detail known only to someone inside the locked study!'
      }
    ]
  }
};

const EVIDENCE_DATA = {
  'pocket-watch': {
    id: 'pocket-watch',
    title: 'Broken Pocket Watch',
    category: 'physical',
    location: "Study floor, beside Victor's desk",
    time: '11:47 PM',
    suspectLink: 'Daniel Cross',
    desc: 'Vintage 18k gold pocket watch belonging to Victor Blackwood. The crystal face is shattered by high-velocity impact against the desk brass trim. The internal gear mechanism seized immediately, freezing the hands at precisely 11:47 PM.',
    whyMatters: 'Establishes the exact minute of the physical struggle and death. Any suspect whose presence is accounted for elsewhere at 11:47 PM cannot be the killer.',
    image: 'assets/images/evidence_pocket_watch.svg'
  },

  'threatening-letter': {
    id: 'threatening-letter',
    title: 'Threatening Letter',
    category: 'documents',
    location: "Victor's leather desk blotter",
    time: 'Received Oct 1',
    suspectLink: 'Marcus Vale',
    desc: 'A sharply worded ultimatum on corporate stationery: "If you take this to the authorities on Monday morning, neither of us walks away from this intact. Consider this your final settlement offer." Stamped with a red wax seal.',
    whyMatters: 'Reveals the intense financial friction between Victor and Marcus Vale over $4.2M in missing logistics funds. Initially casts heavy suspicion on Marcus.',
    image: 'assets/images/evidence_threatening_letter.svg'
  },

  'security-footage': {
    id: 'security-footage',
    title: 'West Gate Security Footage',
    category: 'digital',
    location: 'Estate gatehouse surveillance recorder',
    time: '10:15 PM',
    suspectLink: 'Marcus Vale',
    desc: 'High-contrast monochrome video recording from camera CAM-04. Shows Marcus Vale’s dark sedan proceeding through the wrought iron security gates and speeding away down the avenue at 10:15:08 PM.',
    whyMatters: 'Substantiates Marcus Vale’s sworn statement that he departed the mansion nearly an hour and a half before the murder took place.',
    image: 'assets/images/evidence_security_footage.svg'
  },

  'deleted-message': {
    id: 'deleted-message',
    title: 'Deleted Phone Message',
    category: 'digital',
    location: "Victor's smartphone memory dump",
    time: '11:32 PM',
    suspectLink: 'Clara Reed & Daniel Cross',
    desc: 'Forensically recovered SMS sent 15 minutes before the murder: "He knows about the revised will. He is furious and looking for you. Lock your door." Originating from East Wing internal extension 4.',
    whyMatters: 'Explains why the master study door was bolted from the inside. Victor was specifically warned that Daniel was on a rampage, prompting him to lock his inner door.',
    image: 'assets/images/evidence_deleted_message.svg'
  },

  'burned-document': {
    id: 'burned-document',
    title: 'Burned Will Document',
    category: 'documents',
    location: 'Ground-floor library hearth embers',
    time: '~11:40 PM',
    suspectLink: 'Daniel Cross & Eleanor Blackwood',
    desc: 'Charred parchment scrap recovered from the library fireplace. The surviving fragment reads: "...hereby REVOKE all prior bequests to my nephew DANIEL CROSS... and bequeath the entirety to...".',
    whyMatters: 'Provides the definitive motive for Daniel Cross. Victor had drafted a document revoking his sole inheritance, which Daniel attempted to destroy in the nearest fireplace.',
    image: 'assets/images/evidence_burned_document.svg'
  },

  'muddy-footprint': {
    id: 'muddy-footprint',
    title: 'Muddy Footprint on Sill',
    category: 'physical',
    location: '2nd-floor study north window sill',
    time: 'Fresh mud (~11:45 PM)',
    suspectLink: 'Daniel Cross',
    desc: 'Wet garden soil impression left on the stone window sill. Tread ridges match size 10.5 men’s Italian leather dress oxfords. Microscopic analysis confirms soil composition identical to the courtyard rose garden beds.',
    whyMatters: 'Solves the locked-room mystery. While the inner door was bolted from inside, the intruder scaled the rose trellis from the rainy garden, entered through the casement window, and fled the same way.',
    image: 'assets/images/evidence_muddy_footprint.svg'
  },

  'computer-activity': {
    id: 'computer-activity',
    title: 'Workstation Keystroke Log',
    category: 'digital',
    location: 'East Wing administrative office terminal',
    time: '11:41 PM',
    suspectLink: 'Clara Reed',
    desc: 'Server system logs showing active user session by C_REED at 11:41:19 PM, exporting encrypted corporate backup files to a removable drive.',
    whyMatters: 'Contradicts Clara’s initial claim that she went to sleep at 11:30 PM. However, it places her physically in the East Wing office, making it impossible for her to be in the 2nd-floor study at 11:47 PM.',
    image: 'assets/images/evidence_computer_activity.svg'
  },

  'phone-records': {
    id: 'phone-records',
    title: "Daniel's Cell Carrier Records",
    category: 'digital',
    location: 'Metro Telecom carrier subpoena',
    time: '11:18 PM Disconnect',
    suspectLink: 'Daniel Cross',
    desc: 'Official cellular tower subpoena records for Daniel’s mobile. The call to his London broker connected at 11:02 PM and was disconnected by Daniel at 11:18:44 PM. Zero data or voice activity occurred between 11:18 PM and 11:47 PM.',
    whyMatters: 'Shreds Daniel’s alibi. He claimed he was on the phone until 11:45 PM. In reality, he had 29 unmonitored minutes in the rainy garden right beneath Victor’s study window.',
    image: 'assets/images/evidence_phone_records.svg'
  },

  'handwritten-note': {
    id: 'handwritten-note',
    title: 'Victor’s Handwritten Note',
    category: 'documents',
    location: "Eleanor's library novel (Page 142)",
    time: '~9:00 PM',
    suspectLink: 'Eleanor Blackwood & Victor',
    desc: 'A folded slip of heavy personal stationery in Victor’s distinctive fountain pen script: "Eleanor, forgive my silence tonight. Daniel came demanding an advance on his inheritance. He made wild threats. I have instructed Clara to change my will. I am locking my study tonight. - V."',
    whyMatters: 'Corroborates Eleanor’s presence in the library and proves Victor was terrified of Daniel’s violent threats earlier that night.',
    image: 'assets/images/evidence_handwritten_note.svg'
  },

  'unlocked-window': {
    id: 'unlocked-window',
    title: 'Unlocked Casement Window',
    category: 'physical',
    location: 'North wall of Master Study',
    time: 'Found ajar at 11:55 PM',
    suspectLink: 'Daniel Cross',
    desc: 'The study’s heavy leaded glass casement window was found unlatched and swinging open into the storm, allowing rain to soak the carpet. Outside, a sturdy wrought-iron rose trellis extends directly down to the garden courtyard.',
    whyMatters: 'The master study door was bolted from the inside. The unlatched window with the rose trellis was the only possible ingress and egress route for the killer.',
    image: 'assets/images/evidence_unlocked_window.svg'
  }
};

// ==========================================================================
// 2. GAME STATE & LOCALSTORAGE
// ==========================================================================

const STORAGE_KEY = 'the_last_alibi_state_v1';

let gameState = {
  inspectedEvidence: [],
  discoveredContradictions: [],
  interrogatedSuspects: [],
  pinnedConnections: [],
  suspectFlags: {
    eleanor: 'neutral',
    marcus: 'neutral',
    clara: 'neutral',
    daniel: 'neutral'
  },
  detectiveNotes: '',
  selectedAccused: null,
  activeInterrogationSuspect: 'eleanor',
  soundEnabled: false
};

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }
  updateHUDProgress();
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      gameState = Object.assign(gameState, parsed);
    }
  } catch (e) {
    console.warn('LocalStorage load failed:', e);
  }
}

// ==========================================================================
// 3. PROCEDURAL WEB AUDIO SYNTH ENGINE (100% Offline & Self-Contained)
// ==========================================================================

class NoirAudioEngine {
  constructor() {
    this.ctx = null;
    this.rainNode = null;
    this.rainGain = null;
    this.droneOsc = null;
    this.droneGain = null;
    this.isPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  startAmbience() {
    this.init();
    if (this.isPlaying) return;

    try {
      // 1. Procedural Rain Noise (Pink noise buffer)
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const rainSource = this.ctx.createBufferSource();
      rainSource.buffer = noiseBuffer;
      rainSource.loop = true;

      // Filter rain to feel like soft stormy downpour against window
      const rainFilter = this.ctx.createBiquadFilter();
      rainFilter.type = 'lowpass';
      rainFilter.frequency.value = 900;

      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.rainGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 3);

      rainSource.connect(rainFilter);
      rainFilter.connect(this.rainGain);
      this.rainGain.connect(this.ctx.destination);
      rainSource.start(0);
      this.rainNode = rainSource;

      // 2. Low Noir Ambient Drone (Cello / Dark Bass at 55Hz)
      const droneOsc = this.ctx.createOscillator();
      droneOsc.type = 'sawtooth';
      droneOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.droneGain.gain.linearRampToValueAtTime(0.035, this.ctx.currentTime + 4);

      droneOsc.connect(droneFilter);
      droneFilter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);
      droneOsc.start();
      this.droneOsc = droneOsc;

      this.isPlaying = true;
    } catch (e) {
      console.warn('Audio start failed:', e);
    }
  }

  stopAmbience() {
    if (!this.isPlaying) return;
    try {
      if (this.rainGain && this.ctx) {
        this.rainGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1);
        setTimeout(() => {
          if (this.rainNode) this.rainNode.stop();
        }, 1100);
      }
      if (this.droneGain && this.ctx) {
        this.droneGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1);
        setTimeout(() => {
          if (this.droneOsc) this.droneOsc.stop();
        }, 1100);
      }
    } catch (e) {
      console.warn('Audio stop failed:', e);
    }
    this.isPlaying = false;
  }

  playClick() {
    if (!gameState.soundEnabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  playTypewriter() {
    if (!gameState.soundEnabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const freq = 600 + Math.random() * 400;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {}
  }

  playContradictionSting() {
    if (!gameState.soundEnabled) return;
    this.init();
    try {
      const notes = [220, 261.63, 311.13, 440]; // Diminished chord sting
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime + idx * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.03);
        osc.stop(this.ctx.currentTime + 1.2);
      });
    } catch (e) {}
  }

  playGavelHit() {
    if (!gameState.soundEnabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.5);
    } catch (e) {}
  }
}

const audio = new NoirAudioEngine();

// ==========================================================================
// 4. ATMOSPHERIC CANVAS FOG PARTICLES
// ==========================================================================

function initFogCanvas() {
  const canvas = document.getElementById('fog-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 35;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 120 + Math.random() * 200,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: 0.03 + Math.random() * 0.05
    });
  }

  function renderFog() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -p.radius) p.x = width + p.radius;
      if (p.x > width + p.radius) p.x = -p.radius;
      if (p.y < -p.radius) p.y = height + p.radius;
      if (p.y > height + p.radius) p.y = -p.radius;

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      grad.addColorStop(0, `rgba(180, 195, 220, ${p.alpha})`);
      grad.addColorStop(1, 'rgba(180, 195, 220, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(renderFog);
  }

  renderFog();
}

// ==========================================================================
// 5. NAVIGATION, SCROLLSPY & HUD PROGRESS
// ==========================================================================

function setupNavigation() {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main > section');

  // Scrollspy
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        current = section.getAttribute('id');
      }
    });

    links.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('hud-nav');
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    links.forEach((l) => {
      l.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }

  // Sound toggle button
  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');
  const soundLabel = document.getElementById('sound-label');

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      gameState.soundEnabled = !gameState.soundEnabled;
      if (gameState.soundEnabled) {
        audio.startAmbience();
        soundIcon.textContent = '🔊';
        soundLabel.textContent = 'SOUND: ON';
        soundBtn.classList.add('active-sound');
      } else {
        audio.stopAmbience();
        soundIcon.textContent = '🔈';
        soundLabel.textContent = 'SOUND: OFF';
        soundBtn.classList.remove('active-sound');
      }
      saveState();
    });
  }

  // Reset Case Button
  const resetBtn = document.getElementById('reset-case-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset your entire investigation, notebook, and pinned clues?')) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
      }
    });
  }

  // Notebook drawer toggle
  const nbBtn = document.getElementById('notebook-toggle-btn');
  const nbDrawer = document.getElementById('notebook-drawer');
  const nbClose = document.getElementById('notebook-close-btn');

  if (nbBtn && nbDrawer) {
    nbBtn.addEventListener('click', () => {
      nbDrawer.classList.toggle('active');
      audio.playClick();
    });
  }

  if (nbClose && nbDrawer) {
    nbClose.addEventListener('click', () => {
      nbDrawer.classList.remove('active');
    });
  }

  // Keyboard Escape listener for modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSuspectModal();
      closeEvidenceModal();
      closeVerdictModal();
      if (nbDrawer) nbDrawer.classList.remove('active');
    }
  });

  // Detective Scratchpad autosave
  const scratchpad = document.getElementById('detective-scratchpad');
  const scratchStatus = document.getElementById('scratchpad-status');
  if (scratchpad) {
    scratchpad.value = gameState.detectiveNotes || '';
    scratchpad.addEventListener('input', () => {
      gameState.detectiveNotes = scratchpad.value;
      if (scratchStatus) scratchStatus.textContent = 'Saving...';
      saveState();
      setTimeout(() => {
        if (scratchStatus) scratchStatus.textContent = 'Saved locally.';
      }, 500);
    });
  }

  // Notebook tabs
  const ntTabs = document.querySelectorAll('.nt-tab');
  const ntFindings = document.getElementById('nt-body-findings');
  const ntCustom = document.getElementById('nt-body-custom');

  ntTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      ntTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');
      if (target === 'findings') {
        if (ntFindings) ntFindings.style.display = 'block';
        if (ntCustom) ntCustom.style.display = 'none';
      } else {
        if (ntFindings) ntFindings.style.display = 'none';
        if (ntCustom) ntCustom.style.display = 'block';
      }
    });
  });

  // Blueprint toggle button scroll to map
  const bpBtn = document.getElementById('toggle-blueprint-btn');
  if (bpBtn) {
    bpBtn.addEventListener('click', () => {
      const bp = document.getElementById('blueprint-wrapper');
      if (bp) {
        bp.scrollIntoView({ behavior: 'smooth', block: 'center' });
        bp.style.outline = '2px solid #ffd166';
        setTimeout(() => (bp.style.outline = 'none'), 1800);
      }
    });
  }
}

function updateHUDProgress() {
  const evCount = gameState.inspectedEvidence.length;
  const contCount = gameState.discoveredContradictions.length;
  const suspCount = gameState.interrogatedSuspects.length;

  const progEv = document.getElementById('prog-evidence');
  const progCont = document.getElementById('prog-contradictions');
  const progSusp = document.getElementById('prog-suspects');
  const notesBadge = document.getElementById('notes-badge');
  const nbClues = document.getElementById('nb-clues-checked');
  const nbCont = document.getElementById('nb-contradictions-found');

  if (progEv) progEv.textContent = `${evCount} / 10`;
  if (progCont) progCont.textContent = `${contCount} / 4`;
  if (progSusp) progSusp.textContent = `${suspCount} / 4`;
  if (notesBadge) notesBadge.textContent = evCount + contCount;
  if (nbClues) nbClues.textContent = `${evCount} / 10`;
  if (nbCont) nbCont.textContent = `${contCount} / 4`;

  // Update Evidence Card Checked Badges
  Object.keys(EVIDENCE_DATA).forEach((id) => {
    const card = document.querySelector(`.evidence-card[data-evidence-id="${id}"]`);
    const statusLabel = document.getElementById(`ev-status-${id}`);
    if (card) {
      if (gameState.inspectedEvidence.includes(id)) {
        card.classList.add('inspected');
        if (statusLabel) statusLabel.textContent = 'CHECKED';
      } else {
        card.classList.remove('inspected');
        if (statusLabel) statusLabel.textContent = 'UNEXAMINED';
      }
    }
  });

  // Update Notebook findings log
  renderNotebookLog();
}

function renderNotebookLog() {
  const container = document.getElementById('notebook-log-list');
  if (!container) return;

  if (gameState.inspectedEvidence.length === 0 && gameState.discoveredContradictions.length === 0) {
    container.innerHTML =
      '<p class="empty-hint">No evidence inspected yet. Click any exhibit in the Evidence Room to add findings here.</p>';
    return;
  }

  let html = '';

  // Contradictions first
  gameState.discoveredContradictions.forEach((note) => {
    html += `
      <div class="log-item border-red">
        <span class="log-item-tag warning-text">⚡ CONTRADICTION DETECTED</span>
        <p class="log-item-text">${note}</p>
      </div>
    `;
  });

  // Inspected Evidence
  gameState.inspectedEvidence.forEach((id) => {
    const ev = EVIDENCE_DATA[id];
    if (ev) {
      html += `
        <div class="log-item">
          <span class="log-item-tag">EXHIBIT // ${ev.title}</span>
          <p class="log-item-text">${ev.whyMatters}</p>
        </div>
      `;
    }
  });

  container.innerHTML = html;
}

function clearScratchpad() {
  const pad = document.getElementById('detective-scratchpad');
  if (pad && confirm('Clear scratchpad notes?')) {
    pad.value = '';
    gameState.detectiveNotes = '';
    saveState();
  }
}

// ==========================================================================
// 6. SUSPECTS MODAL & INTERACTIONS
// ==========================================================================

function openSuspectModal(suspectId) {
  const s = SUSPECTS_DATA[suspectId];
  if (!s) return;

  audio.playClick();

  const modal = document.getElementById('suspect-modal');
  const nameEl = document.getElementById('modal-suspect-name');
  const roleEl = document.getElementById('modal-suspect-role');
  const contentEl = document.getElementById('modal-suspect-content');
  const interrogateBtn = document.getElementById('modal-suspect-interrogate-btn');

  if (nameEl) nameEl.textContent = s.name.toUpperCase();
  if (roleEl) roleEl.textContent = `AGE ${s.age} // ${s.role.toUpperCase()}`;

  if (contentEl) {
    contentEl.innerHTML = `
      <div style="display: grid; grid-template-columns: 200px 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
        <img src="assets/images/${s.id}_blackwood.svg" onerror="this.src='assets/images/${s.id}_vale.svg'; this.onerror=function(){this.src='assets/images/${s.id}_cross.svg';};" alt="${s.name}" style="width: 100%; border: 1px solid var(--border-prominent); border-radius: 4px;">
        <div>
          <p style="margin-bottom: 0.8rem;"><strong>INVESTIGATIVE DOSSIER:</strong> ${s.bio}</p>
          <p style="margin-bottom: 0.8rem;"><strong>CLAIMED ALIBI:</strong> <span style="color: var(--amber-bright);">${s.claimedAlibi}</span></p>
          <p style="margin-bottom: 0.8rem;"><strong>PRIMARY MOTIVE:</strong> <span style="color: var(--crimson-bright);">${s.motive}</span></p>
          <p><strong>INITIAL SUSPICION:</strong> ${s.initialSuspicion}</p>
        </div>
      </div>
      <div style="background: rgba(0,0,0,0.3); padding: 1.2rem; border-left: 3px solid var(--amber-gold); margin-bottom: 1rem;">
        <h4 style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--amber-gold); margin-bottom: 0.4rem;">SWORN STATEMENT DETAILS:</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted);">${s.alibiDetail}</p>
      </div>
    `;
  }

  if (interrogateBtn) {
    interrogateBtn.onclick = () => {
      closeSuspectModal();
      goToInterrogation(suspectId);
    };
  }

  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function closeSuspectModal() {
  const modal = document.getElementById('suspect-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function goToInterrogation(suspectId) {
  selectInterrogationSuspect(suspectId);
  const target = document.getElementById('interrogation');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==========================================================================
// 7. EVIDENCE ROOM MODAL & FILTERS
// ==========================================================================

function setupEvidenceFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.evidence-card');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      cards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      audio.playClick();
    });
  });
}

function openEvidenceModal(evidenceId) {
  const ev = EVIDENCE_DATA[evidenceId];
  if (!ev) return;

  audio.playClick();

  // Mark as inspected
  if (!gameState.inspectedEvidence.includes(evidenceId)) {
    gameState.inspectedEvidence.push(evidenceId);
    saveState();
  }

  const modal = document.getElementById('evidence-modal');
  const imgEl = document.getElementById('modal-evidence-img');
  const tagEl = document.getElementById('modal-evidence-tag');
  const catEl = document.getElementById('modal-evidence-cat');
  const titleEl = document.getElementById('modal-evidence-title');
  const locEl = document.getElementById('modal-evidence-location');
  const timeEl = document.getElementById('modal-evidence-time');
  const suspEl = document.getElementById('modal-evidence-suspect');
  const descEl = document.getElementById('modal-evidence-desc');
  const mattersEl = document.getElementById('modal-evidence-matters');
  const pinBtn = document.getElementById('modal-pin-board-btn');

  if (imgEl) imgEl.src = ev.image;
  if (tagEl) tagEl.textContent = `EXHIBIT // ${ev.id.toUpperCase()}`;
  if (catEl) catEl.textContent = `${ev.category.toUpperCase()} EVIDENCE`;
  if (titleEl) titleEl.textContent = ev.title;
  if (locEl) locEl.textContent = ev.location;
  if (timeEl) timeEl.textContent = ev.time;
  if (suspEl) suspEl.textContent = ev.suspectLink;
  if (descEl) descEl.textContent = ev.desc;
  if (mattersEl) mattersEl.textContent = ev.whyMatters;

  if (pinBtn) {
    pinBtn.onclick = () => {
      // Connect to currently active suspect on corkboard
      const suspectId = gameState.activeInterrogationSuspect || 'daniel';
      addConnection(suspectId, evidenceId);
      closeEvidenceModal();
      const board = document.getElementById('board');
      if (board) board.scrollIntoView({ behavior: 'smooth' });
    };
  }

  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function closeEvidenceModal() {
  const modal = document.getElementById('evidence-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
}

// ==========================================================================
// 8. TIMELINE SCRUBBER
// ==========================================================================

function filterTimeline(filterType) {
  const pills = document.querySelectorAll('.pill-btn');
  pills.forEach((p) => p.classList.remove('active'));

  event.target.classList.add('active');
  audio.playClick();

  const events = document.querySelectorAll('.timeline-event');
  events.forEach((ev) => {
    const type = ev.getAttribute('data-type');
    if (filterType === 'all') {
      ev.style.display = 'grid';
    } else if (filterType === 'contradiction') {
      if (type === 'contradiction') {
        ev.style.display = 'grid';
      } else {
        ev.style.display = 'none';
      }
    } else if (filterType === 'critical') {
      if (type === 'critical' || type === 'contradiction') {
        ev.style.display = 'grid';
      } else {
        ev.style.display = 'none';
      }
    }
  });
}

// ==========================================================================
// 9. CORKBOARD & RED YARN STRING RENDERER
// ==========================================================================

function setupCorkboard() {
  const addBtn = document.getElementById('add-connection-btn');
  const clearBtn = document.getElementById('clear-pins-btn');
  const suspSelect = document.getElementById('board-suspect-select');
  const evSelect = document.getElementById('board-evidence-select');

  if (addBtn && suspSelect && evSelect) {
    addBtn.addEventListener('click', () => {
      addConnection(suspSelect.value, evSelect.value);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      gameState.pinnedConnections = [];
      saveState();
      renderYarnLines();
      renderConnectionsList();
      audio.playClick();
    });
  }

  // Click on evidence card pins to connect to selected suspect
  const evidencePins = document.querySelectorAll('.evidence-pin-item');
  evidencePins.forEach((pin) => {
    pin.addEventListener('click', () => {
      const evId = pin.getAttribute('data-evidence');
      const suspId = suspSelect ? suspSelect.value : 'daniel';
      addConnection(suspId, evId);
    });
  });

  // Click suspect polaroid pins to set active dropdown suspect
  const suspectPins = document.querySelectorAll('.suspect-pin-item');
  suspectPins.forEach((pin) => {
    pin.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'button') return;
      const suspId = pin.getAttribute('data-suspect');
      if (suspSelect) suspSelect.value = suspId;
      audio.playClick();
    });
  });

  window.addEventListener('resize', renderYarnLines);
  renderYarnLines();
  renderConnectionsList();
}

function addConnection(suspectId, evidenceId) {
  const exists = gameState.pinnedConnections.some(
    (c) => c.suspectId === suspectId && c.evidenceId === evidenceId
  );
  if (!exists) {
    gameState.pinnedConnections.push({ suspectId, evidenceId });
    saveState();
    renderYarnLines();
    renderConnectionsList();
    audio.playClick();
  }
}

function removeConnection(index) {
  gameState.pinnedConnections.splice(index, 1);
  saveState();
  renderYarnLines();
  renderConnectionsList();
  audio.playClick();
}

function toggleSuspectFlag(suspectId) {
  const current = gameState.suspectFlags[suspectId] || 'neutral';
  let next = 'neutral';
  if (current === 'neutral') next = 'suspicious';
  else if (current === 'suspicious') next = 'cleared';
  else next = 'neutral';

  gameState.suspectFlags[suspectId] = next;
  saveState();
  updateSuspectFlagUI(suspectId, next);
  audio.playClick();
}

function updateSuspectFlagUI(suspectId, state) {
  const tag = document.getElementById(`cork-tag-${suspectId}`);
  const cardTag = document.getElementById(`status-tag-${suspectId}`);

  let text = 'UNRESOLVED';
  let color = 'var(--text-muted)';

  if (state === 'suspicious') {
    text = 'PRIME SUSPECT';
    color = 'var(--crimson-bright)';
  } else if (state === 'cleared') {
    text = 'CLEARED / ALIBI';
    color = '#68d391';
  }

  if (tag) {
    tag.textContent = text;
    tag.style.color = color;
  }
  if (cardTag) {
    cardTag.textContent = text;
    cardTag.style.color = color;
    cardTag.style.borderColor = color;
  }
}

function renderConnectionsList() {
  const container = document.getElementById('conn-list');
  const countEl = document.getElementById('conn-count');
  if (!container) return;

  if (countEl) countEl.textContent = gameState.pinnedConnections.length;

  if (gameState.pinnedConnections.length === 0) {
    container.innerHTML =
      '<span class="empty-hint">Use the selector above or click pins to string clues together.</span>';
    return;
  }

  let html = '';
  gameState.pinnedConnections.forEach((conn, idx) => {
    const s = SUSPECTS_DATA[conn.suspectId];
    const ev = EVIDENCE_DATA[conn.evidenceId];
    const sName = s ? s.name.split(' ')[0] : conn.suspectId;
    const evName = ev ? ev.title : conn.evidenceId;

    html += `
      <span class="conn-pill">
        ${sName} ⟶ ${evName}
        <span class="conn-remove-btn" onclick="removeConnection(${idx})">✕</span>
      </span>
    `;
  });

  container.innerHTML = html;
}

function renderYarnLines() {
  const canvas = document.getElementById('yarn-canvas');
  const surface = document.getElementById('corkboard-surface');
  if (!canvas || !surface) return;

  const rect = surface.getBoundingClientRect();
  canvas.setAttribute('width', rect.width);
  canvas.setAttribute('height', rect.height);
  canvas.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);

  let svgContent = '';

  gameState.pinnedConnections.forEach((conn) => {
    const suspEl = document.getElementById(`pin-suspect-${conn.suspectId}`);
    const evEl = document.getElementById(`pin-ev-${conn.evidenceId}`);

    if (suspEl && evEl) {
      const sRect = suspEl.getBoundingClientRect();
      const eRect = evEl.getBoundingClientRect();

      // Pin center coordinates relative to corkboard
      const x1 = sRect.left - rect.left + sRect.width / 2;
      const y1 = sRect.top - rect.top + 10;

      const x2 = eRect.left - rect.left + eRect.width / 2;
      const y2 = eRect.top - rect.top + 10;

      // Add natural gentle sag curve in the red yarn string
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2 + 25;

      svgContent += `
        <path d="M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}" class="yarn-line" />
      `;
    }
  });

  canvas.innerHTML = svgContent;
}

// ==========================================================================
// 10. INTERROGATION ROOM & TYPEWRITER DIALOGUE
// ==========================================================================

let typewriterTimer = null;

function selectInterrogationSuspect(suspectId) {
  gameState.activeInterrogationSuspect = suspectId;
  saveState();

  const s = SUSPECTS_DATA[suspectId];
  if (!s) return;

  // Mark interrogated
  if (!gameState.interrogatedSuspects.includes(suspectId)) {
    gameState.interrogatedSuspects.push(suspectId);
    saveState();
  }

  // Update tabs
  const tabs = document.querySelectorAll('.suspect-tab');
  tabs.forEach((tab) => {
    if (tab.getAttribute('data-suspect') === suspectId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Update Seated Portrait & Info
  const portrait = document.getElementById('interrogation-portrait');
  const nameEl = document.getElementById('interrogation-name');
  const alibiEl = document.getElementById('interrogation-alibi-summary');
  const speakerEl = document.getElementById('dialogue-speaker');
  const banner = document.getElementById('contradiction-banner');
  const tensionLevel = document.getElementById('tension-level');
  const tensionFill = document.getElementById('tension-fill');

  if (portrait) portrait.src = `assets/images/${suspectId}_blackwood.svg`;
  // Fallbacks handled by correct file paths
  if (suspectId === 'marcus' && portrait) portrait.src = 'assets/images/marcus_vale.svg';
  if (suspectId === 'clara' && portrait) portrait.src = 'assets/images/clara_reed.svg';
  if (suspectId === 'daniel' && portrait) portrait.src = 'assets/images/daniel_cross.svg';

  if (nameEl) nameEl.textContent = s.name;
  if (alibiEl) alibiEl.textContent = `Claimed: ${s.claimedAlibi}`;
  if (speakerEl) speakerEl.textContent = `${s.name.toUpperCase()}:`;
  if (banner) banner.style.display = 'none';

  if (tensionLevel) tensionLevel.textContent = 'STEADY';
  if (tensionFill) tensionFill.style.width = '25%';

  // Set opening greeting
  typewriterDialogue(
    `"Detective. Ask what you need to ask. I have nothing to hide regarding Victor's murder."`
  );

  // Render question buttons
  renderQuestionsList(s);
  audio.playClick();
}

function renderQuestionsList(suspect) {
  const container = document.getElementById('questions-list');
  if (!container) return;

  let html = '';
  suspect.questions.forEach((q) => {
    const isContradictionClass = q.isContradiction ? 'contradiction-question' : '';
    html += `
      <button class="question-btn ${isContradictionClass}" onclick="askQuestion('${suspect.id}', '${q.id}')">
        <span>${q.text}</span>
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--amber-gold);">ASK ⟶</span>
      </button>
    `;
  });

  container.innerHTML = html;
}

function askQuestion(suspectId, questionId) {
  const s = SUSPECTS_DATA[suspectId];
  if (!s) return;

  const q = s.questions.find((item) => item.id === questionId);
  if (!q) return;

  audio.playTypewriter();

  // Highlight button as asked
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('asked');
  }

  // Update Tension Meter
  const tensionLevel = document.getElementById('tension-level');
  const tensionFill = document.getElementById('tension-fill');
  const tension = q.tension || 50;

  if (tensionFill) tensionFill.style.width = `${tension}%`;
  if (tensionLevel) {
    if (tension > 80) {
      tensionLevel.textContent = 'EXTREME / BREAKING';
      tensionLevel.style.color = 'var(--crimson-bright)';
    } else if (tension > 50) {
      tensionLevel.textContent = 'NERVOUS / GUARDED';
      tensionLevel.style.color = 'var(--amber-gold)';
    } else {
      tensionLevel.textContent = 'STEADY';
      tensionLevel.style.color = '#68d391';
    }
  }

  // Handle Contradiction Alert
  const banner = document.getElementById('contradiction-banner');
  const bannerMsg = document.getElementById('contradiction-msg');

  if (q.isContradiction && q.contradictionNote) {
    audio.playContradictionSting();
    if (banner && bannerMsg) {
      banner.style.display = 'flex';
      bannerMsg.textContent = `CRITICAL ANOMALY: ${q.contradictionNote}`;
    }

    // Add to discovered contradictions
    if (!gameState.discoveredContradictions.includes(q.contradictionNote)) {
      gameState.discoveredContradictions.push(q.contradictionNote);
      saveState();
    }
  } else {
    if (banner) banner.style.display = 'none';
  }

  // Output response
  typewriterDialogue(q.response);
}

function typewriterDialogue(text) {
  const output = document.getElementById('dialogue-text');
  if (!output) return;

  if (typewriterTimer) clearInterval(typewriterTimer);

  output.textContent = '';
  let index = 0;

  typewriterTimer = setInterval(() => {
    output.textContent += text.charAt(index);
    index++;
    if (index >= text.length) {
      clearInterval(typewriterTimer);
    }
  }, 12);
}

// ==========================================================================
// 11. FINAL ACCUSATION & DEDUCTION CHECK
// ==========================================================================

function selectAccused(suspectId) {
  gameState.selectedAccused = suspectId;
  audio.playClick();

  const cards = document.querySelectorAll('.accuse-card');
  cards.forEach((c) => {
    if (c.getAttribute('data-suspect') === suspectId) {
      c.classList.add('selected');
    } else {
      c.classList.remove('selected');
    }
  });

  const submitBtn = document.getElementById('submit-accusation-btn');
  const helper = document.getElementById('accuse-helper-text');
  const s = SUSPECTS_DATA[suspectId];

  if (submitBtn) {
    submitBtn.removeAttribute('disabled');
  }

  if (helper && s) {
    helper.innerHTML = `Ready to formally charge <strong>${s.name}</strong> with the murder of Victor Blackwood.`;
    helper.style.color = 'var(--amber-bright)';
  }
}

function setupAccusation() {
  const submitBtn = document.getElementById('submit-accusation-btn');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', () => {
    if (!gameState.selectedAccused) {
      alert('Please select a suspect to accuse first.');
      return;
    }

    const s = SUSPECTS_DATA[gameState.selectedAccused];
    const confirmed = confirm(
      `FINAL CONFIRMATION:\n\nAre you certain you wish to accuse ${s.name} of capital homicide?\n\nReview the locked room, timeline gaps, and physical evidence before sealing the arrest.`
    );

    if (confirmed) {
      processAccusation(gameState.selectedAccused);
    }
  });
}

function processAccusation(accusedId) {
  audio.playGavelHit();

  const modal = document.getElementById('verdict-modal');
  const header = document.getElementById('verdict-header');
  const stamp = document.getElementById('verdict-stamp');
  const title = document.getElementById('verdict-title');
  const subtitle = document.getElementById('verdict-subtitle');
  const body = document.getElementById('verdict-body');

  if (!modal) return;

  if (accusedId === 'daniel') {
    // ==========================================
    // CORRECT CONCLUSION: DANIEL CROSS IS GUILTY!
    // ==========================================
    if (header) {
      header.classList.remove('verdict-failed');
      header.classList.add('verdict-solved');
    }
    if (stamp) stamp.textContent = 'CASE SOLVED // GUILTY';
    if (title) title.textContent = 'ARREST WARRANT ISSUED: DANIEL CROSS';
    if (subtitle)
      subtitle.textContent =
        'Your deduction was flawless. The locked-room murder of Victor Blackwood is solved.';

    if (body) {
      body.innerHTML = `
        <div style="background: rgba(72, 187, 120, 0.08); border-left: 4px solid #48bb78; padding: 1.2rem; margin-bottom: 1.5rem;">
          <h3 style="font-family: var(--font-mono); font-size: 1rem; color: #68d391; margin-bottom: 0.5rem;">HOW THE DEDUCTION EXPOSED THE KILLER:</h3>
          <ul style="padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.92rem; color: var(--text-cream);">
            <li><strong>1. The Phantom Alibi:</strong> Daniel claimed he was pacing in the garden on an overseas phone call until 11:45 PM. Carrier subpoena records proved his call terminated at <strong>11:18 PM</strong>, leaving an unverified 29-minute gap in the rainy grounds.</li>
            <li><strong>2. The Locked-Room Solution:</strong> The master study door was bolted from the inside with a slide bolt. The killer did not enter from the hallway. Instead, Daniel scaled the garden rose trellis in the rain, entered through the <strong>unlatched casement window</strong>, and left fresh size 10.5 muddy shoe prints on the sill.</li>
            <li><strong>3. The Motive:</strong> Deep in gambling debt to loan sharks, Daniel had confronted Victor earlier demanding cash. Victor refused and instructed Clara to disinherit him that very night. Scraps of this revoked will were found partly burned in the library fireplace where Daniel hastily tossed them.</li>
            <li><strong>4. The Fatal Struggle at 11:47 PM:</strong> Clara warned Victor by text at 11:32 PM ("Lock your door"). When Victor refused Daniel entry, Daniel climbed into the study. In the ensuing confrontation at 11:47 PM, Victor was struck with blunt force, smashing his pocket watch against the desk corner. Daniel bolted the door from inside to buy escape time, then dropped back down the trellis into the night.</li>
          </ul>
        </div>

        <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid var(--border-prominent); padding: 1.5rem; border-radius: 4px;">
          <h4 style="font-family: var(--font-mono); color: var(--amber-gold); margin-bottom: 0.6rem;">TRANSCRIPT // CONFESSION UNDER INTERROGATION:</h4>
          <p style="font-style: italic; color: var(--text-muted); font-size: 0.95rem; line-height: 1.7;">
            "I only climbed up to make him listen! The loan sharks gave me until dawn. When I came through the window, Uncle Victor grabbed the telephone. I reached to stop him... he tripped backward against the mahogany desk... the sound of that crystal watch breaking... it will haunt me for the rest of my days. I bolted the door so no one would find him until I was gone."
          </p>
        </div>
      `;
    }
  } else {
    // ==========================================
    // WRONG CONCLUSION: INNOCENT SUSPECT ACCUSED!
    // ==========================================
    const innocent = SUSPECTS_DATA[accusedId];
    if (header) {
      header.classList.remove('verdict-solved');
      header.classList.add('verdict-failed');
    }
    if (stamp) stamp.textContent = 'WRONG ACCUSATION';
    if (title) title.textContent = `INSUFFICIENT EVIDENCE: ${innocent.name.toUpperCase()} IS INNOCENT`;
    if (subtitle)
      subtitle.textContent =
        'The District Attorney rejected the indictment. Critical contradictions in the timeline and physical evidence were overlooked.';

    if (body) {
      body.innerHTML = `
        <div style="background: rgba(197, 48, 48, 0.1); border-left: 4px solid var(--crimson-bright); padding: 1.2rem; margin-bottom: 1.5rem;">
          <h3 style="font-family: var(--font-mono); font-size: 1rem; color: var(--crimson-bright); margin-bottom: 0.5rem;">FORENSIC EXCULPATION:</h3>
          <p style="font-size: 0.95rem; color: var(--text-cream); line-height: 1.7;">
            ${innocent.exculpatory}
          </p>
        </div>

        <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid var(--border-subtle); padding: 1.5rem; border-radius: 4px;">
          <h4 style="font-family: var(--font-mono); color: var(--amber-gold); margin-bottom: 0.6rem;">WHERE YOUR DEDUCTION WENT ASTRAY:</h4>
          <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6;">
            Remember: the study door was <strong>bolted from the inside</strong> with a mechanical slide latch. Whoever murdered Victor entered and escaped through the <strong>unlatched casement window</strong> from the exterior garden trellis in the downpour. 
            Check which suspect was outside in the garden with an unexplained gap in their phone records at 11:47 PM.
          </p>
        </div>
      `;
    }
  }

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closeVerdictModal() {
  const modal = document.getElementById('verdict-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function closeVerdictAndReset() {
  closeVerdictModal();
  const caseSection = document.getElementById('case-file');
  if (caseSection) {
    caseSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==========================================================================
// 12. INITIALIZATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initFogCanvas();
  setupNavigation();
  setupEvidenceFilters();
  setupCorkboard();
  setupAccusation();

  // Restore active suspect in interrogation
  selectInterrogationSuspect(gameState.activeInterrogationSuspect || 'eleanor');

  // Restore suspect flags on corkboard
  Object.keys(gameState.suspectFlags).forEach((id) => {
    updateSuspectFlagUI(id, gameState.suspectFlags[id]);
  });

  updateHUDProgress();

  console.log('The Last Alibi investigation engine initialized successfully.');
});

// Explicit window bindings for inline HTML event handlers
window.openSuspectModal = openSuspectModal;
window.closeSuspectModal = closeSuspectModal;
window.goToInterrogation = goToInterrogation;
window.openEvidenceModal = openEvidenceModal;
window.closeEvidenceModal = closeEvidenceModal;
window.filterTimeline = filterTimeline;
window.selectInterrogationSuspect = selectInterrogationSuspect;
window.askQuestion = askQuestion;
window.selectAccused = selectAccused;
window.closeVerdictModal = closeVerdictModal;
window.closeVerdictAndReset = closeVerdictAndReset;
window.clearScratchpad = clearScratchpad;
window.toggleSuspectFlag = toggleSuspectFlag;
window.removeConnection = removeConnection;

