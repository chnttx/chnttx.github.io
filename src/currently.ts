type BookSpec = {
  height: number;
  width: number;
  color: string;
  accent: string;
};

type Book = BookSpec & {
  title: string;
  x: number;
  y: number;
};

type ShelfState = {
  y: number;
  height: number;
};

type WallState = {
  x: number;
  top: number;
  width: number;
};

type SceneState = {
  books: Book[];
  shelf: ShelfState;
  wall: WallState;
  width: number;
  height: number;
};

const canvas = document.getElementById("bookshelf");

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("Bookshelf canvas not found");
}

const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("2D context not available");
}

const titles = [
  "Algorithm Design Manual",
  "Designing Data-Intensive Applications",
  "Web Scalability for Startup Engineers",
  "Killing Commendatore",
  "Never Let Me Go",
];

const bookSpecs: BookSpec[] = [
  { height: 196, width: 44, color: "#c65a3f", accent: "#f1d2bf" },
  { height: 178, width: 38, color: "#e0b958", accent: "#3f2c15" },
  { height: 214, width: 46, color: "#5c8165", accent: "#f1efe9" },
  { height: 184, width: 40, color: "#4a6797", accent: "#e9edf6" },
  { height: 206, width: 44, color: "#b9896b", accent: "#2a2016" },
];

const state: SceneState = {
  books: [],
  shelf: { y: 0, height: 18 },
  wall: { x: 0, top: 0, width: 24 },
  width: 0,
  height: 0,
};

function createBooks() {
  ctx.font = "600 12px 'Ubuntu Nerd Font', sans-serif";
  state.books = bookSpecs.map((spec, index) => {
    const title = titles[index] ?? "Untitled";
    return {
      ...spec,
      title,
      x: 0,
      y: 0,
      height: Math.max(spec.height, ctx.measureText(title).width + 36),
    };
  });
}

function resize() {
  const rect = canvas.getBoundingClientRect();
  const width = Math.round(rect.width);
  const height = Math.max(240, Math.min(360, Math.round(width * 0.55)));
  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  state.width = width;
  state.height = height;
  state.shelf.y = height - 52;
  state.shelf.height = 18;
  state.wall.x = Math.max(26, Math.round(width * 0.08));
  const tallestBook = Math.max(...state.books.map((book) => book.height));
  state.wall.top = Math.max(12, Math.round(state.shelf.y - tallestBook - 14));

  layoutBooks();
  render();
}

function layoutBooks() {
  const gap = 0;
  let currentX = state.wall.x + state.wall.width;

  state.books.forEach((book, index) => {
    if (index === 0) {
      currentX = state.wall.x + state.wall.width;
    }
    book.x = currentX;
    book.y = state.shelf.y;
    currentX += book.width + gap;
  });
}

function drawWall() {
  const wallHeight = state.shelf.y - state.wall.top + state.shelf.height;
  const wallGradient = ctx.createLinearGradient(
    state.wall.x,
    state.wall.top,
    state.wall.x + state.wall.width,
    state.wall.top,
  );
  wallGradient.addColorStop(0, "#5c3a20");
  wallGradient.addColorStop(0.5, "#7a4d2b");
  wallGradient.addColorStop(1, "#4b2e18");

  ctx.save();
  ctx.fillStyle = wallGradient;
  ctx.shadowColor = "rgba(42, 32, 22, 0.25)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 3;
  ctx.fillRect(state.wall.x, state.wall.top, state.wall.width, wallHeight);
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i += 1) {
    const lineX = state.wall.x + 4 + i * 3;
    ctx.beginPath();
    ctx.moveTo(lineX, state.wall.top + 8);
    ctx.lineTo(lineX, state.wall.top + wallHeight - 8);
    ctx.stroke();
  }
  ctx.restore();
}

function drawShelf() {
  const { y, height } = state.shelf;
  const gradient = ctx.createLinearGradient(0, y, 0, y + height);
  gradient.addColorStop(0, "#8a5631");
  gradient.addColorStop(0.4, "#6f4023");
  gradient.addColorStop(1, "#5e351d");

  ctx.save();
  ctx.fillStyle = gradient;
  ctx.shadowColor = "rgba(42, 32, 22, 0.35)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 6;
  ctx.fillRect(24, y, state.width - 48, height);
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i += 1) {
    const grainY = y + 3 + i * 3;
    ctx.beginPath();
    ctx.moveTo(30, grainY);
    ctx.lineTo(state.width - 30, grainY);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBook(book: Book) {
  const { x, y, width, height, color, accent, title } = book;
  const tilt = 0;

  ctx.save();
  ctx.translate(x + width / 2, y);
  ctx.rotate(tilt);
  ctx.translate(-width / 2, -height);

  const spineGradient = ctx.createLinearGradient(0, 0, width, 0);
  spineGradient.addColorStop(0, shadeColor(color, -0.12));
  spineGradient.addColorStop(0.45, color);
  spineGradient.addColorStop(1, shadeColor(color, 0.1));

  ctx.fillStyle = spineGradient;
  ctx.shadowColor = "rgba(42, 32, 22, 0.25)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 6;
  ctx.fillRect(0, 0, width, height);

  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(20, 14, 10, 0.25)";
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
  ctx.fillRect(width * 0.12, 10, width * 0.08, height - 20);

  ctx.fillStyle = "rgba(10, 8, 6, 0.1)";
  ctx.fillRect(width * 0.72, 8, width * 0.08, height - 16);

  ctx.fillStyle = "#efe7da";
  ctx.fillRect(4, -6, width - 8, 8);
  ctx.strokeStyle = "rgba(42, 32, 22, 0.2)";
  ctx.strokeRect(4, -6, width - 8, 8);

  ctx.save();
  ctx.translate(width / 2, height * 0.55);
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = accent;
  ctx.font = "600 12px 'Ubuntu Nerd Font', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(title, -6, 0);
  ctx.restore();

  ctx.restore();
}

function shadeColor(hex: string, percent: number) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * (percent * 100));
  const r = clamp(((num >> 16) & 255) + amt, 0, 255);
  const g = clamp(((num >> 8) & 255) + amt, 0, 255);
  const b = clamp((num & 255) + amt, 0, 255);
  return `rgb(${r}, ${g}, ${b})`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function render() {
  ctx.clearRect(0, 0, state.width, state.height);
  drawWall();
  drawShelf();

  state.books.forEach((book) => {
    drawBook(book);
  });
}

function init() {
  createBooks();
  resize();
  window.addEventListener("resize", resize);
}

init();
