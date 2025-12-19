const form = document.getElementById("course-form");
const errorDiv = document.getElementById("error");
const successDiv = document.getElementById("success");

let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const studentId = document.getElementById("studentId").value.trim();

  errorDiv.textContent = "";
  successDiv.textContent = "";

  if (!name || name.split(" ").length < 2) {
    errorDiv.textContent = "Please enter your full name (first and last name).";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorDiv.textContent = "Please enter a valid email address.";
    return;
  }

  const idRegex = /^900\d{6}$/;
  if (!idRegex.test(studentId)) {
    errorDiv.textContent = "Student ID must start with 900 and have exactly 6 digits after it.";
    return;
  }

  const duplicate = registrations.find(r => r.email === email || r.studentId === studentId);
  if (duplicate) {
    errorDiv.textContent = "You have already registered for this course.";
    return;
  }

  const registrationData = { name, email, studentId, course: "CSCE450201" };
  registrations.push(registrationData);
  localStorage.setItem("registrations", JSON.stringify(registrations));

  successDiv.textContent = `Success! ${name} has been registered for CSCE450201.`;

  form.reset();
  document.getElementById("name").focus();
});
