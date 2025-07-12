document.addEventListener("DOMContentLoaded", () => {
  checkAuthStatus()
  loadRequests()
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

function setupEventListeners() {
  // Mobile menu
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const nav = document.querySelector(".nav")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      nav.classList.toggle("active")
    })
  }

  // Tab switching
  const tabBtns = document.querySelectorAll(".tab-btn")
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tab = this.dataset.tab
      switchTab(tab)
    })
  })

  // Rating modal
  document.getElementById("close-rating-modal").addEventListener("click", closeRatingModal)
  document.getElementById("cancel-rating").addEventListener("click", closeRatingModal)
  document.getElementById("rating-form").addEventListener("submit", handleRatingSubmission)

  // Star rating
  const stars = document.querySelectorAll("#star-rating i")
  stars.forEach((star) => {
    star.addEventListener("click", function () {
      const rating = Number.parseInt(this.dataset.rating)
      setStarRating(rating)
    })

    star.addEventListener("mouseover", function () {
      const rating = Number.parseInt(this.dataset.rating)
      highlightStars(rating)
    })
  })

  document.getElementById("star-rating").addEventListener("mouseleave", function () {
    const currentRating = Number.parseInt(this.dataset.currentRating) || 0
    highlightStars(currentRating)
  })

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    const ratingModal = document.getElementById("rating-modal")
    if (e.target === ratingModal) {
      closeRatingModal()
    }
  })
}

function switchTab(tab) {
  // Update tab buttons
  const tabBtns = document.querySelectorAll(".tab-btn")
  tabBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tab)
  })

  // Update tab content
  const tabContents = document.querySelectorAll(".tab-content")
  tabContents.forEach((content) => {
    content.classList.toggle("active", content.id === `${tab}-tab`)
  })

  loadRequests()
}

function loadRequests() {
  const activeTab = document.querySelector(".tab-btn.active").dataset.tab
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
  const swapRequests = JSON.parse(localStorage.getItem("swapRequests") || "[]")

  let requests = []

  if (activeTab === "received") {
    requests = swapRequests.filter((req) => req.toUserId === currentUser.id)
  } else {
    requests = swapRequests.filter((req) => req.fromUserId === currentUser.id)
  }

  const containerId = activeTab === "received" ? "received-requests" : "sent-requests"
  const container = document.getElementById(containerId)

  if (requests.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>No ${activeTab} requests</h3>
                <p>You don't have any ${activeTab} swap requests yet.</p>
            </div>
        `
    return
  }

  container.innerHTML = requests
    .map((request) => {
      const otherUserId = activeTab === "received" ? request.fromUserId : request.toUserId
      const otherUser = getUserById(otherUserId)

      return `
            <div class="request-card">
                <div class="request-header">
                    <div class="request-user">
                        <div class="user-photo">
                            ${otherUser.photo ? `<img src="${otherUser.photo}" alt="${otherUser.name}">` : '<i class="fas fa-user"></i>'}
                        </div>
                        <div>
                            <h4>${otherUser.name}</h4>
                            <small>${otherUser.location}</small>
                        </div>
                    </div>
                    <span class="request-status status-${request.status}">${request.status.toUpperCase()}</span>
                </div>
                
                <div class="request-skills">
                    <p><strong>Offering:</strong> ${request.mySkill}</p>
                    <p><strong>Wanting:</strong> ${request.theirSkill}</p>
                </div>
                
                <div class="request-message">
                    "${request.message}"
                </div>
                
                <div class="request-actions">
                    ${generateRequestActions(request, activeTab)}
                </div>
            </div>
        `
    })
    .join("")
}

function generateRequestActions(request, activeTab) {
  if (activeTab === "received" && request.status === "pending") {
    return `
            <button class="btn btn-primary" onclick="acceptRequest(${request.id})">Accept</button>
            <button class="btn btn-secondary" onclick="rejectRequest(${request.id})">Reject</button>
        `
  } else if (activeTab === "sent" && request.status === "accepted") {
    return `
            <button class="btn btn-primary" onclick="rateUser(${request.toUserId}, ${request.id})">Rate & Feedback</button>
        `
  } else if (activeTab === "sent" && request.status === "pending") {
    return `
            <button class="btn btn-secondary" onclick="cancelRequest(${request.id})">Cancel Request</button>
        `
  }
  return ""
}

function getUserById(userId) {
  // First check sample users
  const sampleUsers = [
    { id: 1, name: "Marc Demo", location: "New York", photo: null },
    { id: 2, name: "Michelle", location: "London", photo: null },
    { id: 3, name: "Joe Wills", location: "Tokyo", photo: null },
  ]

  let user = sampleUsers.find((u) => u.id === userId)
  if (user) return user

  // Then check registered users
  const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
  user = registeredUsers.find((u) => u.id === userId)

  return user || { id: userId, name: "Unknown User", location: "Unknown", photo: null }
}

function acceptRequest(requestId) {
  updateRequestStatus(requestId, "accepted")
  alert("Request accepted! You can now coordinate with the other user.")
}

function rejectRequest(requestId) {
  updateRequestStatus(requestId, "rejected")
  alert("Request rejected.")
}

function cancelRequest(requestId) {
  if (confirm("Are you sure you want to cancel this request?")) {
    const swapRequests = JSON.parse(localStorage.getItem("swapRequests") || "[]")
    const updatedRequests = swapRequests.filter((req) => req.id !== requestId)
    localStorage.setItem("swapRequests", JSON.stringify(updatedRequests))
    loadRequests()
  }
}

function updateRequestStatus(requestId, status) {
  const swapRequests = JSON.parse(localStorage.getItem("swapRequests") || "[]")
  const requestIndex = swapRequests.findIndex((req) => req.id === requestId)

  if (requestIndex !== -1) {
    swapRequests[requestIndex].status = status
    localStorage.setItem("swapRequests", JSON.stringify(swapRequests))
    loadRequests()
  }
}

function rateUser(userId, requestId) {
  const ratingModal = document.getElementById("rating-modal")
  ratingModal.dataset.userId = userId
  ratingModal.dataset.requestId = requestId
  ratingModal.style.display = "block"

  // Reset form
  document.getElementById("rating-form").reset()
  document.getElementById("star-rating").dataset.currentRating = "0"
  highlightStars(0)
}

function setStarRating(rating) {
  const starRating = document.getElementById("star-rating")
  starRating.dataset.currentRating = rating
  highlightStars(rating)
}

function highlightStars(rating) {
  const stars = document.querySelectorAll("#star-rating i")
  stars.forEach((star, index) => {
    star.classList.toggle("active", index < rating)
  })
}

function handleRatingSubmission(e) {
  e.preventDefault()

  const rating = Number.parseInt(document.getElementById("star-rating").dataset.currentRating) || 0
  const feedback = document.getElementById("feedback").value.trim()

  if (rating === 0) {
    alert("Please select a rating.")
    return
  }

  if (!feedback) {
    alert("Please provide feedback.")
    return
  }

  // Store rating (in real app, this would be sent to server)
  const ratings = JSON.parse(localStorage.getItem("ratings") || "[]")
  const newRating = {
    id: Date.now(),
    userId: Number.parseInt(document.getElementById("rating-modal").dataset.userId),
    requestId: Number.parseInt(document.getElementById("rating-modal").dataset.requestId),
    rating,
    feedback,
    createdAt: new Date().toISOString(),
  }

  ratings.push(newRating)
  localStorage.setItem("ratings", JSON.stringify(ratings))

  // Mark request as rated
  const swapRequests = JSON.parse(localStorage.getItem("swapRequests") || "[]")
  const requestIndex = swapRequests.findIndex((req) => req.id === newRating.requestId)
  if (requestIndex !== -1) {
    swapRequests[requestIndex].rated = true
    localStorage.setItem("swapRequests", JSON.stringify(swapRequests))
  }

  alert("Thank you for your feedback!")
  closeRatingModal()
  loadRequests()
}

function closeRatingModal() {
  document.getElementById("rating-modal").style.display = "none"
}
