let scene, camera, renderer, avatar;
const canvas = document.getElementById("scene");

init();
loadAvatar();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.6, 3);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 10, 10);
  scene.add(light);

  animate();
  setBackground("space");
}

function animate() {
  requestAnimationFrame(animate);
  if (avatar) avatar.rotation.y += 0.002;
  renderer.render(scene, camera);
}

function loadAvatar() {
  const loader = new THREE.GLTFLoader();
  loader.load("https://models.readyplayer.me/64db43b69dfb3b001f3f5a55.glb", gltf => {
    avatar = gltf.scene;
    avatar.scale.set(1.5, 1.5, 1.5);
    scene.add(avatar);
  });
}

function setBackground(type) {
  const loader = new THREE.TextureLoader();
  let url = "";
  switch (type) {
    case "space": url = "https://threejs.org/examples/textures/space.jpg"; break;
    case "nature": url = "https://threejs.org/examples/textures/2294472375_24a3b8ef46_o.jpg"; break;
    case "city": url = "https://threejs.org/examples/textures/cube/Bridge2/posx.jpg"; break;
    case "hall": url = "https://threejs.org/examples/textures/2294472375_24a3b8ef46_o.jpg"; break;
  }
  loader.load(url, texture => {
    scene.background = texture;
  });
}

document.getElementById("backgroundSelector").addEventListener("change", e => {
  setBackground(e.target.value);
});

async function sendMessage() {
  const input = document.getElementById("userInput").value;
  if (!input) return;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input })
  });
  const data = await res.json();

  speakArabic(data.reply);
}

function speakArabic(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ar-SA";
  speechSynthesis.speak(utterance);
}

function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "ar-SA";
  recognition.start();
  recognition.onresult = e => {
    document.getElementById("userInput").value = e.results[0][0].transcript;
  };
}