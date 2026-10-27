const $ = (selector) => document.querySelector(selector);

const state = {
  values: [38, 42, 39, 47, 44, 41, 42, 42],
  left: { heel: 36, mid: 29, forefoot: 68, toes: 31 },
  right: { heel: 52, mid: 27, forefoot: 43, toes: 25 },
  alerts: [],
  sampleNumber: 8,
  lastSample: Date.now(),
  responsePending: false
};

const THRESHOLD = 72;
const HIGH_THRESHOLD = 85;

function clamp(n, min = 0, max = 100) { return Math.max(min, Math.min(max, n)); }
function timeNow() { return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }
function randomBetween(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function allZones() {
  return [
    { name: "Left heel", key: "heel", foot: "left", value: state.left.heel },
    { name: "Left midfoot", key: "mid", foot: "left", value: state.left.mid },
    { name: "Left forefoot", key: "forefoot", foot: "left", value: state.left.forefoot },
    { name: "Left toes", key: "toes", foot: "left", value: state.left.toes },
    { name: "Right heel", key: "heel", foot: "right", value: state.right.heel },
    { name: "Right midfoot", key: "mid", foot: "right", value: state.right.mid },
    { name: "Right forefoot", key: "forefoot", foot: "right", value: state.right.forefoot },
    { name: "Right toes", key: "toes", foot: "right", value: state.right.toes }
  ];
}
function getPeak(zones = allZones()) { return zones.reduce((max, zone) => zone.value > max.value ? zone : max, zones[0]); }
function getIndex() {
  const zones = allZones();
  return Math.round(zones.reduce((sum, zone) => sum + zone.value, 0) / zones.length);
}
function getConcern() {
  const peak = getPeak();
  if (peak.value >= HIGH_THRESHOLD) return { level: "high", label: "HIGH DEMO FLAG", headline: "Elevated hotspot detected", description: `${peak.name} is above the high demo threshold. Review the pattern; this is not a diagnosis.`, score: "High" };
  if (peak.value >= THRESHOLD) return { level: "elevated", label: "REVIEW PATTERN", headline: "A zone needs review", description: `${peak.name} is above the demo review threshold. Check repeat readings before interpreting the pattern.`, score: "Review" };
  return { level: "low", label: "LOW CONCERN", headline: "No high zone flagged", description: "Current simulated readings are below the demo alert threshold.", score: "Low" };
}
function setText(selector, value) { const el = $(selector); if (el) el.textContent = value; }

function renderHeatmap() {
  const map = [
    { id: "#leftFoot", data: state.left },
    { id: "#rightFoot", data: state.right }
  ];
  map.forEach(({ id, data }) => {
    const foot = $(id);
    const levels = [
      ["heel", ".spot-heel"], ["mid", ".spot-mid"], ["forefoot", ".spot-ball"], ["toes", ".spot-toe"]
    ];
    levels.forEach(([key, selector]) => {
      const spot = foot.querySelector(selector);
      const value = data[key];
      let color = "#48c6dc";
      if (value >= HIGH_THRESHOLD) color = "#e85c5c";
      else if (value >= THRESHOLD) color = "#f59b48";
      else if (value >= 50) color = "#f5c74e";
      else if (value >= 30) color = "#7ad8b2";
      spot.style.background = color;
      spot.style.opacity = String(0.35 + value / 150);
      spot.style.transform = `scale(${0.8 + value / 180})`;
      spot.title = `${key}: demo index ${value}`;
    });
  });
  const leftPeak = getPeak(allZones().filter(z => z.foot === "left"));
  const rightPeak = getPeak(allZones().filter(z => z.foot === "right"));
  setText("#leftPeak", `${leftPeak.key === "forefoot" ? "Forefoot" : leftPeak.key[0].toUpperCase() + leftPeak.key.slice(1)} · ${leftPeak.value}`);
  setText("#rightPeak", `${rightPeak.key === "forefoot" ? "Forefoot" : rightPeak.key[0].toUpperCase() + rightPeak.key.slice(1)} · ${rightPeak.value}`);
}

function renderZones() {
  const zones = allZones().sort((a, b) => b.value - a.value).slice(0, 4);
  $("#zoneList").innerHTML = zones.map(zone => {
    const level = zone.value >= HIGH_THRESHOLD ? "high" : zone.value >= THRESHOLD ? "high" : zone.value >= 50 ? "moderate" : "low";
    const label = level === "high" ? "Elevated" : level === "moderate" ? "Moderate" : "Low";
    return `<div class="zone-row"><span class="zone-marker ${level}"></span><span class="zone-name">${zone.name}</span><strong>${zone.value}</strong><span class="zone-status">${label}</span></div>`;
  }).join("");
}

function renderRisk() {
  const concern = getConcern();
  const peak = getPeak();
  const index = getIndex();
  setText("#pressureIndex", index);
  setText("#highZones", allZones().filter(z => z.value >= THRESHOLD).length);
  setText("#pressureStatus", concern.level === "low" ? "Within demo range" : "Review simulated readings");
  setText("#riskScore", concern.score);
  setText("#riskTag", concern.label);
  setText("#riskHeadline", concern.headline);
  setText("#riskDescription", concern.description);
  const tag = $("#riskTag");
  tag.className = "risk-tag" + (concern.level === "elevated" ? " elevated" : concern.level === "high" ? " high" : "");
  const color = concern.level === "high" ? "#e85c5c" : concern.level === "elevated" ? "#f5b63f" : "#20b486";
  $("#riskMeter").style.background = `conic-gradient(${color} ${clamp(peak.value)}%, #e8f0f6 ${clamp(peak.value)}% 100%)`;
  renderZones();
}

function renderChart() {
  const values = state.values.slice(-8);
  const width = 600, height = 180, padX = 8, padY = 8;
  const xStep = (width - padX * 2) / Math.max(1, values.length - 1);
  const points = values.map((v, i) => {
    const x = padX + i * xStep;
    const y = height - padY - (clamp(v) / 100) * (height - padY * 2);
    return [x, y];
  });
  const pointString = points.map(p => p.join(",")).join(" ");
  $("#chartLine").setAttribute("points", pointString);
  $("#chartArea").setAttribute("d", `M ${points[0][0]} ${height} L ${points.map(p => p.join(" ")).join(" L ")} L ${points[points.length - 1][0]} ${height} Z`);
  $("#chartPoints").innerHTML = points.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === points.length - 1 ? 5 : 3}" fill="${i === points.length - 1 ? "#fff" : "#3979e8"}" stroke="#3979e8" stroke-width="2"></circle>`).join("");
  const labels = values.map((_, i) => i === values.length - 1 ? "Now" : `S${Math.max(1, state.sampleNumber - values.length + i + 1)}`);
  $("#chartLabels").innerHTML = labels.map(label => `<span>${label}</span>`).join("");
  const diff = values[values.length - 1] - values[0];
  setText("#trendSummary", Math.abs(diff) < 8 ? "Relatively stable in demo" : diff > 0 ? "Index has increased" : "Index has decreased");
}

function addActivity(title, description, type = "info") {
  state.alerts.unshift({ title, description, type, time: timeNow() });
  if (state.alerts.length > 8) state.alerts.length = 8;
  renderActivity();
}
function renderActivity() {
  setText("#alertTotal", state.alerts.length);
  setText("#navAlertCount", state.alerts.length);
  if (!state.alerts.length) {
    $("#activityList").innerHTML = `<div class="empty-state"><span class="empty-icon">✓</span><strong>No alerts yet</strong><p>Simulate a reading to generate activity.</p></div>`;
    return;
  }
  $("#activityList").innerHTML = state.alerts.map(item => {
    const symbol = item.type === "warning" ? "!" : item.type === "success" ? "✓" : "i";
    return `<div class="activity-item"><span class="activity-symbol ${item.type === "success" ? "success" : item.type === "info" ? "info" : ""}">${symbol}</span><div class="activity-copy"><strong>${item.title}</strong><p>${item.description}</p></div><span class="activity-time">${item.time}</span></div>`;
  }).join("");
}
function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(toast.timeout);
  toast.timeout = setTimeout(() => element.classList.remove("show"), 2600);
}

function updateDashboard() {
  renderHeatmap();
  renderRisk();
  renderChart();
  setText("#lastSample", timeNow());
}
function simulateReading() {
  state.sampleNumber += 1;
  // Most samples vary moderately; occasionally generate a higher hotspot to demonstrate alert handling.
  const createHotspot = Math.random() < 0.35;
  const target = Math.random() < 0.5 ? state.left : state.right;
  const zoneKeys = ["heel", "mid", "forefoot", "toes"];
  zoneKeys.forEach(key => {
    target[key] = clamp(target[key] + randomBetween(-13, 13), 12, 95);
  });
  if (createHotspot) {
    const key = zoneKeys[Math.floor(Math.random() * zoneKeys.length)];
    target[key] = randomBetween(THRESHOLD + 1, 94);
  }
  const index = getIndex();
  state.values.push(index);
  state.values = state.values.slice(-8);
  state.lastSample = Date.now();
  state.responsePending = true;
  setText("#sampleMode", "Simulated sensor sample");
  updateDashboard();
  const concern = getConcern();
  if (concern.level !== "low") {
    addActivity("Pressure pattern flagged", `${getPeak().name} reached a demo index of ${getPeak().value}. Review the trend; this is not a medical diagnosis.`, "warning");
    toast("A demo pressure pattern was flagged.");
  } else {
    addActivity("New simulated reading", `Combined pressure index is ${index}. No zone crossed the demo review threshold.`, "info");
    toast("New simulated reading generated.");
  }
  $("#respondStep").classList.remove("complete");
  $("#verifyStep").classList.remove("complete");
  $("#respondStep .step-state").textContent = "Ready";
  $("#verifyStep .step-state").textContent = "Pending";
  $("#responseResult").innerHTML = `<span class="result-icon">↗</span><div><strong>Reading captured</strong><p>Current index is ${index}. Run the response simulation to compare a new sample.</p></div>`;
}
function simulateResponse() {
  const before = getIndex();
  $("#respondStep").classList.add("complete");
  $("#respondStep .step-state").textContent = "Simulated";
  // Demonstration-only change: lower a selected hotspot; not a real physical intervention.
  const peak = getPeak();
  const data = peak.foot === "left" ? state.left : state.right;
  data[peak.key] = clamp(data[peak.key] - randomBetween(8, 18), 10, 100);
  state.sampleNumber += 1;
  const after = getIndex();
  state.values.push(after);
  state.values = state.values.slice(-8);
  updateDashboard();
  $("#verifyStep").classList.add("complete");
  $("#verifyStep .step-state").textContent = "Compared";
  const change = before - after;
  const resultText = change > 0 ? `Demo index changed from ${before} to ${after} (down ${change} points).` : change < 0 ? `Demo index changed from ${before} to ${after} (up ${Math.abs(change)} points).` : `Demo index remained at ${after}.`;
  $("#responseResult").innerHTML = `<span class="result-icon">✓</span><div><strong>Verification sample recorded</strong><p>${resultText} This is a software simulation, not a real offloading effect.</p></div>`;
  addActivity("Response and verification simulated", resultText, "success");
  toast("Response simulation complete.");
  state.responsePending = false;
}
function resetDemo() {
  state.values = [38, 42, 39, 47, 44, 41, 42, 42];
  state.left = { heel: 36, mid: 29, forefoot: 68, toes: 31 };
  state.right = { heel: 52, mid: 27, forefoot: 43, toes: 25 };
  state.alerts = [];
  state.sampleNumber = 8;
  state.responsePending = false;
  $("#respondStep").classList.remove("complete");
  $("#verifyStep").classList.remove("complete");
  $("#respondStep .step-state").textContent = "Ready";
  $("#verifyStep .step-state").textContent = "Pending";
  $("#responseResult").innerHTML = `<span class="result-icon">↗</span><div><strong>Ready to run demo</strong><p>Generate a reading, then simulate a response to compare sample values.</p></div>`;
  setText("#sampleMode", "Simulated sensor sample");
  updateDashboard();
  renderActivity();
  toast("Demo reset to starting values.");
}

$("#simulateButton").addEventListener("click", simulateReading);
$("#responseButton").addEventListener("click", simulateResponse);
$("#resetButton").addEventListener("click", resetDemo);
$("#clearAlerts").addEventListener("click", () => { state.alerts = []; renderActivity(); toast("Activity history cleared."); });
$("#menuButton").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", () => $("#sidebar").classList.remove("open")));

updateDashboard();
renderActivity();
