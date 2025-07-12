document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form")
  const registerForm = document.getElementById("register-form")

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister)
  }
})

function handleLogin(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const email = formData.get("email")
  const password = formData.get("password")

  // Simple validation (in real app, this would be server-side)
  if (!email || !password) {
    alert("Please fill in all fields.")
    return
  }

  // Check if user exists (simplified - in real app, verify against database)
  const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    // Set login status
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("currentUser", JSON.stringify(user))

    // Redirect to home page
    window.location.href = "index.html"
  } else {
    alert("Invalid email or password.")
  }
}

function handleRegister(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const name = formData.get("name")
  const email = formData.get("email")
  const location = formData.get("location")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirm-password")

  // Validation
  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill in all required fields.")
    return
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.")
    return
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.")
    return
  }

  // Check if user already exists
  const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
  if (users.find((u) => u.email === email)) {
    alert("User with this email already exists.")
    return
  }

  // Create new user
  const newUser = {
    id: Date.now(),
    name,
    email,
    location: location || "",
    password,
    skillsOffered: [],
    skillsWanted: [],
    availability: [],
    isPublic: true,
    photo: null,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  localStorage.setItem("registeredUsers", JSON.stringify(users))

  // Auto-login after registration
  localStorage.setItem("isLoggedIn", "true")
  localStorage.setItem("currentUser", JSON.stringify(newUser))

  alert("Registration successful! Welcome to Skill Swap Platform.")
  window.location.href = "profile.html"
}
