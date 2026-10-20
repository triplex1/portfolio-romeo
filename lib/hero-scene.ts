import * as THREE from "three";

export function mountHeroScene(canvas: HTMLCanvasElement): () => void {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 80);
  camera.position.set(0.4, 0.15, 15.5);

  const group = new THREE.Group();
  // Sit in the right margin so the ring frames the portrait instead of crossing it.
  group.position.set(7.35, -0.45, 0);
  group.scale.setScalar(0.5);
  scene.add(group);

  const count = 420;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const copper = new THREE.Color("#e07a3d");
  const cream = new THREE.Color("#f4efe8");

  for (let index = 0; index < count; index += 1) {
    const radius = 1.7 + Math.random() * 2.4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.78;
    positions[index * 3 + 2] = radius * Math.cos(phi) * 0.85;
    const mixed = copper.clone().lerp(cream, Math.random() * 0.72);
    colors[index * 3] = mixed.r;
    colors[index * 3 + 1] = mixed.g;
    colors[index * 3 + 2] = mixed.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.13,
    vertexColors: true,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    sizeAttenuation: true,
  });
  group.add(new THREE.Points(geometry, material));

  const icoGeometry = new THREE.IcosahedronGeometry(2.15, 0);
  const icoMaterial = new THREE.MeshBasicMaterial({
    color: 0xe07a3d,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });
  const ico = new THREE.Mesh(icoGeometry, icoMaterial);
  group.add(ico);

  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffc48a });
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(icoGeometry), edgeMaterial);
  group.add(edges);

  const torusMaterial = new THREE.MeshBasicMaterial({
    color: 0xf4efe8,
    transparent: true,
    opacity: 0.85,
  });
  const torus = new THREE.Mesh(new THREE.TorusGeometry(3.15, 0.022, 12, 72), torusMaterial);
  torus.rotation.x = Math.PI / 2.6;
  group.add(torus);

  const pointer = { x: 0, y: 0 };

  const onPointerMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    pointer.x = THREE.MathUtils.clamp(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -1.25,
      1.25,
    );
    pointer.y = THREE.MathUtils.clamp(
      ((event.clientY - rect.top) / rect.height) * 2 - 1,
      -1.25,
      1.25,
    );
  };

  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(canvas.parentElement ?? canvas);
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  let frame = 0;
  let running = true;
  const clock = new THREE.Clock();

  const tick = () => {
    if (!running) return;
    frame = window.requestAnimationFrame(tick);
    const time = clock.getElapsedTime();
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, pointer.x * 1.05, 0.14);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointer.y * 0.7, 0.14);
    const spin = time * 0.08 + pointer.x * 1.8;
    const tilt = -pointer.y * 1.15;
    ico.rotation.y = spin;
    ico.rotation.x = tilt;
    edges.rotation.y = spin;
    edges.rotation.x = tilt;
    torus.rotation.y = time * 0.28 + pointer.x * 1.1;
    torus.rotation.x = Math.PI / 2.6 + pointer.y * 0.55;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 1.8, 0.07);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -pointer.y * 1.15, 0.07);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  };

  tick();

  const onVisibility = () => {
    if (document.hidden) {
      running = false;
      window.cancelAnimationFrame(frame);
      return;
    }
    if (!running) {
      running = true;
      clock.getDelta();
      tick();
    }
  };
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    running = false;
    window.cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("visibilitychange", onVisibility);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    icoGeometry.dispose();
    icoMaterial.dispose();
    edges.geometry.dispose();
    edgeMaterial.dispose();
    torus.geometry.dispose();
    torusMaterial.dispose();
    renderer.dispose();
  };
}
