
(() => {
  const risks = [
    { id: "R1", name: "Project delay", probability: 4, impact: 5 },
    { id: "R2", name: "Budget overrun", probability: 3, impact: 4 },
    { id: "R3", name: "Staff shortage", probability: 2, impact: 3 },
    { id: "R4", name: "Technical failure", probability: 5, impact: 5 },
    { id: "R5", name: "Supplier issues", probability: 1, impact: 5 },
    { id: "R6", name: "Service disruption", probability: 5, impact: 1 },
    { id: "R7", name: "Data loss", probability: 2, impact: 4 }
  ];

  let selectedRisk = null;

  function getRiskLevel(score) {
    if (score <= 3) return "Low";
    if (score <= 6) return "Medium";
    if (score <= 12) return "High";
    return "Critical";
  }

  function renderList() {
    const list = document.getElementById("risk-list");

    if (!list) return;

    list.innerHTML = "";

    risks.forEach(risk => {
      const button = document.createElement("button");

      button.className = "risk-item";
      button.textContent = risk.id + " – " + risk.name;

      button.addEventListener("click", () => {
        selectedRisk = risk;
        render();
      });

      list.appendChild(button);
    });
  }

  function renderMatrix() {
    const matrix = document.getElementById("risk-matrix");

    if (!matrix) return;

    matrix.innerHTML = "";
    matrix.classList.toggle("has-selection", selectedRisk !== null);

    const corner = document.createElement("div");
    corner.className = "matrix-cell axis";
    corner.textContent = "P / I";
    matrix.appendChild(corner);

    for (let impact = 1; impact <= 5; impact++) {
      const cell = document.createElement("div");

      cell.className = "matrix-cell axis";
      cell.textContent = impact;

      matrix.appendChild(cell);
    }

    for (let probability = 5; probability >= 1; probability--) {
      const label = document.createElement("div");

      label.className = "matrix-cell axis";
      label.textContent = probability;

      matrix.appendChild(label);

      for (let impact = 1; impact <= 5; impact++) {
        const score = probability * impact;
        const level = getRiskLevel(score);

        const cell = document.createElement("div");

        cell.className = "matrix-cell " + level.toLowerCase();
        cell.textContent = score;

        if (
          selectedRisk &&
          selectedRisk.probability === probability &&
          selectedRisk.impact === impact
        ) {
          cell.classList.add("selected");
        }

        matrix.appendChild(cell);
      }
    }
  }

  function renderInfo() {
    const info = document.getElementById("selected-info");

    if (!info) return;

    if (!selectedRisk) {
      info.textContent = "Wybierz ryzyko z listy.";
      return;
    }

    const score = selectedRisk.probability * selectedRisk.impact;
    const level = getRiskLevel(score);

    info.textContent =
      selectedRisk.id + " | " +
      selectedRisk.name +
      " | Probability: " + selectedRisk.probability +
      " | Impact: " + selectedRisk.impact +
      " | Score: " + score +
      " | Risk range: " + level;
  }

  function render() {
    document.querySelectorAll(".risk-item").forEach((button, index) => {
      button.classList.toggle("active", risks[index] === selectedRisk);
    });

    renderMatrix();
    renderInfo();
  }

  function init() {
    const list = document.getElementById("risk-list");
    const matrix = document.getElementById("risk-matrix");
    const info = document.getElementById("selected-info");

    // Sprawdzenie wymaganych elementów HTML
    if (!list || !matrix || !info) {
      console.error("Risk Register: Missing HTML elements.");
      return;
    }

    // Listener dodawany tylko jeden raz
    matrix.addEventListener("click", () => {
      matrix.classList.remove("has-selection");
    });

    renderList();
    renderMatrix();
    renderInfo();
  }

  // Bezpieczna inicjalizacja DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
