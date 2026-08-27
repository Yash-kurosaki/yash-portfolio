export function scatteredField(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.pow(Math.random(), 0.33) * 25;
    pos[i3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i3 + 2] = r * Math.cos(phi);
  }
  return pos;
}

export function fibonacciSphere(count: number, radius: number = 10): Float32Array {
  const pos = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const inclination = Math.acos(1 - 2 * t);
    const azimuth = goldenAngle * i;
    const i3 = i * 3;
    pos[i3] = radius * Math.sin(inclination) * Math.cos(azimuth);
    pos[i3 + 1] = radius * Math.sin(inclination) * Math.sin(azimuth);
    pos[i3 + 2] = radius * Math.cos(inclination);
  }
  return pos;
}

export function organicTree(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  const branches = 12;
  const perBranch = Math.floor(count / branches);

  for (let b = 0; b < branches; b++) {
    const baseAngle = (b / branches) * Math.PI * 2;
    const height = 10 + Math.random() * 6;

    for (let i = 0; i < perBranch; i++) {
      const idx = b * perBranch + i;
      if (idx >= count) break;
      const t = i / perBranch;
      const spread = t * t * 4;
      const angle = baseAngle + Math.sin(t * 3) * 0.3;
      const i3 = idx * 3;
      pos[i3] = Math.cos(angle) * spread + (Math.random() - 0.5) * 0.4;
      pos[i3 + 1] = -6 + t * height + (Math.random() - 0.5) * 0.3;
      pos[i3 + 2] = Math.sin(angle) * spread + (Math.random() - 0.5) * 0.4;
    }
  }

  for (let i = branches * perBranch; i < count; i++) {
    const i3 = i * 3;
    pos[i3] = (Math.random() - 0.5) * 12;
    pos[i3 + 1] = Math.random() * 14 - 6;
    pos[i3 + 2] = (Math.random() - 0.5) * 12;
  }

  return pos;
}

export function neuralCluster(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  const clusters = 6;
  const perCluster = Math.floor(count / clusters);

  for (let c = 0; c < clusters; c++) {
    const cx = (Math.random() - 0.5) * 16;
    const cy = (Math.random() - 0.5) * 12;
    const cz = (Math.random() - 0.5) * 10;
    const clusterRadius = 2 + Math.random() * 2;

    for (let i = 0; i < perCluster; i++) {
      const idx = c * perCluster + i;
      if (idx >= count) break;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.pow(Math.random(), 0.5) * clusterRadius;
      const i3 = idx * 3;
      pos[i3] = cx + r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = cy + r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = cz + r * Math.cos(phi);
    }
  }

  for (let i = clusters * perCluster; i < count; i++) {
    const i3 = i * 3;
    pos[i3] = (Math.random() - 0.5) * 20;
    pos[i3 + 1] = (Math.random() - 0.5) * 15;
    pos[i3 + 2] = (Math.random() - 0.5) * 12;
  }

  return pos;
}

export function hexGrid(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  const spacing = 1.2;
  let idx = 0;

  for (let row = -10; row <= 10 && idx < count; row++) {
    for (let col = -10; col <= 10 && idx < count; col++) {
      const x = col * spacing * 1.5;
      const z = row * spacing * Math.sqrt(3) + (col % 2 ? spacing * Math.sqrt(3) / 2 : 0);
      const y = Math.sin(x * 0.3) * Math.cos(z * 0.3) * 2;

      const i3 = idx * 3;
      pos[i3] = x + (Math.random() - 0.5) * 0.2;
      pos[i3 + 1] = y + (Math.random() - 0.5) * 0.2;
      pos[i3 + 2] = z + (Math.random() - 0.5) * 0.2;
      idx++;
    }
  }

  for (; idx < count; idx++) {
    const i3 = idx * 3;
    pos[i3] = (Math.random() - 0.5) * 20;
    pos[i3 + 1] = (Math.random() - 0.5) * 15;
    pos[i3 + 2] = (Math.random() - 0.5) * 12;
  }

  return pos;
}

export function networkGraph(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  const nodes = 20;
  const perNode = Math.floor(count / nodes);

  const nodePositions: Array<[number, number, number]> = [];
  for (let n = 0; n < nodes; n++) {
    nodePositions.push([
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 10,
    ]);
  }

  for (let n = 0; n < nodes; n++) {
    const [nx, ny, nz] = nodePositions[n];
    for (let i = 0; i < perNode; i++) {
      const idx = n * perNode + i;
      if (idx >= count) break;
      const t = i / perNode;
      const targetNode = (n + 1 + Math.floor(Math.random() * (nodes - 1))) % nodes;
      const [tx, ty, tz] = nodePositions[targetNode];
      const i3 = idx * 3;
      pos[i3] = nx + (tx - nx) * t * 0.6 + (Math.random() - 0.5) * 1;
      pos[i3 + 1] = ny + (ty - ny) * t * 0.6 + (Math.random() - 0.5) * 1;
      pos[i3 + 2] = nz + (tz - nz) * t * 0.6 + (Math.random() - 0.5) * 1;
    }
  }

  for (let i = nodes * perNode; i < count; i++) {
    const i3 = i * 3;
    pos[i3] = (Math.random() - 0.5) * 20;
    pos[i3 + 1] = (Math.random() - 0.5) * 15;
    pos[i3 + 2] = (Math.random() - 0.5) * 12;
  }

  return pos;
}

export function spiralFlow(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  const spirals = 5;
  const perSpiral = Math.floor(count / spirals);

  for (let s = 0; s < spirals; s++) {
    const offset = (s / spirals) * Math.PI * 2;
    for (let i = 0; i < perSpiral; i++) {
      const idx = s * perSpiral + i;
      if (idx >= count) break;
      const t = i / perSpiral;
      const angle = t * Math.PI * 4 + offset;
      const radius = 2 + t * 6;
      const i3 = idx * 3;
      pos[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.3;
      pos[i3 + 1] = (t - 0.5) * 14 + (Math.random() - 0.5) * 0.3;
      pos[i3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.3;
    }
  }

  for (let i = spirals * perSpiral; i < count; i++) {
    const i3 = i * 3;
    pos[i3] = (Math.random() - 0.5) * 20;
    pos[i3 + 1] = (Math.random() - 0.5) * 15;
    pos[i3 + 2] = (Math.random() - 0.5) * 12;
  }

  return pos;
}

export function ringExpand(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  const rings = 8;
  const perRing = Math.floor(count / rings);

  for (let r = 0; r < rings; r++) {
    const ringRadius = 3 + r * 2.5;
    const yOffset = (r - rings / 2) * 1.5;
    for (let i = 0; i < perRing; i++) {
      const idx = r * perRing + i;
      if (idx >= count) break;
      const angle = (i / perRing) * Math.PI * 2;
      const i3 = idx * 3;
      pos[i3] = Math.cos(angle) * ringRadius + (Math.random() - 0.5) * 0.5;
      pos[i3 + 1] = yOffset + (Math.random() - 0.5) * 0.3;
      pos[i3 + 2] = Math.sin(angle) * ringRadius + (Math.random() - 0.5) * 0.5;
    }
  }

  for (let i = rings * perRing; i < count; i++) {
    const i3 = i * 3;
    pos[i3] = (Math.random() - 0.5) * 25;
    pos[i3 + 1] = (Math.random() - 0.5) * 15;
    pos[i3 + 2] = (Math.random() - 0.5) * 15;
  }

  return pos;
}
