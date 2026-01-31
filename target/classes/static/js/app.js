const API_BASE_URL = '/api';

// --- Auth Functions ---
async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('error-message').style.display = 'block';
        }
    } catch (error) {
        console.error('Login error:', error);
    }
}

function checkAuth() {
    if (!localStorage.getItem('isAuthenticated')) {
        window.location.href = 'index.html';
    }
}

function logout() {
    localStorage.removeItem('isAuthenticated');
    window.location.href = 'index.html';
}

// --- CRUD Functions ---
let isStudentsVisible = false;

function toggleStudents() {
    const tableContainer = document.getElementById('tableContainer');
    const viewBtn = document.getElementById('viewStudentsBtn');
    
    isStudentsVisible = !isStudentsVisible;
    
    if (isStudentsVisible) {
        tableContainer.classList.remove('hidden');
        viewBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Students';
        fetchStudents();
    } else {
        tableContainer.classList.add('hidden');
        viewBtn.innerHTML = '<i class="fas fa-eye"></i> View Students';
    }
}

async function fetchStudents() {
    if (!isStudentsVisible) return; // Don't fetch if hidden
    
    try {
        const response = await fetch(`${API_BASE_URL}/students`);
        const students = await response.json();
        renderTable(students);
    } catch (error) {
        console.error('Error fetching students:', error);
    }
}

async function searchStudents() {
    const query = document.getElementById('searchInput').value;
    const tableContainer = document.getElementById('tableContainer');
    
    // Auto-show students when searching
    if (!isStudentsVisible) {
        toggleStudents();
    }
    
    if (!query) {
        fetchStudents();
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/students/search?query=${encodeURIComponent(query)}`);
        const students = await response.json();
        renderTable(students);
    } catch (error) {
        console.error('Error searching students:', error);
    }
}

function renderTable(students) {
    const tableBody = document.getElementById('studentTableBody');
    const noDataMsg = document.getElementById('noDataMessage');
    const tableEl = document.querySelector('table');
    
    tableBody.innerHTML = '';
    
    if (students.length === 0) {
        tableEl.style.display = 'none';
        noDataMsg.classList.remove('hidden');
    } else {
        tableEl.style.display = 'table';
        noDataMsg.classList.add('hidden');
        
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td><strong>${student.name}</strong></td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>${student.age}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editStudent(${student.id})"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-btn" onclick="deleteStudent(${student.id})"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

async function handleStudentSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('studentId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const course = document.getElementById('course').value;
    const age = document.getElementById('age').value;

    const student = { name, email, course, age };
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_BASE_URL}/students/${id}` : `${API_BASE_URL}/students`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        });

        if (response.ok) {
            closeModal();
            // If list is visible, refresh it. If not, maybe show it?
            if (isStudentsVisible) {
                fetchStudents();
            } else {
                toggleStudents(); // Auto-show list after adding
            }
        } else {
            alert('Failed to save student');
        }
    } catch (error) {
        console.error('Error saving student:', error);
    }
}

async function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/students/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchStudents();
            }
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    }
}

async function editStudent(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/students/${id}`);
        const student = await response.json();
        
        document.getElementById('studentId').value = student.id;
        document.getElementById('name').value = student.name;
        document.getElementById('email').value = student.email;
        document.getElementById('course').value = student.course;
        document.getElementById('age').value = student.age;
        
        document.getElementById('modalTitle').innerText = 'Update Student';
        openModal();
    } catch (error) {
        console.error('Error loading student details:', error);
    }
}

// --- Modal Functions ---
function openModal() {
    const modal = document.getElementById('studentModal');
    modal.style.display = 'flex';
    // Trigger reflow
    modal.offsetHeight; 
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('studentModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.getElementById('studentForm').reset();
        document.getElementById('studentId').value = ''; 
        document.getElementById('modalTitle').innerText = 'Add Student';
    }, 300); // 300ms matches CSS transition
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('studentModal');
    if (event.target == modal) {
        closeModal();
    }
}
