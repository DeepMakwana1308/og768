document.addEventListener("DOMContentLoaded", () => {
  checkAuthStatus()
  loadProfile()
  setupEventListeners()
})

function checkAuthStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  if (!isLoggedIn) {
    window.location.href = "login.html"
    return
  }

  // Setup logout
  document.getElementById("logout-link").addEventListener("click", (e) => {
    e.preventDefault()
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("currentUser")
    window.location.href = "login.html"
  })
}

function loadProfile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

  // Populate form fields
  document.getElementById("name").value = currentUser.name || ""
  document.getElementById("location").value = currentUser.location || ""
  document.getElementById("public-profile").checked = currentUser.isPublic !== false

  // Load profile photo
  if (currentUser.photo) {
    const profilePhoto = document.getElementById("profile-photo")
    profilePhoto.innerHTML = `<img src="${currentUser.photo}" alt="Profile Photo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`
  }

  // Load skills
  loadSkills("offered", currentUser.skillsOffered || [])
  loadSkills("wanted", currentUser.skillsWanted || [])

  // Load availability
  const availability = currentUser.availability || []
  const checkboxes = document.querySelectorAll('input[name="availability"]')
  checkboxes.forEach((checkbox) => {
    checkbox.checked = availability.includes(checkbox.value)
  })
}

function loadSkills(type, skills) {
  const listId = type === "offered" ? "skills-offered-list" : "skills-wanted-list"
  const list = document.getElementById(listId)

  list.innerHTML = skills
    .map(
      (skill) => `
        <div class="skill-item">
            <span>${skill}</span>
            <button type="button" class="skill-remove" onclick="removeSkill('${type}', '${skill}')">×</button>
        </div>
    `,
    )
    .join("")
}

function setupEventListeners() {
  // Mobile menu
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const nav = document.querySelector(".nav")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      nav.classList.toggle("active")
    })
  }

  // Photo upload
  document.getElementById("upload-photo").addEventListener("click", () => {
    document.getElementById("photo-input").click()
  })

  document.getElementById("photo-input").addEventListener("change", (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const profilePhoto = document.getElementById("profile-photo")
        profilePhoto.innerHTML = `<img src="${e.target.result}" alt="Profile Photo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`
      }
      reader.readAsDataURL(file)
    }
  })

  // Add skills
  document.getElementById("add-skill-offered").addEventListener("click", () => {
    addSkill("offered")
  })

  document.getElementById("add-skill-wanted").addEventListener("click", () => {
    addSkill("wanted")
  })

  // Enter key for skill inputs
  document.getElementById("skill-offered-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill("offered")
    }
  })

  document.getElementById("skill-wanted-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill("wanted")
    }
  })

  // Form submission
  document.getElementById("profile-form").addEventListener("submit", saveProfile)

  // Discard changes
  document.getElementById("discard-btn").addEventListener("click", () => {
    if (confirm("Are you sure you want to discard your changes?")) {
      loadProfile()
    }
  })
}

function addSkill(type) {
  const inputId = type === "offered" ? "skill-offered-input" : "skill-wanted-input"
  const input = document.getElementById(inputId)
  const skill = input.value.trim()

  if (!skill) {
    alert("Please enter a skill.")
    return
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
  const skillsKey = type === "offered" ? "skillsOffered" : "skillsWanted"

  if (!currentUser[skillsKey]) {
    currentUser[skillsKey] = []
  }

  if (currentUser[skillsKey].includes(skill)) {
    alert("This skill is already added.")
    return
  }

  currentUser[skillsKey].push(skill)
  localStorage.setItem("currentUser", JSON.stringify(currentUser))

  loadSkills(type, currentUser[skillsKey])
  input.value = ""
}

function removeSkill(type, skill) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
  const skillsKey = type === "offered" ? "skillsOffered" : "skillsWanted"

  if (currentUser[skillsKey]) {
    currentUser[skillsKey] = currentUser[skillsKey].filter((s) => s !== skill)
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    loadSkills(type, currentUser[skillsKey])
  }
}

function saveProfile(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

  // Update basic info
  currentUser.name = formData.get("name")
  currentUser.location = formData.get("location")
  currentUser.isPublic = document.getElementById("public-profile").checked

  // Update availability
  const availability = []
  const checkboxes = document.querySelectorAll('input[name="availability"]:checked')
  checkboxes.forEach((checkbox) => {
    availability.push(checkbox.value)
  })
  currentUser.availability = availability

  // Update photo if changed
  const profilePhoto = document.querySelector("#profile-photo img")
  if (profilePhoto) {
    currentUser.photo = profilePhoto.src
  }

  // Save to localStorage
  localStorage.setItem("currentUser", JSON.stringify(currentUser))

  // Update registered users list
  const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
  const userIndex = users.findIndex((u) => u.id === currentUser.id)
  if (userIndex !== -1) {
    users[userIndex] = currentUser
    localStorage.setItem("registeredUsers", JSON.stringify(users))
  }

  alert("Profile saved successfully!")
}
