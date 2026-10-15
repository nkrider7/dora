// --- WEB AUDIO SYNTHESIZER (NO EXTERNAL ASSETS REQUIRED) ---
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playSound(type) {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;

  if (type === 'jump') {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.16);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  } else if (type === 'shoot') {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(720, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.13);
  } else if (type === 'hit') {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.1);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.11);
  } else if (type === 'explosion') {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.28);
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'powerup') {
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.16, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.18);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.18);
    });
  } else if (type === 'levelup') {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);
      gain.gain.setValueAtTime(0.2, now + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.25);
    });
  } else if (type === 'shield') {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.15);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  } else if (type === 'gameover') {
    const notes = [392, 349.23, 329.63, 261.63];
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.14);
      gain.gain.setValueAtTime(0.16, now + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.14 + 0.28);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + idx * 0.14);
      osc.stop(now + idx * 0.14 + 0.28);
    });
  }
}

// --- LEVEL PHASES CONFIGURATION ---
const LEVEL_PHASES = [
  {
    level: 1,
    name: 'School Qualifier',
    skyColor: 0x7ec8ee,
    trackColor: 0xd45d3a,
    grassColor: 0x3b9e41,
    ambientIntensity: 0.72,
    sunColor: 0xfff7e6,
    baseSpeed: 13,
    botColor: 0xff2255
  },
  {
    level: 2,
    name: 'Golden Sunset Arena',
    skyColor: 0xfd7e50,
    trackColor: 0x9c3528,
    grassColor: 0x2d7a39,
    ambientIntensity: 0.62,
    sunColor: 0xffae42,
    baseSpeed: 16,
    botColor: 0xff6600
  },
  {
    level: 3,
    name: 'Neon Night Finals',
    skyColor: 0x0f172a,
    trackColor: 0x1e293b,
    grassColor: 0x064e3b,
    ambientIntensity: 0.5,
    sunColor: 0x38bdf8,
    baseSpeed: 19.5,
    botColor: 0xa855f7
  },
  {
    level: 4,
    name: 'Cyber Champion Gala',
    skyColor: 0x2e1065,
    trackColor: 0x3b0764,
    grassColor: 0x0f766e,
    ambientIntensity: 0.65,
    sunColor: 0xf43f5e,
    baseSpeed: 23,
    botColor: 0x00ffcc
  }
];

const PHASE_SCORE_STEP = 250; // Every 250 points completes a phase

// --- SCENE, CAMERA, RENDERER ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(LEVEL_PHASES[0].skyColor);
scene.fog = new THREE.Fog(LEVEL_PHASES[0].skyColor, 35, 95);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 6.5, 13);
camera.lookAt(3, 2.5, -2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// --- LIGHTS ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.72);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xfff7e6, 0.9);
dirLight.position.set(15, 30, 20);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 90;
dirLight.shadow.camera.left = -35;
dirLight.shadow.camera.right = 35;
dirLight.shadow.camera.top = 35;
dirLight.shadow.camera.bottom = -35;
scene.add(dirLight);

// --- HELPER: CREATE VOXEL BOX ---
function createBox(w, h, d, color, x, y, z, castShadow = true) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.5 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = castShadow;
  mesh.receiveShadow = true;
  return mesh;
}

// --- OLYMPIC TRACK & SCHOOL PLAYGROUND ENVIRONMENT ---
const track = createBox(140, 2, 7, 0xd45d3a, 15, -1, 0, false);
scene.add(track);

for (let zPos of [-3.2, -1.1, 1.1, 3.2]) {
  const laneLine = createBox(140, 0.04, 0.12, 0xffffff, 15, 0.01, zPos, false);
  scene.add(laneLine);
}

const trackMarkers = [];
for (let i = 0; i < 18; i++) {
  const marker = createBox(0.25, 0.05, 6.6, 0xffffff, -25 + i * 5, 0.01, 0, false);
  scene.add(marker);
  trackMarkers.push(marker);
}

const frontGrass = createBox(140, 2, 10, 0x3b9e41, 15, -1.05, 8.5, false);
const backGrass = createBox(140, 2, 45, 0x45b04c, 15, -1.05, -26, false);
scene.add(frontGrass, backGrass);

scene.add(createBox(140, 0.05, 0.25, 0xffffff, 15, -0.02, -5.5, false));

// --- PROCEDURAL COUNTRY FLAG TEXTURES ---
function createFlagTexture(country) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 80;
  const ctx = canvas.getContext('2d');

  if (country === 'INDIA') {
    ctx.fillStyle = '#FF9933'; ctx.fillRect(0, 0, 128, 27);
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 27, 128, 26);
    ctx.fillStyle = '#138808'; ctx.fillRect(0, 53, 128, 27);
    ctx.strokeStyle = '#000080'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(64, 40, 10, 0, Math.PI * 2); ctx.stroke();
  } else if (country === 'USA') {
    for (let i = 0; i < 13; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#B22234' : '#FFFFFF';
      ctx.fillRect(0, i * (80 / 13), 128, 80 / 13 + 1);
    }
    ctx.fillStyle = '#3C3B6E'; ctx.fillRect(0, 0, 55, 43);
    ctx.fillStyle = '#FFFFFF';
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 5; c++) {
        ctx.fillRect(6 + c * 10, 5 + r * 9, 3, 3);
      }
    }
  } else if (country === 'JAPAN') {
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, 128, 80);
    ctx.fillStyle = '#BC002D';
    ctx.beginPath(); ctx.arc(64, 40, 22, 0, Math.PI * 2); ctx.fill();
  } else if (country === 'BRAZIL') {
    ctx.fillStyle = '#009c3b'; ctx.fillRect(0, 0, 128, 80);
    ctx.fillStyle = '#ffdf00';
    ctx.beginPath();
    ctx.moveTo(64, 10); ctx.lineTo(114, 40); ctx.lineTo(64, 70); ctx.lineTo(14, 40);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#002776';
    ctx.beginPath(); ctx.arc(64, 40, 14, 0, Math.PI * 2); ctx.fill();
  } else if (country === 'FRANCE') {
    ctx.fillStyle = '#0055A4'; ctx.fillRect(0, 0, 43, 80);
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(43, 0, 42, 80);
    ctx.fillStyle = '#EF4135'; ctx.fillRect(85, 0, 43, 80);
  } else if (country === 'GERMANY') {
    ctx.fillStyle = '#000000'; ctx.fillRect(0, 0, 128, 27);
    ctx.fillStyle = '#DD0000'; ctx.fillRect(0, 27, 128, 26);
    ctx.fillStyle = '#FFCE00'; ctx.fillRect(0, 53, 128, 27);
  } else if (country === 'UK') {
    ctx.fillStyle = '#012169'; ctx.fillRect(0, 0, 128, 80);
    ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 14;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(128, 80); ctx.moveTo(128, 0); ctx.lineTo(0, 80); ctx.stroke();
    ctx.strokeStyle = '#C8102E'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(128, 80); ctx.moveTo(128, 0); ctx.lineTo(0, 80); ctx.stroke();
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(52, 0, 24, 80); ctx.fillRect(0, 28, 128, 24);
    ctx.fillStyle = '#C8102E'; ctx.fillRect(56, 0, 16, 80); ctx.fillRect(0, 32, 128, 16);
  } else if (country === 'CANADA') {
    ctx.fillStyle = '#FF0000'; ctx.fillRect(0, 0, 32, 80); ctx.fillRect(96, 0, 32, 80);
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(32, 0, 64, 80);
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(52, 24, 24, 24);
    ctx.fillRect(61, 48, 6, 14);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  return texture;
}

const countryList = ['INDIA', 'USA', 'JAPAN', 'BRAZIL', 'UK', 'FRANCE', 'GERMANY', 'CANADA'];
const flagPoles = [];

function createFlagPole(country, xPos, zPos) {
  const group = new THREE.Group();
  group.add(createBox(0.18, 7.5, 0.18, 0xeeeeee, 0, 3.75, 0));
  group.add(createBox(0.35, 0.35, 0.35, 0xffd700, 0, 7.6, 0));
  group.add(createBox(0.6, 0.4, 0.6, 0x888888, 0, 0.2, 0));

  const flagGeo = new THREE.BoxGeometry(2.4, 1.4, 0.08);
  const flagMat = new THREE.MeshStandardMaterial({
    map: createFlagTexture(country),
    roughness: 0.4
  });
  const flagMesh = new THREE.Mesh(flagGeo, flagMat);
  flagMesh.position.set(1.25, 6.5, 0);
  flagMesh.castShadow = true;
  group.add(flagMesh);
  group.userData = { flagMesh, phase: Math.random() * Math.PI * 2 };

  group.position.set(xPos, 0, zPos);
  scene.add(group);
  return group;
}

for (let i = 0; i < 12; i++) {
  const country = countryList[i % countryList.length];
  flagPoles.push(createFlagPole(country, -24 + i * 7.5, -4.5));
}

// --- BACKGROUND PROPS: SCHOOL BUILDINGS, OLYMPIC RINGS, BLEACHERS, TREES ---
const bgProps = [];

function createOlympicRings(x, y, z) {
  const group = new THREE.Group();
  const ringColors = [0x0081c8, 0xfcb131, 0x000000, 0x00a651, 0xee334e];
  const offsets = [
    [-2.2, 0.4], [-1.1, -0.4], [0, 0.4], [1.1, -0.4], [2.2, 0.4]
  ];
  const torusGeo = new THREE.TorusGeometry(0.75, 0.14, 8, 20);
  offsets.forEach(([ox, oy], idx) => {
    const mat = new THREE.MeshStandardMaterial({ color: ringColors[idx], roughness: 0.3 });
    const ring = new THREE.Mesh(torusGeo, mat);
    ring.position.set(ox, oy, 0);
    group.add(ring);
  });
  group.position.set(x, y, z);
  return group;
}

function createSchoolBuilding() {
  const school = new THREE.Group();
  school.add(createBox(16, 8, 6, 0xc85a32, 0, 4, 0));
  school.add(createBox(16.8, 0.8, 6.6, 0x3b4d61, 0, 8.4, 0));
  school.add(createBox(4.5, 12, 4.5, 0xd96b43, 0, 6, 0.8));
  school.add(createBox(5.2, 1.0, 5.2, 0x2c3e50, 0, 12.5, 0.8));
  school.add(createBox(1.8, 1.8, 0.2, 0xffffff, 0, 9.8, 3.1));
  school.add(createBox(0.15, 0.7, 0.25, 0x111111, 0, 10.0, 3.15));
  school.add(createBox(0.5, 0.15, 0.25, 0x111111, 0.2, 9.8, 3.15));
  school.add(createBox(2.6, 3.2, 0.4, 0x5c3a21, 0, 1.6, 3.0));
  for (let wx of [-5.5, -3.5, 3.5, 5.5]) {
    for (let wy of [2.5, 5.8]) {
      school.add(createBox(1.3, 1.6, 0.2, 0x99ddff, wx, wy, 3.01));
    }
  }
  school.add(createOlympicRings(0, 15.2, 1.5));
  return school;
}

function createBleachers() {
  const stand = new THREE.Group();
  const stepColors = [0xdddddd, 0xcccccc, 0xbbbbbb, 0xaaaaaa];
  for (let s = 0; s < 4; s++) {
    stand.add(createBox(10, 0.8 * (s + 1), 1.2, stepColors[s], 0, 0.4 * (s + 1), -s * 1.2));
  }
  stand.add(createBox(10.4, 0.4, 6, 0x1d4ed8, 0, 5.2, -1.8));
  stand.add(createBox(0.3, 5.2, 0.3, 0x666666, -4.8, 2.6, -4.2));
  stand.add(createBox(0.3, 5.2, 0.3, 0x666666, 4.8, 2.6, -4.2));

  const shirtColors = [0xff3366, 0x00ffcc, 0xffdd00, 0x3388ff, 0xff8800, 0xffffff];
  for (let s = 0; s < 3; s++) {
    for (let c = -3.8; c <= 3.8; c += 1.5) {
      if (Math.random() > 0.25) {
        const color = shirtColors[Math.floor(Math.random() * shirtColors.length)];
        const fan = new THREE.Group();
        fan.add(createBox(0.5, 0.6, 0.4, color, 0, 0.3, 0));
        fan.add(createBox(0.45, 0.45, 0.45, 0xffccaa, 0, 0.85, 0));
        fan.position.set(c, (s + 1) * 0.8, -s * 1.2);
        stand.add(fan);
      }
    }
  }
  return stand;
}

function createSoccerGoalAndTorch() {
  const group = new THREE.Group();
  group.add(createBox(0.25, 3.2, 0.25, 0xffffff, -3, 1.6, 2));
  group.add(createBox(0.25, 3.2, 0.25, 0xffffff, 3, 1.6, 2));
  group.add(createBox(6.25, 0.25, 0.25, 0xffffff, 0, 3.1, 2));
  group.add(createBox(2.2, 1.2, 2.2, 0xdddddd, 8, 0.6, 0));
  group.add(createBox(1.4, 5.5, 1.4, 0xeeeeee, 8, 3.5, 0));
  group.add(createBox(2.6, 0.8, 2.6, 0xffd700, 8, 6.5, 0));
  group.add(createBox(1.4, 1.6, 1.4, 0xff5500, 8, 7.6, 0));
  group.add(createBox(0.9, 1.4, 0.9, 0xffdd00, 8, 8.6, 0));
  for (let tx of [-8, 14]) {
    group.add(createBox(0.8, 2.5, 0.8, 0x6e4720, tx, 1.25, 0));
    group.add(createBox(2.8, 2.8, 2.8, 0x2d8a34, tx, 3.6, 0));
    group.add(createBox(2.0, 1.8, 2.0, 0x3ca344, tx, 5.2, 0));
  }
  return group;
}

const builders = [createBleachers, createSchoolBuilding, createSoccerGoalAndTorch, createBleachers];
for (let i = 0; i < 4; i++) {
  const prop = builders[i]();
  prop.position.set(-25 + i * 28, 0, -15);
  scene.add(prop);
  bgProps.push(prop);
}

const clouds = [];
for (let i = 0; i < 8; i++) {
  const cloud = new THREE.Group();
  cloud.add(createBox(3.5, 1.2, 2.0, 0xffffff, 0, 0, 0, false));
  cloud.add(createBox(2.2, 1.0, 1.6, 0xf2f9ff, 1.6, -0.2, 0.3, false));
  cloud.add(createBox(2.0, 0.9, 1.6, 0xf2f9ff, -1.6, -0.2, -0.2, false));
  cloud.position.set(-30 + i * 16, 15 + (i % 3) * 2.5, -22 - (i % 2) * 6);
  scene.add(cloud);
  clouds.push(cloud);
}

// --- BUILD BUFF DORAEMON CHARACTER WITH PROPELLER & GOD SHIELD ---
const player = new THREE.Group();

// 1. Muscular Blue Torso + White Belly + 4D Pocket
const torso = createBox(0.9, 1.1, 0.68, 0x0066cc, 0, 1.15, 0);
const belly = createBox(0.22, 0.82, 0.56, 0xffffff, 0.38, 1.1, 0);
const pouch = createBox(0.08, 0.32, 0.42, 0xdddddd, 0.47, 0.96, 0);
player.add(torso, belly, pouch);

// Red Collar & Golden Bell
const collar = createBox(0.88, 0.14, 0.72, 0xee2222, 0, 1.72, 0);
const bell = createBox(0.22, 0.22, 0.22, 0xffd700, 0.48, 1.64, 0);
player.add(collar, bell);

// 2. Head (Blue Hood + White Face + Red Nose + Whiskers facing +X)
const headGroup = new THREE.Group();
headGroup.position.set(0, 2.25, 0);

const hood = createBox(0.95, 0.95, 0.95, 0x0066cc, 0, 0, 0);
const face = createBox(0.22, 0.8, 0.8, 0xffffff, 0.4, -0.02, 0);
const nose = createBox(0.18, 0.18, 0.18, 0xee2222, 0.53, 0.05, 0);

const eyeL = createBox(0.06, 0.14, 0.12, 0x111111, 0.51, 0.22, 0.18);
const eyeR = createBox(0.06, 0.14, 0.12, 0x111111, 0.51, 0.22, -0.18);

const wL1 = createBox(0.04, 0.04, 0.26, 0x111111, 0.52, 0.02, 0.28);
const wL2 = createBox(0.04, 0.04, 0.26, 0x111111, 0.52, -0.1, 0.28);
const wR1 = createBox(0.04, 0.04, 0.26, 0x111111, 0.52, 0.02, -0.28);
const wR2 = createBox(0.04, 0.04, 0.26, 0x111111, 0.52, -0.1, -0.28);

headGroup.add(hood, face, nose, eyeL, eyeR, wL1, wL2, wR1, wR2);

// 3. Bamboo Copter (Hopter Propeller on top of Head)
const copterGroup = new THREE.Group();
copterGroup.position.set(0, 0.52, 0);
const copterStem = createBox(0.1, 0.34, 0.1, 0xffd700, 0, 0.14, 0);
const copterBlades = createBox(1.4, 0.06, 0.22, 0x00ffff, 0, 0.32, 0);
copterGroup.add(copterStem, copterBlades);
headGroup.add(copterGroup);
player.add(headGroup);

// 4. Muscular Bicep Arms + Arm Cannon + White Round Hands
const gunArm = new THREE.Group();
gunArm.add(createBox(0.45, 0.42, 0.38, 0x0066cc, 0.15, 1.35, 0.52)); // Muscular shoulder/bicep
gunArm.add(createBox(0.55, 0.32, 0.28, 0x222222, 0.65, 1.32, 0.52)); // Blaster barrel
gunArm.add(createBox(0.18, 0.24, 0.24, 0xff9900, 0.95, 1.32, 0.52)); // Glowing muzzle

const backArm = new THREE.Group();
backArm.add(createBox(0.45, 0.42, 0.38, 0x0066cc, 0.1, 1.35, -0.52));
backArm.add(createBox(0.3, 0.3, 0.3, 0xffffff, 0.35, 1.25, -0.52)); // White sphere hand
player.add(gunArm, backArm);

// 5. Legs & White Boots
const leftLeg = createBox(0.36, 0.6, 0.36, 0x0066cc, 0, 0.32, 0.2);
leftLeg.add(createBox(0.46, 0.18, 0.4, 0xffffff, 0.05, -0.22, 0));
const rightLeg = createBox(0.36, 0.6, 0.36, 0x0066cc, 0, 0.32, -0.2);
rightLeg.add(createBox(0.46, 0.18, 0.4, 0xffffff, 0.05, -0.22, 0));
player.add(leftLeg, rightLeg);

// 6. Golden God-Mode Aura Shield
const shieldGeo = new THREE.SphereGeometry(1.65, 20, 20);
const shieldMat = new THREE.MeshStandardMaterial({
  color: 0xffdd00,
  emissive: 0xffaa00,
  emissiveIntensity: 0.5,
  transparent: true,
  opacity: 0.28,
  wireframe: true
});
const godShieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
godShieldMesh.position.set(0, 1.3, 0);
godShieldMesh.visible = false;
player.add(godShieldMesh);

player.position.set(-4, 0, 0);
scene.add(player);

// --- BUILD ENEMY / OBSTACLE MESHES ---
function createObstacle(isDestructible, botColor) {
  const group = new THREE.Group();
  group.userData = { isDestructible, hp: isDestructible ? 2 : 999 };

  if (isDestructible) {
    group.add(createBox(1.1, 1.4, 1.1, botColor, 0, 0.7, 0));
    group.add(createBox(0.9, 0.7, 0.9, 0x222233, 0, 1.75, 0));
    group.add(createBox(0.2, 0.25, 0.7, 0xffff00, -0.46, 1.8, 0));
    group.userData.width = 1.1;
    group.userData.height = 2.1;
  } else {
    group.add(createBox(0.9, 0.15, 0.2, 0x333333, 0, 0.08, 0.9));
    group.add(createBox(0.9, 0.15, 0.2, 0x333333, 0, 0.08, -0.9));
    group.add(createBox(0.2, 1.25, 0.2, 0xdddddd, 0, 0.65, 0.9));
    group.add(createBox(0.2, 1.25, 0.2, 0xdddddd, 0, 0.65, -0.9));
    group.add(createBox(0.35, 0.35, 2.2, 0xffffff, 0, 1.2, 0));
    group.add(createBox(0.37, 0.37, 0.5, 0xff3300, 0, 1.2, -0.6));
    group.add(createBox(0.37, 0.37, 0.5, 0xff3300, 0, 1.2, 0.6));
    group.userData.width = 0.9;
    group.userData.height = 1.38;
  }

  group.position.set(42, 0, 0);
  scene.add(group);
  return group;
}

// --- COLLECTIBLE FLIGHT POWER-UP (GOLDEN STAR / DORAYAKI) ---
const powerUps = [];
function spawnPowerUp() {
  const star = new THREE.Group();
  star.add(createBox(0.75, 0.75, 0.75, 0xffd700, 0, 0, 0));
  star.add(createBox(0.45, 0.45, 0.95, 0x00ffff, 0, 0, 0));
  star.position.set(42, 2.3 + Math.random() * 2.5, 0);
  scene.add(star);
  powerUps.push(star);
}

// --- PARTICLES ---
const particles = [];
function spawnExplosion(x, y, z, color, count = 14) {
  for (let i = 0; i < count; i++) {
    const p = createBox(0.22, 0.22, 0.22, color, x, y, z, false);
    p.userData = {
      vx: (Math.random() - 0.5) * 10,
      vy: Math.random() * 8 + 2,
      vz: (Math.random() - 0.5) * 10,
      life: 0.7
    };
    scene.add(p);
    particles.push(p);
  }
}

// --- GAME STATE ---
let isPlaying = false;
let score = 0;
let highScore = 0;
let currentLevel = 1;
let gameSpeed = LEVEL_PHASES[0].baseSpeed;
let spawnTimer = 0;
let powerSpawnTimer = 7.0;

let isGodMode = false;
let isFlying = false;
let flyTimer = 0;
let upPressed = false;

let playerVy = 0;
let jumpCount = 0;
const GRAVITY = -32;
const JUMP_FORCE = 12.8;

const bullets = [];
const obstacles = [];

// DOM Elements
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('highScore');
const levelBadgeEl = document.getElementById('levelBadge');
const phaseNameEl = document.getElementById('phaseName');
const phaseProgressEl = document.getElementById('phaseProgress');
const powerHudEl = document.getElementById('powerHud');
const powerTimerEl = document.getElementById('powerTimer');
const godModeBtn = document.getElementById('godModeBtn');
const godModeStateEl = document.getElementById('godModeState');
const soundBtn = document.getElementById('soundBtn');
const soundStateEl = document.getElementById('soundState');
const phaseBannerEl = document.getElementById('phaseBanner');
const bannerSubEl = document.getElementById('bannerSub');
const bannerTitleEl = document.getElementById('bannerTitle');
const overlay = document.getElementById('overlay');
const titleText = document.getElementById('titleText');
const subText = document.getElementById('subText');
const startBtn = document.getElementById('startBtn');

let bannerTimeout = null;

function showPhaseBanner(sub, title) {
  bannerSubEl.textContent = sub;
  bannerTitleEl.textContent = title;
  phaseBannerEl.classList.remove('hidden');
  if (bannerTimeout) clearTimeout(bannerTimeout);
  bannerTimeout = setTimeout(() => {
    phaseBannerEl.classList.add('hidden');
  }, 2600);
}

function applyLevelPhase(levelNum, announce = true) {
  const phaseIdx = (levelNum - 1) % LEVEL_PHASES.length;
  const phase = LEVEL_PHASES[phaseIdx];

  scene.background.setHex(phase.skyColor);
  scene.fog.color.setHex(phase.skyColor);
  track.material.color.setHex(phase.trackColor);
  frontGrass.material.color.setHex(phase.grassColor);
  backGrass.material.color.setHex(phase.grassColor);
  ambientLight.intensity = phase.ambientIntensity;
  dirLight.color.setHex(phase.sunColor);

  levelBadgeEl.textContent = `LEVEL ${levelNum}`;
  phaseNameEl.textContent = phase.name;

  if (announce) {
    playSound('levelup');
    showPhaseBanner(`PHASE ${levelNum - 1} COMPLETE!`, `LEVEL ${levelNum}: ${phase.name.toUpperCase()}`);
    spawnExplosion(player.position.x, player.position.y + 2, 0, 0xffdd00, 30);
  }
}

function toggleGodMode() {
  isGodMode = !isGodMode;
  godShieldMesh.visible = isGodMode;
  godModeStateEl.textContent = isGodMode ? 'ON' : 'OFF';
  godModeBtn.classList.toggle('god-active', isGodMode);
  playSound('shield');
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  soundStateEl.textContent = soundEnabled ? 'ON' : 'OFF';
  soundBtn.classList.toggle('sound-on', soundEnabled);
  if (soundEnabled) playSound('shield');
}

function activateFlightPower() {
  isFlying = true;
  flyTimer = 10.0;
  powerHudEl.classList.remove('hidden');
  playSound('powerup');
  spawnExplosion(player.position.x, player.position.y + 1.2, 0, 0x00ffff, 25);
}

// --- ACTIONS ---
function jump() {
  if (!isPlaying) return;
  if (!isFlying && jumpCount < 2) {
    playerVy = JUMP_FORCE;
    jumpCount++;
    playSound('jump');
    spawnExplosion(player.position.x, player.position.y + 0.2, 0, 0xffffff, 6);
  }
}

function shoot() {
  if (!isPlaying) return;
  playSound('shoot');
  const bullet = createBox(0.55, 0.22, 0.22, 0xffdd00, player.position.x + 1.2, player.position.y + 1.32, 0, false);
  bullets.push(bullet);
  gunArm.position.x = -0.18;
}

function resetGame() {
  initAudio();
  score = 0;
  currentLevel = 1;
  gameSpeed = LEVEL_PHASES[0].baseSpeed;
  spawnTimer = 1.0;
  powerSpawnTimer = 6.5;
  player.position.y = 0;
  playerVy = 0;
  jumpCount = 0;
  isFlying = false;
  flyTimer = 0;
  powerHudEl.classList.add('hidden');
  scoreEl.textContent = '0';
  phaseProgressEl.style.width = '0%';

  applyLevelPhase(1, false);

  bullets.forEach(b => scene.remove(b));
  bullets.length = 0;

  obstacles.forEach(o => scene.remove(o));
  obstacles.length = 0;

  powerUps.forEach(p => scene.remove(p));
  powerUps.length = 0;

  isPlaying = true;
  overlay.classList.add('hidden');
}

function gameOver() {
  isPlaying = false;
  playSound('gameover');
  if (Math.floor(score) > highScore) {
    highScore = Math.floor(score);
    highScoreEl.textContent = highScore;
  }
  spawnExplosion(player.position.x, player.position.y + 1, 0, 0x0066cc, 28);
  titleText.textContent = 'PHASE FAILED';
  subText.textContent = `Reached Level ${currentLevel} (${LEVEL_PHASES[(currentLevel - 1) % LEVEL_PHASES.length].name}) — Final Score: ${Math.floor(score)}`;
  startBtn.textContent = 'PLAY AGAIN';
  overlay.classList.remove('hidden');
}

// --- INPUT LISTENERS ---
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
    e.preventDefault();
    upPressed = true;
    jump();
  }
  if (e.code === 'KeyF' || e.code === 'Enter') {
    e.preventDefault();
    shoot();
  }
  if (e.code === 'KeyG') {
    e.preventDefault();
    toggleGodMode();
  }
  if (e.code === 'KeyM') {
    e.preventDefault();
    toggleSound();
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
    upPressed = false;
  }
});

window.addEventListener('pointerdown', (e) => {
  if (e.target.closest('button')) return;
  shoot();
});

startBtn.addEventListener('click', resetGame);
godModeBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleGodMode();
});
soundBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleSound();
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- MAIN GAME LOOP ---
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.1);
  const elapsed = clock.getElapsedTime();

  // Flag waving
  flagPoles.forEach(fp => {
    fp.userData.flagMesh.rotation.y = Math.sin(elapsed * 5 + fp.userData.phase) * 0.15;
  });

  // Drift clouds
  clouds.forEach(c => {
    c.position.x -= dt * 1.5;
    if (c.position.x < -45) c.position.x = 80;
  });

  // Spin Doraemon's Bamboo Copter & God Mode Shield
  copterBlades.rotation.y += dt * (isFlying ? 38 : 5);
  if (isGodMode) {
    godShieldMesh.rotation.y += dt * 2.5;
    godShieldMesh.rotation.x += dt * 1.2;
  }

  if (isPlaying) {
    gameSpeed += dt * 0.28;
    score += dt * 12;
    scoreEl.textContent = Math.floor(score);

    // Check Level / Phase Progression
    const newLevel = Math.floor(score / PHASE_SCORE_STEP) + 1;
    const phasePercent = ((score % PHASE_SCORE_STEP) / PHASE_SCORE_STEP) * 100;
    phaseProgressEl.style.width = `${Math.min(100, phasePercent)}%`;

    if (newLevel > currentLevel) {
      currentLevel = newLevel;
      const phaseCfg = LEVEL_PHASES[(currentLevel - 1) % LEVEL_PHASES.length];
      gameSpeed = Math.max(gameSpeed, phaseCfg.baseSpeed + (currentLevel - 1) * 1.2);
      applyLevelPhase(currentLevel, true);
    }

    // Scroll track markers
    trackMarkers.forEach(m => {
      m.position.x -= gameSpeed * dt;
      if (m.position.x < -25) m.position.x += 90;
    });

    // Scroll country flags
    flagPoles.forEach(fp => {
      fp.position.x -= gameSpeed * dt;
      if (fp.position.x < -25) fp.position.x += 90;
    });

    // Scroll background stadium props
    bgProps.forEach(prop => {
      prop.position.x -= gameSpeed * 0.45 * dt;
      if (prop.position.x < -45) prop.position.x += 112;
    });

    // Player Physics (Propeller Flight vs Gravity)
    if (isFlying) {
      flyTimer -= dt;
      powerTimerEl.textContent = Math.max(0, Math.ceil(flyTimer));

      if (upPressed) {
        playerVy = THREE.MathUtils.lerp(playerVy, 9.5, dt * 8);
      } else {
        playerVy = THREE.MathUtils.lerp(playerVy, -3.2, dt * 5);
      }
      player.position.y += playerVy * dt;
      player.position.y = Math.max(0.5, Math.min(player.position.y, 6.2));

      leftLeg.position.x = -0.15;
      rightLeg.position.x = -0.15;

      if (Math.random() > 0.55) {
        spawnExplosion(player.position.x - 0.4, player.position.y + 0.5, 0, 0x00ffff, 1);
      }

      if (flyTimer <= 0) {
        isFlying = false;
        powerHudEl.classList.add('hidden');
      }
    } else {
      player.position.y += playerVy * dt;
      playerVy += GRAVITY * dt;

      if (player.position.y <= 0) {
        player.position.y = 0;
        playerVy = 0;
        jumpCount = 0;
        const t = elapsed * gameSpeed * 1.5;
        leftLeg.position.x = Math.sin(t) * 0.25;
        rightLeg.position.x = -Math.sin(t) * 0.25;
      } else {
        leftLeg.position.x = 0.2;
        rightLeg.position.x = -0.2;
      }
    }

    gunArm.position.x = THREE.MathUtils.lerp(gunArm.position.x, 0, dt * 15);

    // Update Bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      b.position.x += 30 * dt;
      if (b.position.x > 40) {
        scene.remove(b);
        bullets.splice(i, 1);
      }
    }

    // Spawn Flight Power-Ups
    powerSpawnTimer -= dt;
    if (powerSpawnTimer <= 0) {
      spawnPowerUp();
      powerSpawnTimer = 11.0 + Math.random() * 5.0;
    }

    // Update Flight Power-Ups
    for (let i = powerUps.length - 1; i >= 0; i--) {
      const p = powerUps[i];
      p.position.x -= gameSpeed * dt;
      p.rotation.y += dt * 4;
      p.rotation.x += dt * 2;

      const hitX = Math.abs(p.position.x - player.position.x) < 1.3;
      const hitY = Math.abs(p.position.y - (player.position.y + 1.2)) < 1.5;
      if (hitX && hitY) {
        scene.remove(p);
        powerUps.splice(i, 1);
        score += 30;
        activateFlightPower();
        continue;
      }

      if (p.position.x < -18) {
        scene.remove(p);
        powerUps.splice(i, 1);
      }
    }

    // Spawn Obstacles
    spawnTimer -= dt;
    if (spawnTimer <= 0) {
      const isDestructible = Math.random() > 0.42;
      const phaseCfg = LEVEL_PHASES[(currentLevel - 1) % LEVEL_PHASES.length];
      obstacles.push(createObstacle(isDestructible, phaseCfg.botColor));
      spawnTimer = Math.max(0.55, 1.75 - (gameSpeed - 12) * 0.055) + Math.random() * 0.45;
    }

    // Update Obstacles & Collisions
    for (let i = obstacles.length - 1; i >= 0; i--) {
      const obs = obstacles[i];
      obs.position.x -= gameSpeed * dt;

      // Bullet vs Obstacle
      for (let j = bullets.length - 1; j >= 0; j--) {
        const b = bullets[j];
        const hitX = Math.abs(b.position.x - obs.position.x) < (obs.userData.width / 2 + 0.35);
        const hitY = b.position.y >= 0 && b.position.y <= obs.userData.height;

        if (hitX && hitY) {
          scene.remove(b);
          bullets.splice(j, 1);

          if (obs.userData.isDestructible) {
            obs.userData.hp--;
            playSound('hit');
            spawnExplosion(b.position.x, b.position.y, 0, 0xff2255, 6);
            if (obs.userData.hp <= 0) {
              playSound('explosion');
              spawnExplosion(obs.position.x, 1.0, 0, 0xffaa00, 18);
              scene.remove(obs);
              obstacles.splice(i, 1);
              score += 25;
              scoreEl.textContent = Math.floor(score);
              break;
            }
          } else {
            playSound('hit');
            spawnExplosion(b.position.x, b.position.y, 0, 0xffffff, 4);
          }
        }
      }

      if (!obstacles[i]) continue;

      // Player vs Obstacle
      const pWidth = 0.75;
      const pHeight = 2.2;
      const overlapX = Math.abs(player.position.x - obs.position.x) < (pWidth / 2 + obs.userData.width / 2 - 0.12);
      const overlapY = (player.position.y < obs.userData.height - 0.15) && (player.position.y + pHeight > 0);

      if (overlapX && overlapY) {
        if (isGodMode) {
          // God Mode smashes right through obstacles without taking harm!
          playSound('explosion');
          spawnExplosion(obs.position.x, 1.0, 0, 0xffdd00, 20);
          scene.remove(obs);
          obstacles.splice(i, 1);
          score += 15;
          scoreEl.textContent = Math.floor(score);
          continue;
        } else {
          gameOver();
          break;
        }
      }

      if (obs.position.x < -18) {
        scene.remove(obs);
        obstacles.splice(i, 1);
      }
    }
  }

  // Update Particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.position.x += p.userData.vx * dt;
    p.position.y += p.userData.vy * dt;
    p.position.z += p.userData.vz * dt;
    p.userData.vy += GRAVITY * 0.6 * dt;
    p.userData.life -= dt;
    p.scale.setScalar(Math.max(0.01, p.userData.life));

    if (p.userData.life <= 0) {
      scene.remove(p);
      particles.splice(i, 1);
    }
  }

  renderer.render(scene, camera);
}

animate();
