const ADMIN_PASSWORD = "secure123"; // Change this to your actual password

// Function to log in as admin
function login() {
    const password = document.getElementById("password").value;
    if (password === ADMIN_PASSWORD) {
        localStorage.setItem("isAdmin", "true"); // Store login status
        window.location.href = "admin.html"; // Redirect to admin panel
    } else {
        document.getElementById("error-message").classList.remove("hidden");
    }
}

// Function to check if the user is logged in as admin
function checkAdmin() {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
        window.location.href = "login.html"; // Redirect unauthorized users
    }
}

// Function to log out the admin
function logout() {
    localStorage.removeItem("isAdmin"); // Remove login status
    window.location.href = "login.html"; // Redirect to login page
}

// Function to load blogs from local storage
function loadBlogs() {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const blogContainer = document.getElementById("blog-container");
    const blogList = document.getElementById("blog-list");

    if (blogContainer) {
        blogContainer.innerHTML = "";
        blogs.forEach((blog, index) => {
            const blogPost = document.createElement("div");
            blogPost.className = "bg-white p-6 rounded-lg shadow-lg";
            blogPost.innerHTML = `
                <h2 class="text-xl font-bold text-gray-800">${blog.title}</h2>
                <p class="text-sm text-gray-500">${blog.date}</p>
                <p class="mt-2 text-gray-600">${blog.content}</p>
            `;
            blogContainer.appendChild(blogPost);
        });
    }

    if (blogList) {
        blogList.innerHTML = "";
        blogs.forEach((blog, index) => {
            const blogPost = document.createElement("div");
            blogPost.className = "bg-white p-6 rounded-lg shadow-lg";
            blogPost.innerHTML = `
                <h2 class="text-xl font-bold text-gray-800">${blog.title}</h2>
                <p class="text-sm text-gray-500">${blog.date}</p>
                <p class="mt-2 text-gray-600">${blog.content}</p>
                <button onclick="editBlog(${index})" class="bg-yellow-500 text-white px-4 py-2 rounded mt-2">Edit</button>
                <button onclick="deleteBlog(${index})" class="bg-red-500 text-white px-4 py-2 rounded mt-2">Delete</button>
            `;
            blogList.appendChild(blogPost);
        });
    }
}

// Function to save a new or edited blog post
function saveBlog() {
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const content = document.getElementById("content").value;
    const editIndex = document.getElementById("editIndex").value;

    if (title && date && content) {
        let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

        if (editIndex === "") {
            blogs.push({ title, date, content });
        } else {
            blogs[editIndex] = { title, date, content };
            document.getElementById("editIndex").value = "";
        }

        localStorage.setItem("blogs", JSON.stringify(blogs));
        document.getElementById("title").value = "";
        document.getElementById("date").value = "";
        document.getElementById("content").value = "";

        loadBlogs();
    } else {
        alert("Please fill all fields!");
    }
}

// Function to edit a blog post
function editBlog(index) {
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    document.getElementById("title").value = blogs[index].title;
    document.getElementById("date").value = blogs[index].date;
    document.getElementById("content").value = blogs[index].content;
    document.getElementById("editIndex").value = index;
}

// Function to delete a blog post
function deleteBlog(index) {
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.splice(index, 1);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    loadBlogs();
}

// Ensure only admin can access the admin panel
if (window.location.pathname.includes("admin.html")) {
    checkAdmin();
}

// Load blogs on page load
document.addEventListener("DOMContentLoaded", loadBlogs);
