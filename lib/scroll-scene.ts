import * as THREE from "three";

/**
 * Scroll-driven corridor. Document scroll (0–1) moves the camera along a
 * curve and eases a wireframe instrument beside the hero portrait. The
 * canvas is decorative: every readable word stays in HTML.
 */
export function mountScrollScene(
  canvas: HTMLCanvasElement,
  options: { animate: boolean },
): () => void {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);

  const cameraPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.15, 0.12, 8.4),
    new THREE.Vector3(-0.85, 0.62, 7.3),
    new THREE.Vector3(0.45, 1.05, 8.5),
    new THREE.Vector3(-0.35, 0.18, 9.2),
    new THREE.Vector3(0.2, -0.42, 11.4),
  ]);
  const lookPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.7, 0.08, 0),
    new THREE.Vector3(0.55, 0.35, 0),
    new THREE.Vector3(1.15, 0.55, 0),
    new THREE.Vector3(0.25, 0.12, 0),
    new THREE.Vector3(1.35, -0.05, 0),
  ]);

  const core = new THREE.Group();
  core.position.set(2.55, 0.12, 0);
  scene.add(core);

  const disposables: Array<{ dispose: () => void }> = [];
  const track = <T extends { dispose: () => void }>(item: T) => {
    disposables.push(item);
    return item;
  };

  const icoGeometry = track(new THREE.IcosahedronGeometry(1.15, 0));
  const icoMaterial = track(
    new THREE.MeshBasicMaterial({
      color: 0x7ad7ff,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
    }),
  );
  const ico = new THREE.Mesh(icoGeometry, icoMaterial);
  core.add(ico);

  const edgeMaterial = track(new THREE.LineBasicMaterial({ color: 0xd7f3ff }));
  const edges = new THREE.LineSegments(track(new THREE.EdgesGeometry(icoGeometry)), edgeMaterial);
  core.add(edges);

  const ringAMaterial = track(
    new THREE.MeshBasicMaterial({ color: 0x7ad7ff, transparent: true, opacity: 0.9 }),
  );
  const ringA = new THREE.Mesh(track(new THREE.TorusGeometry(1.42, 0.011, 12, 80)), ringAMaterial);
  ringA.rotation.x = Math.PI / 2.35;
  core.add(ringA);

  const ringBMaterial = track(
    new THREE.MeshBasicMaterial({ color: 0xc4b6ff, transparent: true, opacity: 0.75 }),
  );
  const ringB = new THREE.Mesh(track(new THREE.TorusGeometry(1.68, 0.007, 12, 80)), ringBMaterial);
  ringB.rotation.x = Math.PI / 1.7;
  core.add(ringB);

  const knotMaterial = track(
    new THREE.MeshBasicMaterial({
      color: 0xc4b6ff,
      wireframe: true,
      transparent: true,
      opacity: 0,
    }),
  );
  const knot = new THREE.Mesh(track(new THREE.TorusKnotGeometry(0.62, 0.016, 80, 8)), knotMaterial);
  core.add(knot);

  const satellites: THREE.Mesh[] = [];
  for (let index = 0; index < 4; index += 1) {
    const material = track(
      new THREE.MeshBasicMaterial({
        color: index % 2 === 0 ? 0x7ad7ff : 0xc4b6ff,
        wireframe: true,
      }),
    );
    const satellite = new THREE.Mesh(track(new THREE.OctahedronGeometry(0.07 + index * 0.015, 0)), material);
    core.add(satellite);
    satellites.push(satellite);
  }

  const count = 560;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const cyan = new THREE.Color("#7ad7ff");
  const violet = new THREE.Color("#c4b6ff");
  const ice = new THREE.Color("#e8eef8");
  let seed = 0x51ed;
  const random = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };

  for (let index = 0; index < count; index += 1) {
    const radius = 3.4 + random() * 7.2;
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.72;
    positions[index * 3 + 2] = radius * Math.cos(phi) * 0.9;
    const mixed = cyan.clone().lerp(index % 5 === 0 ? violet : ice, random() * 0.85);
    colors[index * 3] = mixed.r;
    colors[index * 3 + 1] = mixed.g;
    colors[index * 3 + 2] = mixed.b;
  }

  const pointsGeometry = track(new THREE.BufferGeometry());
  pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  pointsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const pointsMaterial = track(
    new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      sizeAttenuation: true,
    }),
  );
  const particles = new THREE.Points(pointsGeometry, pointsMaterial);
  scene.add(particles);

  const horizonMaterial = track(
    new THREE.MeshBasicMaterial({
      color: 0x7ad7ff,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
    }),
  );
  const horizon = new THREE.Mesh(track(new THREE.TorusGeometry(3.4, 0.005, 8, 96)), horizonMaterial);
  horizon.position.set(2.4, -1.7, -1.2);
  horizon.rotation.x = Math.PI / 2.05;
  scene.add(horizon);

  const look = new THREE.Vector3();
  const lookTarget = new THREE.Vector3();
  const cameraTarget = new THREE.Vector3();
  let smooth = 0;

  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const placeSatellites = (time: number) => {
    satellites.forEach((satellite, index) => {
      const angle = time * (0.32 + index * 0.07) + index * 1.4;
      const radius = 1.15 + index * 0.14;
      satellite.position.set(Math.cos(angle) * radius, Math.sin(angle * 0.85) * 0.42, Math.sin(angle) * radius * 0.32);
      satellite.rotation.y = angle;
    });
  };

  const frameScene = (time: number, progress: number, delta: number) => {
    smooth = THREE.MathUtils.damp(smooth, progress, options.animate ? 4.5 : 20, delta);
    cameraPath.getPointAt(smooth, cameraTarget);
    lookPath.getPointAt(smooth, lookTarget);
    camera.position.lerp(cameraTarget, options.animate ? 0.16 : 1);
    look.lerp(lookTarget, options.animate ? 0.16 : 1);
    camera.lookAt(look);

    const spin = options.animate ? time * 0.16 + smooth * 2.2 : 0.4;
    ico.rotation.y = spin;
    ico.rotation.x = options.animate ? Math.sin(time * 0.2) * 0.18 : 0.2;
    edges.rotation.copy(ico.rotation);
    ringA.rotation.z = options.animate ? time * 0.22 : 0.6;
    ringA.rotation.x = Math.PI / 2.35 + smooth * 0.35;
    ringB.rotation.y = options.animate ? time * 0.16 : 0.3;
    knot.rotation.y = options.animate ? time * 0.28 + smooth : 0.4;
    knot.rotation.x = smooth * 0.8;
    knotMaterial.opacity = Math.min(0.8, Math.max(0, (smooth - 0.18) * 1.6));
    particles.rotation.y = (options.animate ? time * 0.012 : 0) + smooth * 0.55;
    horizon.rotation.z = (options.animate ? time * 0.05 : 0) + smooth * 0.4;
    core.position.x = 2.7 + smooth * 1.35;
    core.position.y = 0.55 + Math.sin(smooth * Math.PI) * 0.35;
    core.scale.setScalar(0.82);
    placeSatellites(options.animate ? time : 0.8);
    renderer.render(scene, camera);
  };

  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(canvas.parentElement ?? canvas);

  let frame = 0;
  let running = options.animate;
  const startedAt = performance.now();
  let lastFrame = startedAt;

  const readProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return 0;
    return THREE.MathUtils.clamp(window.scrollY / max, 0, 1);
  };

  frameScene(0, options.animate ? readProgress() : 0, 1 / 60);

  const tick = () => {
    if (!running) return;
    frame = window.requestAnimationFrame(tick);
    const now = performance.now();
    const delta = Math.min((now - lastFrame) / 1000, 0.05);
    lastFrame = now;
    frameScene((now - startedAt) / 1000, readProgress(), delta);
  };

  if (options.animate) tick();

  const onVisibility = () => {
    if (!options.animate) return;
    if (document.hidden) {
      running = false;
      window.cancelAnimationFrame(frame);
      return;
    }
    if (!running) {
      running = true;
      lastFrame = performance.now();
      tick();
    }
  };
  document.addEventListener("visibilitychange", onVisibility);

  const onResize = () => {
    resize();
    if (!options.animate) frameScene(0, 0, 1 / 60);
  };
  window.addEventListener("resize", onResize);

  return () => {
    running = false;
    window.cancelAnimationFrame(frame);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("resize", onResize);
    observer.disconnect();
    disposables.forEach((item) => item.dispose());
    renderer.dispose();
  };
}
