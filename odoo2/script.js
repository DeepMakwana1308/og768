// Enhanced sample data with more users and features
const users = [
  {
    id: 1,
    name: "Mike Johnson",
    location: "New York",
    photo: null,
    skillsOffered: ["JavaScript", "React", "Node.js"],
    skillsWanted: ["Python", "Machine Learning"],
    availability: ["weekends"],
    isPublic: true,
    rating: 4.5,
    level: "advanced",
    badges: ["verified", "top-rated"],
    joinDate: "2023-01-15",
    completedSwaps: 25,
    isOnline: true,
  },
  {
    id: 2,
    name: "Michelle Chen",
    location: "London",
    photo: null,
    skillsOffered: ["Python", "Data Science", "SQL"],
    skillsWanted: ["JavaScript", "Web Design"],
    availability: ["evenings", "weekends"],
    isPublic: true,
    rating: 4.8,
    level: "expert",
    badges: ["verified", "mentor"],
    joinDate: "2022-11-20",
    completedSwaps: 42,
    isOnline: true,
  },
  {
    id: 3,
    name: "Mayank Patel",
    location: "Tokyo",
    photo: null,
    skillsOffered: ["Photoshop", "UI/UX Design", "Figma"],
    skillsWanted: ["React", "Frontend Development"],
    availability: ["flexible"],
    isPublic: true,
    rating: 4.2,
    level: "intermediate",
    badges: ["creative"],
    joinDate: "2023-03-10",
    completedSwaps: 18,
    isOnline: false,
  },
  {
    id: 4,
    name: "Sarah Chen",
    location: "New York",
    photo: null,
    skillsOffered: ["Excel", "Data Analysis", "PowerBI"],
    skillsWanted: ["Python", "SQL"],
    availability: ["weekends"],
    isPublic: true,
    rating: 4.6,
    level: "intermediate",
    badges: ["verified"],
    joinDate: "2023-02-05",
    completedSwaps: 15,
    isOnline: true,
  },
  {
    id: 5,
    name: "Alex Johnson",
    location: "London",
    photo: null,
    skillsOffered: ["Guitar", "Music Theory", "Songwriting"],
    skillsWanted: ["Piano", "Music Production"],
    availability: ["evenings"],
    isPublic: true,
    rating: 4.3,
    level: "advanced",
    badges: ["creative", "mentor"],
    joinDate: "2022-12-01",
    completedSwaps: 30,
    isOnline: true,
  },
  {
    id: 6,
    name: "Emma Wilson",
    location: "Tokyo",
    photo: null,
    skillsOffered: ["French", "Spanish", "Translation"],
    skillsWanted: ["Japanese", "Korean"],
    availability: ["flexible"],
    isPublic: true,
    rating: 4.7,
    level: "expert",
    badges: ["verified", "polyglot"],
    joinDate: "2022-09-15",
    completedSwaps: 38,
    isOnline: false,
  },
  {
    id: 7,
    name: "Marcus Thompson",
    location: "Paris",
    photo: null,
    skillsOffered: ["Photography", "Video Editing", "Adobe Premiere"],
    skillsWanted: ["3D Modeling", "Blender"],
    availability: ["weekends", "evenings"],
    isPublic: true,
    rating: 4.4,
    level: "advanced",
    badges: ["creative", "verified"],
    joinDate: "2023-01-20",
    completedSwaps: 22,
    isOnline: true,
  },
  {
    id: 8,
    name: "Maria Rodriguez",
    location: "Berlin",
    photo: null,
    skillsOffered: ["German", "English Teaching", "IELTS Prep"],
    skillsWanted: ["Web Development", "CSS"],
    availability: ["flexible"],
    isPublic: true,
    rating: 4.9,
    level: "expert",
    badges: ["verified", "top-rated", "mentor"],
    joinDate: "2022-08-10",
    completedSwaps: 55,
    isOnline: true,
  },
]

// Trending skills data
const trendingSkills = [
  { name: "AI/Machine Learning", icon: "fas fa-robot", demand: "High Demand", growth: "+45%" },
  { name: "React Development", icon: "fab fa-react", demand: "Very High", growth: "+38%" },
  { name: "Data Science", icon: "fas fa-chart-line", demand: "High Demand", growth: "+42%" },
  { name: "UI/UX Design", icon: "fas fa-palette", demand: "Growing", growth: "+35%" },
  { name: "Python Programming", icon: "fab fa-python", demand: "Very High", growth: "+40%" },
  { name: "Digital Marketing", icon: "fas fa-bullhorn", demand: "Growing", growth: "+28%" },
]

// Global variables
let currentPage = 1
const usersPerPage = 6
let filteredUsers = [...users]
let currentView = "grid"
const searchSuggestionsList = []

// DOM elements
const usersGrid = document.getElementById("users-grid")
const searchInput = document.getElementById("search-input")
const searchSuggestionsContainer = document.getElementById("search-suggestions")
const searchBtn = document.getElementById("search-btn")
const locationFilter = document.getElementById("location-filter")
const availabilityFilter = document.getElementById("availability-filter")
const levelFilter = document.getElementById("level-filter")
const ratingFilter = document.getElementById("rating-filter")
const pagination = document.getElementById("pagination")
const profileModal = document.getElementById("profile-modal")
const swapModal = document.getElementById("swap-modal")
const quickMatchModal = document.getElementById("quick-match-modal")
const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const nav = document.querySelector(".nav")
const themeToggle = document.getElementById("theme-toggle")
const loadingScreen = document.getElementById("loading-screen")

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

async function initializeApp() {
  // Show loading screen
  showLoadingScreen()

  // Initialize theme
  initializeTheme()

  // Create particles
  createParticles()

  // Animate counters
  animateCounters()

  // Load content
  await loadContent()

  // Setup event listeners
  setupEventListeners()

  // Hide loading screen
  hideLoadingScreen()

  // Check auth status
  checkAuthStatus()
}

function showLoadingScreen() {
  loadingScreen.style.display = "flex"
}

function hideLoadingScreen() {
  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }, 1500)
}

function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"
  document.documentElement.setAttribute("data-theme", savedTheme)
  updateThemeIcon(savedTheme)
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector("i")
  icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon"
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)

  showToast(`Switched to ${newTheme} mode`, "success")
}

function createParticles() {
  const container = document.getElementById("particles-container")
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 6 + "s"
    particle.style.animationDuration = Math.random() * 3 + 3 + "s"
    container.appendChild(particle)
  }
}

function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        const target = Number.parseInt(counter.dataset.count)
        animateCounter(counter, target)
        observer.unobserve(counter)
      }
    })
  })

  counters.forEach((counter) => observer.observe(counter))
}

function animateCounter(element, target) {
  let current = 0
  const increment = target / 100
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    element.textContent = Math.floor(current).toLocaleString()
  }, 20)
}

async function loadContent() {
  // Load trending skills
  loadTrendingSkills()

  // Load featured users
  loadFeaturedUsers()

  // Load recommendations
  loadRecommendations()

  // Render users
  renderUsers()
  updatePagination()
}

function loadTrendingSkills() {
  const container = document.getElementById("trending-skills")
  if (!container) return

  container.innerHTML = trendingSkills
    .map(
      (skill) => `
    <div class="trending-skill" onclick="searchBySkill('${skill.name}')">
      <i class="${skill.icon}"></i>
      <h3>${skill.name}</h3>
      <div class="demand">${skill.demand}</div>
      <div class="growth">${skill.growth}</div>
    </div>
  `,
    )
    .join("")
}

function loadFeaturedUsers() {
  const container = document.getElementById("featured-users")
  if (!container) return

  const featuredUsers = users.filter((user) => user.badges.includes("top-rated")).slice(0, 3)

  container.innerHTML = featuredUsers
    .map(
      (user) => `
    <div class="featured-user" onclick="viewProfile(${user.id})">
      <div class="featured-user-header">
        <div class="featured-user-photo">
          ${user.photo ? `<img src="${user.photo}" alt="${user.name}">` : getInitials(user.name)}
          <div class="featured-badge">
            <i class="fas fa-crown"></i>
          </div>
        </div>
        <div>
          <h3>${user.name}</h3>
          <div class="user-location">
            <i class="fas fa-map-marker-alt"></i> ${user.location}
          </div>
          <div class="user-rating">
            ${generateStars(user.rating)} (${user.rating})
          </div>
        </div>
      </div>
      <div class="user-skills">
        <h4>Top Skills:</h4>
        <div class="skills-tags">
          ${user.skillsOffered
            .slice(0, 3)
            .map((skill) => `<span class="skill-tag">${skill}</span>`)
            .join("")}
        </div>
      </div>
      <div class="featured-stats">
        <span><i class="fas fa-handshake"></i> ${user.completedSwaps} swaps</span>
        <span><i class="fas fa-calendar"></i> Since ${new Date(user.joinDate).getFullYear()}</span>
      </div>
    </div>
  `,
    )
    .join("")
}

function loadRecommendations() {
  const container = document.getElementById("recommendations-grid")
  if (!container) return

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
  if (!currentUser.id) {
    container.innerHTML = `
      <div class="recommendation-card">
        <div class="recommendation-header">
          <div class="recommendation-icon">
            <i class="fas fa-sign-in-alt"></i>
          </div>
          <h3>Login for Personalized Recommendations</h3>
        </div>
        <p>Sign in to get AI-powered skill match suggestions tailored just for you!</p>
        <button class="btn btn-primary" onclick="window.location.href='login.html'">
          <i class="fas fa-sign-in-alt"></i> Login Now
        </button>
      </div>
    `
    return
  }

  // Generate AI recommendations based on user's skills
  const recommendations = generateRecommendations(currentUser)

  container.innerHTML = recommendations
    .map(
      (rec) => `
    <div class="recommendation-card" onclick="viewProfile(${rec.user.id})">
      <div class="recommendation-header">
        <div class="recommendation-icon">
          <i class="${rec.icon}"></i>
        </div>
        <h3>${rec.title}</h3>
        <div class="match-percentage">${rec.matchPercentage}% Match</div>
      </div>
      <div class="recommendation-user">
        <div class="user-photo small">
          ${rec.user.photo ? `<img src="${rec.user.photo}" alt="${rec.user.name}">` : getInitials(rec.user.name)}
        </div>
        <div>
          <h4>${rec.user.name}</h4>
          <p>${rec.reason}</p>
        </div>
      </div>
    </div>
  `,
    )
    .join("")
}

function generateRecommendations(currentUser) {
  const recommendations = []

  // Find users who want what current user offers
  const teachingMatches = users
    .filter(
      (user) =>
        user.id !== currentUser.id &&
        user.skillsWanted.some((skill) => currentUser.skillsOffered && currentUser.skillsOffered.includes(skill)),
    )
    .slice(0, 2)

  teachingMatches.forEach((user) => {
    const commonSkills = user.skillsWanted.filter(
      (skill) => currentUser.skillsOffered && currentUser.skillsOffered.includes(skill),
    )
    recommendations.push({
      user,
      title: "Perfect Teaching Match",
      icon: "fas fa-chalkboard-teacher",
      matchPercentage: Math.floor(Math.random() * 20) + 80,
      reason: `Wants to learn ${commonSkills[0]} - your expertise!`,
    })
  })

  // Find users who offer what current user wants
  const learningMatches = users
    .filter(
      (user) =>
        user.id !== currentUser.id &&
        user.skillsOffered.some((skill) => currentUser.skillsWanted && currentUser.skillsWanted.includes(skill)),
    )
    .slice(0, 2)

  learningMatches.forEach((user) => {
    const commonSkills = user.skillsOffered.filter(
      (skill) => currentUser.skillsWanted && currentUser.skillsWanted.includes(skill),
    )
    recommendations.push({
      user,
      title: "Perfect Learning Match",
      icon: "fas fa-graduation-cap",
      matchPercentage: Math.floor(Math.random() * 15) + 85,
      reason: `Expert in ${commonSkills[0]} - exactly what you want to learn!`,
    })
  })

  return recommendations
}

function setupEventListeners() {
  // Theme toggle
  themeToggle.addEventListener("click", toggleTheme)

  // Search functionality with enhanced features
  searchBtn.addEventListener("click", performSearch)
  searchInput.addEventListener("input", handleSearchInput)
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch()
    }
  })

  // Hide suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-bar")) {
      hideSuggestions()
    }
  })

  // Filters
  locationFilter.addEventListener("change", applyFilters)
  availabilityFilter.addEventListener("change", applyFilters)
  levelFilter.addEventListener("change", applyFilters)
  ratingFilter.addEventListener("change", applyFilters)

  // View controls
  const viewBtns = document.querySelectorAll(".view-btn")
  viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      viewBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      currentView = btn.dataset.view
      toggleView()
    })
  })

  // Mobile menu
  mobileMenuBtn.addEventListener("click", () => {
    nav.classList.toggle("active")
  })

  // Modal close buttons
  document.getElementById("close-modal").addEventListener("click", closeProfileModal)
  document.getElementById("close-swap-modal").addEventListener("click", closeSwapModal)
  document.getElementById("close-quick-match").addEventListener("click", closeQuickMatchModal)

  // Quick match FAB
  document.getElementById("quick-match-btn").addEventListener("click", openQuickMatchModal)

  // Quick match options
  const optionCards = document.querySelectorAll(".option-card")
  optionCards.forEach((card) => {
    card.addEventListener("click", () => {
      const type = card.dataset.type
      handleQuickMatch(type)
    })
  })

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === profileModal) closeProfileModal()
    if (e.target === swapModal) closeSwapModal()
    if (e.target === quickMatchModal) closeQuickMatchModal()
  })

  // Pagination
  pagination.addEventListener("click", (e) => {
    if (e.target.classList.contains("page-btn")) {
      const page = e.target.dataset.page
      if (page === "prev" && currentPage > 1) {
        currentPage--
      } else if (page === "next" && currentPage < Math.ceil(filteredUsers.length / usersPerPage)) {
        currentPage++
      } else if (!isNaN(page)) {
        currentPage = Number.parseInt(page)
      }
      renderUsers()
      updatePagination()
      scrollToSection("users-section")
    }
  })

  // Swap form
  document.getElementById("swap-form").addEventListener("submit", handleSwapRequest)
  document.getElementById("cancel-swap").addEventListener("click", closeSwapModal)

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    })
  })
}

function handleSearchInput(e) {
  const query = e.target.value.toLowerCase().trim()

  if (query.length === 0) {
    hideSuggestions()
    return
  }

  // Generate suggestions
  const suggestions = generateSearchSuggestions(query)
  showSuggestions(suggestions)
}

function generateSearchSuggestions(query) {
  const suggestions = []

  // Name suggestions (prefix matching)
  const nameMatches = users.filter((user) => user.name.toLowerCase().startsWith(query)).slice(0, 3)

  nameMatches.forEach((user) => {
    suggestions.push({
      type: "user",
      text: user.name,
      icon: "fas fa-user",
      data: user,
    })
  })

  // Skill suggestions
  const allSkills = [...new Set([...users.flatMap((u) => u.skillsOffered), ...users.flatMap((u) => u.skillsWanted)])]

  const skillMatches = allSkills.filter((skill) => skill.toLowerCase().includes(query)).slice(0, 3)

  skillMatches.forEach((skill) => {
    suggestions.push({
      type: "skill",
      text: skill,
      icon: "fas fa-code",
      data: skill,
    })
  })

  return suggestions.slice(0, 6)
}

function showSuggestions(suggestions) {
  const container = document.getElementById("search-suggestions")

  if (suggestions.length === 0) {
    hideSuggestions()
    return
  }

  container.innerHTML = suggestions
    .map(
      (suggestion) => `
    <div class="suggestion-item" onclick="selectSuggestion('${suggestion.type}', '${suggestion.text}')">
      <i class="${suggestion.icon}"></i>
      <span>${suggestion.text}</span>
    </div>
  `,
    )
    .join("")

  container.style.display = "block"
}

function hideSuggestions() {
  const container = document.getElementById("search-suggestions")
  container.style.display = "none"
}

function selectSuggestion(type, text) {
  searchInput.value = text
  hideSuggestions()
  performSearch()
}

function performSearch() {
  const query = searchInput.value.toLowerCase().trim()

  if (query) {
    filteredUsers = users.filter((user) => {
      // Name matching (prefix and contains)
      const nameMatch = user.name.toLowerCase().includes(query)

      // Skill matching
      const skillMatch =
        user.skillsOffered.some((skill) => skill.toLowerCase().includes(query)) ||
        user.skillsWanted.some((skill) => skill.toLowerCase().includes(query))

      return nameMatch || skillMatch
    })

    showToast(`Found ${filteredUsers.length} results for "${query}"`, "success")
  } else {
    filteredUsers = [...users]
  }

  applyFilters()
}

function searchBySkill(skillName) {
  searchInput.value = skillName
  performSearch()
  scrollToSection("users-section")
}

function applyFilters() {
  let filtered = [...filteredUsers]

  const locationValue = locationFilter.value
  if (locationValue) {
    filtered = filtered.filter((user) => user.location.toLowerCase().includes(locationValue.replace("-", " ")))
  }

  const availabilityValue = availabilityFilter.value
  if (availabilityValue) {
    filtered = filtered.filter((user) => user.availability.includes(availabilityValue))
  }

  const levelValue = levelFilter.value
  if (levelValue) {
    filtered = filtered.filter((user) => user.level === levelValue)
  }

  const ratingValue = ratingFilter.value
  if (ratingValue) {
    const minRating = Number.parseInt(ratingValue)
    filtered = filtered.filter((user) => user.rating >= minRating)
  }

  filteredUsers = filtered
  currentPage = 1
  renderUsers()
  updatePagination()
}

function toggleView() {
  usersGrid.classList.toggle("list-view", currentView === "list")
  renderUsers()
}

function renderUsers() {
  const startIndex = (currentPage - 1) * usersPerPage
  const endIndex = startIndex + usersPerPage
  const usersToShow = filteredUsers.slice(startIndex, endIndex)

  if (usersToShow.length === 0) {
    usersGrid.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-search"></i>
        <h3>No users found</h3>
        <p>Try adjusting your search criteria or filters.</p>
        <button class="btn btn-primary" onclick="clearFilters()">
          <i class="fas fa-refresh"></i> Clear Filters
        </button>
      </div>
    `
    return
  }

  usersGrid.innerHTML = usersToShow
    .map(
      (user) => `
    <div class="user-card fade-in">
      <div class="user-header">
        <div class="user-photo">
          ${user.photo ? `<img src="${user.photo}" alt="${user.name}">` : getInitials(user.name)}
          ${user.isOnline ? '<div class="user-status"></div>' : ""}
        </div>
        <div class="user-info">
          <h3>${user.name} ${generateBadges(user.badges)}</h3>
          <div class="user-location">
            <i class="fas fa-map-marker-alt"></i> ${user.location}
          </div>
        </div>
      </div>
      
      <div class="user-skills">
        <h4>Skills Offered:</h4>
        <div class="skills-tags">
          ${user.skillsOffered.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
        </div>
      </div>
      
      <div class="user-skills">
        <h4>Skills Wanted:</h4>
        <div class="skills-tags">
          ${user.skillsWanted.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
        </div>
      </div>
      
      <div class="user-meta">
        <div class="user-rating">
          ${generateStars(user.rating)} <span>${user.rating}</span>
        </div>
        <div class="user-level">
          <i class="fas fa-medal"></i> ${user.level}
        </div>
      </div>
      
      <div class="user-availability">
        <i class="fas fa-clock"></i> Available: ${user.availability.join(", ")}
      </div>
      
      <div class="user-actions">
        <button class="btn btn-outline" onclick="viewProfile(${user.id})">
          <i class="fas fa-eye"></i> View Profile
        </button>
        <button class="btn btn-primary" onclick="requestSwap(${user.id})">
          <i class="fas fa-handshake"></i> Request Swap
        </button>
      </div>
    </div>
  `,
    )
    .join("")
}

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function generateBadges(badges) {
  const badgeIcons = {
    verified: '<i class="fas fa-check-circle" style="color: var(--success-color);" title="Verified"></i>',
    "top-rated": '<i class="fas fa-star" style="color: var(--warning-color);" title="Top Rated"></i>',
    mentor: '<i class="fas fa-graduation-cap" style="color: var(--primary-color);" title="Mentor"></i>',
    creative: '<i class="fas fa-palette" style="color: var(--accent-color);" title="Creative"></i>',
    polyglot: '<i class="fas fa-language" style="color: var(--secondary-color);" title="Polyglot"></i>',
  }

  return badges.map((badge) => badgeIcons[badge] || "").join(" ")
}

function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  let stars = ""

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star" style="color: var(--warning-color);"></i>'
  }

  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt" style="color: var(--warning-color);"></i>'
  }

  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star" style="color: var(--warning-color);"></i>'
  }

  return stars
}

function updatePagination() {
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const pageButtons = pagination.querySelectorAll(".page-btn")

  pageButtons.forEach((btn) => {
    const page = btn.dataset.page
    if (page === "prev") {
      btn.disabled = currentPage === 1
      btn.style.opacity = currentPage === 1 ? "0.5" : "1"
    } else if (page === "next") {
      btn.disabled = currentPage === totalPages
      btn.style.opacity = currentPage === totalPages ? "0.5" : "1"
    } else if (!isNaN(page)) {
      btn.classList.toggle("active", Number.parseInt(page) === currentPage)
      btn.style.display = Number.parseInt(page) <= totalPages ? "flex" : "none"
    }
  })
}

function viewProfile(userId) {
  const user = users.find((u) => u.id === userId)
  if (!user) return

  const profileView = document.getElementById("profile-view")
  profileView.innerHTML = `
    <div class="profile-header">
      <div class="user-photo large">
        ${user.photo ? `<img src="${user.photo}" alt="${user.name}">` : getInitials(user.name)}
        ${user.isOnline ? '<div class="user-status"></div>' : ""}
      </div>
      <div class="profile-info">
        <h2>${user.name} ${generateBadges(user.badges)}</h2>
        <div class="user-location">
          <i class="fas fa-map-marker-alt"></i> ${user.location}
        </div>
        <div class="user-rating">
          ${generateStars(user.rating)} <span>${user.rating}/5</span>
        </div>
        <div class="user-stats">
          <span><i class="fas fa-handshake"></i> ${user.completedSwaps} swaps completed</span>
          <span><i class="fas fa-calendar"></i> Member since ${new Date(user.joinDate).getFullYear()}</span>
        </div>
      </div>
    </div>
    
    <div class="profile-skills">
      <div class="user-skills">
        <h4><i class="fas fa-chalkboard-teacher"></i> Skills Offered:</h4>
        <div class="skills-tags">
          ${user.skillsOffered.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
        </div>
      </div>
      
      <div class="user-skills">
        <h4><i class="fas fa-graduation-cap"></i> Skills Wanted:</h4>
        <div class="skills-tags">
          ${user.skillsWanted.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
        </div>
      </div>
    </div>
    
    <div class="profile-details">
      <div class="detail-item">
        <strong>Availability:</strong> ${user.availability.join(", ")}
      </div>
      <div class="detail-item">
        <strong>Skill Level:</strong> ${user.level}
      </div>
      <div class="detail-item">
        <strong>Status:</strong> ${user.isOnline ? "Online" : "Offline"}
      </div>
    </div>
    
    <div class="profile-actions">
      <button class="btn btn-primary" onclick="requestSwap(${user.id}); closeProfileModal();">
        <i class="fas fa-handshake"></i> Request Swap
      </button>
    </div>
  `

  profileModal.style.display = "block"
}

function requestSwap(userId) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  if (!isLoggedIn) {
    showToast("Please login to request a swap.", "warning")
    setTimeout(() => {
      window.location.href = "login.html"
    }, 2000)
    return
  }

  const user = users.find((u) => u.id === userId)
  if (!user) return

  // Populate form with user's skills
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
  const mySkillSelect = document.getElementById("my-skill")
  const theirSkillSelect = document.getElementById("their-skill")

  mySkillSelect.innerHTML = '<option value="">Select your skill</option>'
  if (currentUser.skillsOffered) {
    currentUser.skillsOffered.forEach((skill) => {
      mySkillSelect.innerHTML += `<option value="${skill}">${skill}</option>`
    })
  }

  theirSkillSelect.innerHTML = '<option value="">Select their skill</option>'
  user.skillsWanted.forEach((skill) => {
    theirSkillSelect.innerHTML += `<option value="${skill}">${skill}</option>`
  })

  // Store target user ID for form submission
  document.getElementById("swap-form").dataset.targetUserId = userId

  swapModal.style.display = "block"
}

function handleSwapRequest(e) {
  e.preventDefault()

  const mySkill = document.getElementById("my-skill").value
  const theirSkill = document.getElementById("their-skill").value
  const message = document.getElementById("swap-message").value
  const targetUserId = Number.parseInt(e.target.dataset.targetUserId)

  if (!mySkill || !theirSkill || !message) {
    showToast("Please fill in all fields.", "error")
    return
  }

  // Store swap request
  const swapRequests = JSON.parse(localStorage.getItem("swapRequests") || "[]")
  const newRequest = {
    id: Date.now(),
    fromUserId: JSON.parse(localStorage.getItem("currentUser")).id || 1,
    toUserId: targetUserId,
    mySkill,
    theirSkill,
    message,
    status: "pending",
    createdAt: new Date().toISOString(),
  }

  swapRequests.push(newRequest)
  localStorage.setItem("swapRequests", JSON.stringify(swapRequests))

  showToast("Swap request sent successfully!", "success")
  closeSwapModal()

  // Reset form
  e.target.reset()
}

function openQuickMatchModal() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  if (!isLoggedIn) {
    showToast("Please login to use Quick Match.", "warning")
    setTimeout(() => {
      window.location.href = "login.html"
    }, 2000)
    return
  }

  quickMatchModal.style.display = "block"
}

function handleQuickMatch(type) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
  let matches = []

  switch (type) {
    case "learn":
      matches = users.filter(
        (user) =>
          user.id !== currentUser.id &&
          user.skillsOffered.some((skill) => currentUser.skillsWanted && currentUser.skillsWanted.includes(skill)),
      )
      break
    case "teach":
      matches = users.filter(
        (user) =>
          user.id !== currentUser.id &&
          user.skillsWanted.some((skill) => currentUser.skillsOffered && currentUser.skillsOffered.includes(skill)),
      )
      break
    case "both":
      matches = users.filter(
        (user) =>
          user.id !== currentUser.id &&
          user.skillsOffered.some((skill) => currentUser.skillsWanted && currentUser.skillsWanted.includes(skill)) &&
          user.skillsWanted.some((skill) => currentUser.skillsOffered && currentUser.skillsOffered.includes(skill)),
      )
      break
  }

  if (matches.length > 0) {
    const randomMatch = matches[Math.floor(Math.random() * matches.length)]
    closeQuickMatchModal()
    viewProfile(randomMatch.id)
    showToast(`Found a perfect ${type} match!`, "success")
  } else {
    showToast(`No ${type} matches found. Try updating your profile!`, "warning")
  }
}

function clearFilters() {
  searchInput.value = ""
  locationFilter.value = ""
  availabilityFilter.value = ""
  levelFilter.value = ""
  ratingFilter.value = ""

  filteredUsers = [...users]
  currentPage = 1
  renderUsers()
  updatePagination()

  showToast("Filters cleared!", "success")
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId) || document.querySelector(`.${sectionId}`)
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toast-container")
  const toast = document.createElement("div")
  toast.className = `toast ${type}`

  const icon = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  }[type]

  toast.innerHTML = `
    <i class="${icon}"></i>
    <span>${message}</span>
  `

  toastContainer.appendChild(toast)

  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.style.opacity = "0"
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  }, 4000)
}

function checkAuthStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  const authLink = document.getElementById("auth-link")

  if (isLoggedIn) {
    authLink.innerHTML = '<i class="fas fa-sign-out-alt"></i><span>Logout</span>'
    authLink.href = "#"
    authLink.addEventListener("click", logout)
  } else {
    authLink.innerHTML = '<i class="fas fa-sign-in-alt"></i><span>Login</span>'
    authLink.href = "login.html"
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("currentUser")
  showToast("Logged out successfully!", "success")
  setTimeout(() => {
    window.location.href = "login.html"
  }, 1500)
}

function closeProfileModal() {
  profileModal.style.display = "none"
}

function closeSwapModal() {
  swapModal.style.display = "none"
}

function closeQuickMatchModal() {
  quickMatchModal.style.display = "none"
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Add some initial animation delays
  const cards = document.querySelectorAll(".user-card")
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
  })
})
