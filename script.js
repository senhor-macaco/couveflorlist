let levels = [];
const listEl = document.getElementById("list");
const addForm = document.getElementById("addForm");
const copyBtn = document.getElementById("copyJson");
const jsonPreview = document.getElementById("jsonPreview");


async function loadLevels() {
try {
const res = await fetch("levels.json", { cache: "no-store" });
levels = await res.json();
} catch (e) {
levels = [];
}
render();
}


function render() {
listEl.innerHTML = levels
.map((lvl, i) => cardFor(lvl, i + 1))
.join("");
}


function cardFor(lvl, rank) {
const victors = (lvl.victors || "").split(",").map(v => v.trim()).filter(Boolean);
return `
<article class="card">
<div class="rank">#${rank}</div>
<h3>${escape(lvl.name)}</h3>
<p><strong>Author:</strong> ${escape(lvl.author)}</p>
<p><strong>Id:</strong> ${escape(lvl.id)}</p>
<p><strong>Verifier:</strong> ${escape(lvl.verifier)}</p>
<p><strong>Victors:</strong> ${victors.length ? victors.map(escape).join(", ") : "Nenhum"}</p>
</article>
`;
}


function escape(s) {
return String(s).replace(/[&<>"']/g, c => ({
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;",
"'": "&#39;"
})[c]);
}



loadLevels();
