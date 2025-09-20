const form = document.getElementById("ageForm");
const dobInput = document.getElementById("dob");
const errorDiv = document.getElementById("error");
const resultDiv = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");
const toggleBtn = document.createElement("button");

// Dark mode toggle
toggleBtn.className = "toggle-btn";
toggleBtn.innerHTML = "🌙";
document.querySelector(".nav-container").appendChild(toggleBtn);

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.innerHTML = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Age calculation
form.addEventListener("submit", function (e) {
  e.preventDefault();
  errorDiv.textContent = "";
  resultDiv.textContent = "";

  const dobValue = dobInput.value;
  if (!dobValue) {
    errorDiv.textContent = "⚠️ Please select your date of birth.";
    return;
  }

  const dob = new Date(dobValue);
  const today = new Date();

  if (dob > today) {
    errorDiv.textContent = "⚠️ Date of birth cannot be in the future.";
    return;
  }

  // Age Calculation
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  resultDiv.textContent = `🎉 You are ${years} years, ${months} months, and ${days} days old.`;
});

// Reset
resetBtn.addEventListener("click", () => {
  form.reset();
  errorDiv.textContent = "";
  resultDiv.textContent = "";
});
