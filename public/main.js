const lines = ["Initializing system...", "Loading assets...", "Welcome!..."];

let i = 0;
const bootLine = document.getElementById("boot-line");

function typeNextLine(callback) {
  if (i >= lines.length) {
    if (callback) callback();
    return;
  }

  let text = lines[i];
  let j = 0;
  const interval = setInterval(() => {
    bootLine.textContent = text.substring(0, j++);
    if (j > text.length) {
      clearInterval(interval);
      i++;
      setTimeout(() => typeNextLine(callback), 400);
    }
  }, 40);
}

window.addEventListener("load", () => {
  typeNextLine(() => {
    const loader = document.getElementById("custom-loader");
    loader.classList.add("hidden");

    const canvasContainer = document.getElementById("canvas-container");
    if (canvasContainer) {
      canvasContainer.style.opacity = "1";
      canvasContainer.style.transform = "translateX(0) scale(1)";
    }

    const introCont = document.querySelector(".intro .cont");
    if (introCont) {
      introCont.style.opacity = "1";
      introCont.style.transform = "translateX(0) scale(1)";
    }

    const introItems = document.querySelectorAll(".intro .animate");
    introItems.forEach((el, idx) => {
      el.style.setProperty("--order", idx);
      setTimeout(() => el.classList.add("active"), idx * 100);
    });
  });
});

/*============================================Responsive Navbar ========================================*/
const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn  i");
const dropDownMenu = document.querySelector(".dropdown_menu");
toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle("open");
  const isOpen = dropDownMenu.classList.contains("open");

  toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};
/*============================================Scroll Animation========================================*/
document.addEventListener("DOMContentLoaded", () => {
  function animate() {
    const reveals = document.querySelectorAll(".animate");
    const windowHeight = window.innerHeight + 60;

    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop + 200 < windowHeight) {
        reveal.classList.add("active");
      } else {
        reveal.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", animate);

  let lastScroll = 0;
  let ticking = false;
  document.addEventListener(
    "scroll",
    function () {
      lastScroll = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = document.querySelectorAll("section");
          const navLinks = document.querySelectorAll(
            ".navbar .links a, .dropdown_menu a"
          );

          sections.forEach((section) => {
            const sectionRect = section.getBoundingClientRect();

            if (
              sectionRect.top < window.innerHeight &&
              sectionRect.bottom > 0
            ) {
              navLinks.forEach((link) => link.classList.remove("active"));

              const activeLink = document.querySelectorAll(
                `.navbar .links a[href="#${section.id}"], .dropdown_menu a[href="#${section.id}"]`
              );

              activeLink.forEach((link) => link.classList.add("active"));
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  animate();
});

/*====================================================Nav background change================================*/
const navbar = document.querySelector(".navbar");
window.onscroll = () => {
  if (window.scrollY > 100) {
    navbar.classList.add("nav");
  } else {
    navbar.classList.remove("nav");
  }
};

/*==============================================Back to top on restart==================================*/

window.onbeforeunload = function () {
  if (window.scrollTo) window.scrollTo(0, 0);
};
if (history && history.scrollRestoration) history.scrollRestoration = "manual";

/*================================About links============================================*/
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

/*8=============================================Word Typing========================================*/
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 150;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 400;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

document.getElementById("loadMore").addEventListener("click", function () {
  const hiddenCards = document.querySelectorAll(".card.hidden");
  for (let i = 0; i < 3 && i < hiddenCards.length; i++) {
    hiddenCards[i].classList.remove("hidden");
  }
  if (document.querySelectorAll(".card.hidden").length === 0) {
    this.style.display = "none";
  }
});
/*8=============================================Bubbles========================================*/
const wrapper = document.querySelector(".wrapper");
const bubbleCount = 35;

for (let i = 0; i < bubbleCount; i++) {
  const bubble = document.createElement("div");

  const randomDuration = (Math.random() * 10 + 5).toFixed(2);
  const randomDelay = (Math.random() * 5).toFixed(2) + "s";
  const randomTop = (Math.random() * 95).toFixed(2) + "%";
  const randomLeft = (Math.random() * 95).toFixed(2) + "%";
  const randomSize = (Math.random() * 70 + 50).toFixed(0) + "px";
  const randomDirection = Math.random() > 0.5 ? "normal" : "reverse";
  const randomColor = `hsl(${Math.random() * 360}, 100%, ${
    Math.random() * 50 + 30
  }%)`;
  const randomOpacity = (Math.random() * 0.4 + 0.2).toFixed(2); 
  bubble.style.opacity = randomOpacity;
  const r1 = Math.floor(Math.random() * 75);
  const randomRadius = `${r1}%`;

  bubble.style.setProperty("--radius", randomRadius);
  bubble.style.setProperty("--i", randomDuration);
  bubble.style.setProperty("--top", randomTop);
  bubble.style.setProperty("--left", randomLeft);
  bubble.style.borderRadius = randomRadius;
  bubble.style.width = randomSize;
  bubble.style.height = randomSize;
  bubble.style.border = `2px solid ${randomColor}`;
  bubble.style.animationDelay = randomDelay;
  bubble.style.animationDirection = randomDirection;

  wrapper.appendChild(bubble);
}

/*8============================================Parallax Effects========================================*/
function parallaxShapes() {
  const scrollY = window.scrollY;
  const maxScale = 2.2;
  const maxScroll = window.innerHeight * 3;
  function getScale(mult = 1) {
    return 1 + Math.min((scrollY * mult) / maxScroll, maxScale - 1);
  }

  const shape1 = document.querySelector(".shape1");
  const shape2 = document.querySelector(".shape2");
  const shape3 = document.querySelector(".shape3");
  if (shape1)
    shape1.style.transform = `translate3d(0,${
      scrollY * 0.125
    }px,0) scale(${getScale(0.5)})`;
  if (shape2)
    shape2.style.transform = `translate3d(0,${
      scrollY * 0.55
    }px,0) scale(${getScale(1.1)})`;
  if (shape3)
    shape3.style.transform = `translate3d(0,${
      scrollY * 0.3
    }px,0) scale(${getScale(0.3)})`;
  const expShape1 = document.querySelector(".exp-shape1");
  const expShape2 = document.querySelector(".exp-shape2");
  const expShape3 = document.querySelector(".exp-shape3");
  function expScale(mult = 1) {
    const expSection = expShape1 ? expShape1.parentElement : null;
    if (!expSection) return 1;
    const sectionTop = expSection.offsetTop;
    const sectionScroll = Math.max(0, scrollY - sectionTop);
    return 1 + Math.min((sectionScroll * mult) / maxScroll, maxScale - 1);
  }

  if (expShape1)
    expShape1.style.transform = `translate3d(0,${
      (scrollY - expShape1.parentElement.offsetTop) * 0.25
    }px,0) scale(${expScale(0.5)})`;
  if (expShape2)
    expShape2.style.transform = `translate3d(0,${
      (scrollY - expShape2.parentElement.offsetTop) * 0.5
    }px,0) scale(${expScale(0.7)})`;
  if (expShape3)
    expShape3.style.transform = `translate3d(0,${
      (scrollY - expShape3.parentElement.offsetTop) * 0.15
    }px,0) scale(${expScale(0.3)})`;

  requestAnimationFrame(parallaxShapes);
}
requestAnimationFrame(parallaxShapes);
/*8============================================Cube ========================================*/
const container = document.getElementById("canvas-container");
const scene = new THREE.Scene();
const isMobile = window.innerWidth <= 900;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0); 
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.minDistance = 3;
controls.maxDistance = 20;
controls.enableZoom = false;

scene.add(new THREE.AmbientLight(0x404060, 1.2));

const dirLight = new THREE.DirectionalLight(0x00ffff, 1);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

scene.add(new THREE.HemisphereLight(0x222244, 0x000000, 0.4));

scene.environment = null; 

const cubeSize = 2.1;
const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: "#111122",
  metalness: 0.85,
  roughness: 0.1,
  emissive: "#004466",
  emissiveIntensity: 0.18,
  envMap: null,
  envMapIntensity: 0,
  side: THREE.DoubleSide,
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

function createCircuitGrid(size, divisions) {
  const group = new THREE.Group();
  const baseMaterial = new THREE.LineBasicMaterial({
    color: "#00ffff",
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  for (let i = 0; i <= divisions; i++) {
    const pos = (i * size) / divisions - size / 2;

    const hLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-size / 2, pos, 0),
        new THREE.Vector3(size / 2, pos, 0),
      ]),
      baseMaterial.clone()
    );
    group.add(hLine);

    const vLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(pos, size / 2, 0),
        new THREE.Vector3(pos, -size / 2, 0),
      ]),
      baseMaterial.clone()
    );
    group.add(vLine);
  }

  return group;
}

const divisions = 8;
const offset = cubeSize / 2 + 0.01;
const faceConfigs = [
  { pos: [0, 0, offset], rot: [0, 0, 0] },
  { pos: [0, 0, -offset], rot: [0, Math.PI, 0] },
  { pos: [-offset, 0, 0], rot: [0, -Math.PI / 2, 0] },
  { pos: [offset, 0, 0], rot: [0, Math.PI / 2, 0] },
  { pos: [0, offset, 0], rot: [-Math.PI / 2, 0, 0] },
  { pos: [0, -offset, 0], rot: [Math.PI / 2, 0, 0] },
];

faceConfigs.forEach(({ pos, rot }) => {
  const grid = createCircuitGrid(cubeSize, divisions);
  grid.position.set(...pos);
  grid.rotation.set(...rot);
  cube.add(grid);
});

const fontLoader = new THREE.FontLoader();
const snippets = [
  `function Button({label}) {\n return <button>\n {label} </button>;\n}`,
  `app.post("/api",\n async (req, res) => {\n  const data = \n   await db.save(req.body);\n  res.json(data);\n});`,
  `pipeline {\n  stages {\n    stage('Build') {\n      steps { sh 'npm run' }\n    }\n  }\n}`,
  `+ feat: Add auth middleware\n- fix: Remove all logs\n+ test: Add new unit tests\n+ docs: Update README\n`,
  `test("adds numbers", () => {\n  expect(sum(2, 2))\n .toBe(4);\n});`,
  `useEffect(() => {\n  fetch("/api/data")\n    .then(r => r.json())\n    .then(setData);\n}, []);`,
];

const snippetMeshes = [];
fontLoader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
  (font) => {
    const centers = faceConfigs.map(({ pos }) =>
      new THREE.Vector3(...pos).multiplyScalar(1.1)
    );

    snippets.forEach((text, idx) => {
      const textGeo = new THREE.TextGeometry(text, {
        font,
        size: 0.11,
        height: 0.02,
        curveSegments: 6,
      });
      textGeo.computeBoundingBox();
      textGeo.center();

      const bbox = textGeo.boundingBox;
      const width = bbox.max.x - bbox.min.x;
      const height = bbox.max.y - bbox.min.y;

      const textMaterial = new THREE.MeshBasicMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0,
      });

      const textMesh = new THREE.Mesh(textGeo, textMaterial);
      textMesh.position.copy(centers[idx]);
      const lookDir = new THREE.Vector3().copy(textMesh.position).normalize();
      textMesh.lookAt(lookDir);
      if (idx === 1 || idx === 2) textMesh.rotateY(Math.PI);

      const bgPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(width * 1.1, height * 1.3),
        new THREE.MeshBasicMaterial({
          color: "#00ffff",
          opacity: 0,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
        })
      );
      bgPlane.position.copy(textMesh.position);
      bgPlane.lookAt(lookDir);
      if (idx === 1 || idx === 2) bgPlane.rotateY(Math.PI);

      cube.add(bgPlane);
      cube.add(textMesh);
      snippetMeshes.push({ text: textMesh, panel: bgPlane });
    });

    unlockNextSnippet();
  }
);

const glowMaterial = new THREE.MeshBasicMaterial({ color: "#00ffff" });
const sphereGeometry = new THREE.SphereGeometry(0.06, 16, 16);

const glowSpheres = [];
const orbitRadius = 2.5;

for (let plane = 0; plane < 3; plane++) {
  for (let i = 0; i < 6; i++) {
    const sphere = new THREE.Mesh(sphereGeometry, glowMaterial);
    scene.add(sphere);
    glowSpheres.push({
      mesh: sphere,
      orbitPlane: plane,
      index: i,
      speed: 0.002 + 0.001 * plane,
      t: i / 6,
    });
  }
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hovered = false;
let shownSnippetsCount = 0;

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function unlockNextSnippet() {
  if (shownSnippetsCount >= snippetMeshes.length) return;

  const { text, panel } = snippetMeshes[shownSnippetsCount];
  let opacity = 0;

  function fadeIn() {
    opacity += 0.02;
    text.material.opacity = Math.min(1, opacity);
    panel.material.opacity = Math.min(0.1, opacity * 0.1);
    if (opacity < 1) requestAnimationFrame(fadeIn);
  }
  fadeIn();

  shownSnippetsCount++;
  setTimeout(unlockNextSnippet, 2000);
}

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.002;
  cube.rotation.y += 0.003;
  cube.children.forEach((child) => {
    if (child.type === "Group") {
      child.children.forEach((line) => {
        line.material.opacity =
          0.5 + 0.5 * Math.sin(Date.now() * 0.002 + line.id);
        line.material.needsUpdate = true;
      });
    }
  });
  
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(cube);

  if (intersects.length > 0) {
    if (!hovered) {
      hovered = true;
      cubeMaterial.emissiveIntensity = 0.6;
      cube.scale.set(1.05, 1.05, 1.05);
      if (shownSnippetsCount === 0) unlockNextSnippet();
    }
  } else if (hovered) {
    hovered = false;
    cubeMaterial.emissiveIntensity = 0.18;
    cube.scale.set(1, 1, 1);
  }

  controls.update();
  renderer.render(scene, camera);
}

const scaleFactor = 300;

function resizeRenderer() {
  const box = new THREE.Box3().setFromObject(cube);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  box.getSize(size);
  box.getCenter(center);

  renderer.setSize(size.x * scaleFactor, size.y * scaleFactor);
  container.style.width = `${size.x * scaleFactor}px`;
  container.style.height = `${size.y * scaleFactor}px`;
  if (isMobile) {
    controls.enableRotate = false;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.touches = {
      ONE: THREE.TOUCH.NONE,
      TWO: THREE.TOUCH.NONE,
    };
    renderer.domElement.style.pointerEvents = "none";
  } else {
    controls.enableRotate = true;
    renderer.domElement.style.pointerEvents = "auto";
  }
  camera.aspect = size.x / size.y;
  camera.position.set(center.x + 4, center.y + 4, center.z + 4);
  camera.lookAt(center);
  camera.updateProjectionMatrix();
}


resizeRenderer();
animate();
