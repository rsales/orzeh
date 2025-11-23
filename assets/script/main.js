const canvas = document.getElementById("ascii-canvas");

// Resolução (Pode aumentar 'height' se ficar achatado)
const width = 80;
const height = 40;

// Gradiente de caracteres (Do escuro para o claro)
const chars = " .,-~:;=!*#$@";

let time = 0;

// --- MATEMÁTICA DE ROTAÇÃO ---
function rotateX(p, angle) {
  const c = Math.cos(angle),
    s = Math.sin(angle);
  return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
}

function rotateZ(p, angle) {
  const c = Math.cos(angle),
    s = Math.sin(angle);
  return { x: p.x * c - p.y * s, y: p.x * s + p.y * c, z: p.z };
}

// Função suave (Smooth Min) para colar o vidro na base
function smin(a, b, k) {
  const h = Math.max(k - Math.abs(a - b), 0.0) / k;
  return Math.min(a, b) - h * h * k * (1.0 / 4.0);
}

// --- A FORMA DA LÂMPADA ---
function sceneSDF(p) {
  // 1. ROTAÇÃO TIPO DONUT
  // Aqui está o segredo: giramos o PONTO antes de desenhar
  // Giramos no eixo X e no eixo Z ao mesmo tempo
  let pRot = rotateX(p, time); // Tomba para frente/trás
  pRot = rotateZ(pRot, time * 0.5); // Gira de lado

  // 2. O VIDRO (Esfera)
  // Posição y = 0.3 (Levemente para cima)
  const sphere =
    Math.sqrt(pRot.x ** 2 + (pRot.y - 0.35) ** 2 + pRot.z ** 2) - 0.75;

  // 3. A BASE (Cilindro)
  // Posição y = -0.4 (Mais para baixo, mas perto da esfera)
  // As ranhuras da rosca (thread)
  const thread = Math.sin(pRot.y * 20) * 0.03;

  // Matematica do cilindro
  const cylinderDist = Math.sqrt(pRot.x ** 2 + pRot.z ** 2) - (0.35 + thread);
  const cylinderHeight = Math.abs(pRot.y + 0.4) - 0.35;
  const baseMetal = Math.max(cylinderDist, cylinderHeight);

  // 4. FUSÃO
  // O fator 0.25 é a "cola". Quanto maior, mais "líquida" a junção.
  return smin(sphere, baseMetal, 0.25);
}

// --- RENDERIZAÇÃO (Raymarching) ---
function getBrightness(x, y) {
  let uvX = (x / width) * 2 - 1;
  let uvY = ((y / height) * 2 - 1) * (height / width) * 2.0;

  // Camera e Direção
  let ro = { x: 0, y: 0, z: -2.2 }; // Camera perto
  let rd = { x: uvX, y: uvY, z: 1.5 }; // Lente

  // Normaliza vetor direção
  let l = Math.sqrt(rd.x ** 2 + rd.y ** 2 + rd.z ** 2);
  rd = { x: rd.x / l, y: rd.y / l, z: rd.z / l };

  let t = 0;

  // Loop principal (Caminha com o raio)
  for (let i = 0; i < 25; i++) {
    let p = { x: ro.x + rd.x * t, y: ro.y + rd.y * t, z: ro.z + rd.z * t };
    let d = sceneSDF(p); // Qual a distância para a lâmpada?

    if (d < 0.01) {
      // Tocou na lâmpada!
      // Calcula a normal para saber onde a luz bate
      const e = 0.01;
      let n = {
        x:
          sceneSDF({ x: p.x + e, y: p.y, z: p.z }) -
          sceneSDF({ x: p.x - e, y: p.y, z: p.z }),
        y:
          sceneSDF({ x: p.x, y: p.y + e, z: p.z }) -
          sceneSDF({ x: p.x, y: p.y - e, z: p.z }),
        z:
          sceneSDF({ x: p.x, y: p.y, z: p.z + e }) -
          sceneSDF({ x: p.x, y: p.y, z: p.z - e }),
      };
      // Normaliza a normal
      let nLen = Math.sqrt(n.x ** 2 + n.y ** 2 + n.z ** 2);
      n = { x: n.x / nLen, y: n.y / nLen, z: n.z / nLen };

      // Luz simples vinda de frente/cima
      let light = n.x * 0.5 + n.y * 0.5 - n.z * 0.5;

      // Retorna brilho + um brilho especular (brilho forte do vidro)
      return Math.max(0.1, light) + Math.pow(Math.max(0, light), 8) * 0.8;
    }
    t += d;
    if (t > 5) break;
  }
  return 0;
}

function render() {
  let output = "";
  // Varre a tela
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let b = getBrightness(x, y);

      // Mapeia brilho para caractere
      let idx = Math.floor(b * (chars.length - 1));
      if (idx < 0) idx = 0;
      if (idx >= chars.length) idx = chars.length - 1;

      output += chars[idx];
    }
    output += "\n";
  }
  canvas.textContent = output;
  time += 0.04; // Velocidade da rotação
  requestAnimationFrame(render);
}

render();
