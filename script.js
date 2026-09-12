let subjectCount = 0;

const defaultSubjects = [
  { name: "Subject 1", grade: "10", credits: 3 },
  { name: "Subject 2", grade: "9", credits: 4 },
  { name: "Subject 3", grade: "8", credits: 3 },
  { name: "Subject 4", grade: "9", credits: 3 }
];

function addSubjectRow(name = "", gradeVal = "10", creditVal = "3") {
  subjectCount++;
  const container = document.getElementById("subjectList");
  const row = document.createElement("div");
  row.className = "subject-row";
  row.id = `sub-row-${subjectCount}`;

  row.innerHTML = `
    <input type="text" class="global-input sub-name" placeholder="Subject ${subjectCount}" value="${name}">
    <select class="global-select sub-grade" onchange="calculateGPA()">
      <option value="10" ${gradeVal === "10" ? "selected" : ""}>O / S (10)</option>
      <option value="9" ${gradeVal === "9" ? "selected" : ""}>A+ (9)</option>
      <option value="8" ${gradeVal === "8" ? "selected" : ""}>A (8)</option>
      <option value="7" ${gradeVal === "7" ? "selected" : ""}>B+ (7)</option>
      <option value="6" ${gradeVal === "6" ? "selected" : ""}>B (6)</option>
      <option value="5" ${gradeVal === "5" ? "selected" : ""}>C (5)</option>
      <option value="0" ${gradeVal === "0" ? "selected" : ""}>F (0)</option>
    </select>
    <input type="number" class="global-input sub-credit" value="${creditVal}" min="1" max="10" oninput="calculateGPA()">
    <button class="btn-remove" onclick="removeSubjectRow('sub-row-${subjectCount}')">×</button>
  `;

  container.appendChild(row);
}

function removeSubjectRow(rowId) {
  const row = document.getElementById(rowId);
  if (row) {
    row.remove();
    calculateGPA();
  }
}

function calculateGPA() {
  const grades = document.querySelectorAll(".sub-grade");
  const credits = document.querySelectorAll(".sub-credit");

  let totalPoints = 0;
  let totalCredits = 0;

  for (let i = 0; i < grades.length; i++) {
    const grade = parseFloat(grades[i].value);
    const credit = parseFloat(credits[i].value);

    if (!isNaN(grade) && !isNaN(credit) && credit > 0) {
      totalPoints += grade * credit;
      totalCredits += credit;
    }
  }

  if (totalCredits === 0) {
    document.getElementById("gpaResult").innerText = "0.00";
    document.getElementById("percentageResult").innerText = "0.00%";
    document.getElementById("totalCreditsResult").innerText = "0";
    return;
  }

  const gpa = totalPoints / totalCredits;
  const percentage = gpa * 9.5;

  document.getElementById("gpaResult").innerText = gpa.toFixed(2);
  document.getElementById("percentageResult").innerText = percentage.toFixed(2) + "%";
  document.getElementById("totalCreditsResult").innerText = totalCredits;
}

// Initial load
defaultSubjects.forEach(s => addSubjectRow(s.name, s.grade, s.credits));
calculateGPA();
