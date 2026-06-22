const sc = addControl("weekendScale", "Weekend Scale", 50, 105, 76);
const fly = addControl("weekendFly", "Fly Out", 0, 1, 0.82);
const spd = addControl("weekendSpeed", "Tempo", 0.2, 2.6, 1.0);
const dep = addControl("weekendDepth", "3D Depth", 4, 80, 34);
const t = time * spd;
const n = count > 1 ? count : 1;
const id = i + 1;
let h = Math.sin(id * 12.9898) * 43758.5453;
h = h - Math.floor(h);
let h2 = Math.sin(id * 78.233) * 19341.113;
h2 = h2 - Math.floor(h2);
let h3 = Math.sin(id * 37.719) * 9517.721;
h3 = h3 - Math.floor(h3);
const p = i / n;
const jitter = (h - 0.5) * 0.09;
let lx = 0.0;
let ly = 0.0;
let lz = Math.sin(t + id * 0.013) * 0.8;

if (p < 0.24) {
  const m = p / 0.24;
  const sg = Math.floor(m * 5.0);
  const u = m * 5.0 - sg;
  const th = (h2 - 0.5) * 0.18;
  if (sg < 1.0) {
    lx = -5.75 + 0.45 * u + th;
    ly = 0.62 - 1.24 * u + jitter;
  } else if (sg < 2.0) {
    lx = -5.24 + 0.45 * u + th;
    ly = 0.62 - 1.24 * u + jitter;
  } else if (sg < 3.0) {
    lx = -4.70 + 0.42 * u + th;
    ly = 0.62 - 1.24 * u + jitter;
  } else if (sg < 4.0) {
    lx = -5.36 + 1.05 * u + th;
    ly = -0.62 + 1.24 * Math.abs(u - 0.5) + jitter;
  } else {
    const a = u * 6.28318530718;
    const rr = 0.15 + h2 * 0.06;
    lx = -4.35 + Math.cos(a) * rr;
    ly = 0.54 + Math.sin(a) * rr;
  }
} else {
  const wp = (p - 0.24) / 0.76;
  const ch = Math.floor(wp * 7.0);
  const q = wp * 7.0 - ch;
  const base = -3.65 + ch * 1.12;
  let u = 0.0;
  let sg = 0.0;
  if (ch < 1.0) {
    sg = Math.floor(q * 4.0);
    u = q * 4.0 - sg;
    if (sg < 1.0) {
      lx = base - 0.42 + 0.23 * u + jitter;
      ly = 0.58 - 1.16 * u;
    } else if (sg < 2.0) {
      lx = base - 0.19 + 0.23 * u + jitter;
      ly = -0.58 + 1.16 * u;
    } else if (sg < 3.0) {
      lx = base + 0.04 + 0.23 * u + jitter;
      ly = 0.58 - 1.16 * u;
    } else {
      lx = base + 0.27 + 0.23 * u + jitter;
      ly = -0.58 + 1.16 * u;
    }
  } else if (ch < 2.0 || ch > 3.0 && ch < 5.0) {
    sg = Math.floor(q * 5.0);
    u = q * 5.0 - sg;
    if (sg < 1.0) {
      lx = base - 0.34 + 0.68 * u;
      ly = 0.36 + jitter;
    } else if (sg < 2.0) {
      lx = base + 0.34 + jitter;
      ly = 0.34 - 0.69 * u;
    } else if (sg < 3.0) {
      lx = base + 0.34 - 0.68 * u;
      ly = -0.36 + jitter;
    } else if (sg < 4.0) {
      lx = base - 0.34 + jitter;
      ly = -0.34 + 0.52 * u;
    } else {
      lx = base - 0.25 + 0.58 * u;
      ly = -0.02 + jitter;
    }
  } else if (ch < 4.0) {
    sg = Math.floor(q * 3.0);
    u = q * 3.0 - sg;
    if (sg < 1.0) {
      lx = base - 0.32 + jitter;
      ly = 0.58 - 1.16 * u;
    } else if (sg < 2.0) {
      lx = base - 0.30 + 0.65 * u;
      ly = 0.02 + 0.54 * u + jitter;
    } else {
      lx = base - 0.30 + 0.65 * u;
      ly = 0.02 - 0.54 * u + jitter;
    }
  } else if (ch < 6.0) {
    sg = Math.floor(q * 4.0);
    u = q * 4.0 - sg;
    if (sg < 1.0) {
      lx = base - 0.34 + jitter;
      ly = -0.50 + 1.00 * u;
    } else if (sg < 2.0) {
      lx = base - 0.34 + 0.66 * u;
      ly = 0.50 - 0.18 * Math.sin(u * 3.14159265359) + jitter;
    } else if (sg < 3.0) {
      lx = base + 0.32 + jitter;
      ly = 0.42 - 0.92 * u;
    } else {
      lx = base - 0.16 + 0.48 * u;
      ly = 0.08 - 0.58 * u + jitter;
    }
  } else {
    sg = Math.floor(q * 5.0);
    u = q * 5.0 - sg;
    if (sg < 1.0) {
      lx = base + 0.36 + jitter;
      ly = 0.62 - 1.24 * u;
    } else if (sg < 2.0) {
      lx = base - 0.28 + 0.64 * u;
      ly = 0.38 + jitter;
    } else if (sg < 3.0) {
      lx = base - 0.28 + jitter;
      ly = 0.36 - 0.72 * u;
    } else if (sg < 4.0) {
      lx = base - 0.28 + 0.64 * u;
      ly = -0.38 + jitter;
    } else {
      lx = base + 0.36 + jitter;
      ly = 0.38 - 0.76 * u;
    }
  }
}

const wave = 0.5 + 0.5 * Math.sin(t * 1.55 + h * 1.8);
const out = fly * wave * wave * (3.0 - 2.0 * wave);
const ang = id * 2.39996323 + t * (0.7 + h2 * 0.9);
const ring = sc * (0.9 + 2.4 * h3) * (0.65 + out);
const bx = Math.cos(ang) * ring;
const by = Math.sin(id * 0.071 + t * 1.4) * ring * 0.52 + Math.sin(ang * 2.0) * sc * 0.25;
const bz = Math.sin(ang - t * 0.6) * dep * (1.0 + h2 * 1.7);
const px = (lx + 1.16) * sc;
const py = ly * sc;
const pz = lz * dep * 0.08;
target.set(px * (1.0 - out) + bx * out, py * (1.0 - out) + by * out, pz * (1.0 - out) + bz * out);
color.setHSL(0.10 + 0.06 * h2 + 0.52 * out, 0.35 + 0.55 * out, 0.72 + 0.18 * (1.0 - out));
if (i === 0) setInfo("Weekend Logo Swarm", "Procedural W + Weekend wordmark: particles fly apart into a 3D field and reassemble into the logo.");
