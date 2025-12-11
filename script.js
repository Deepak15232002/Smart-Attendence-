document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Shared Logic (Mobile Menu, Smooth Scroll)
    // ==========================================

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-scroll').forEach(el => {
        observer.observe(el);
    });

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            alert(`Thank you, ${name}! Your message has been sent (demo only).`);
            contactForm.reset();
        });
    }

    // ==========================================
    // Login Page Logic (index.html)
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForms = document.querySelectorAll('.login-form');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                loginForms.forEach(f => f.classList.remove('active'));

                btn.classList.add('active');
                const tabId = btn.getAttribute('data-tab');
                const formId = `${tabId}-login`;
                document.getElementById(formId).classList.add('active');
            });
        });

        loginForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const userType = form.id.split('-')[0];
                const inputs = form.querySelectorAll('input');
                const id = inputs[0].value;
                const password = inputs[1].value;

                if (id && password) {
                    if (password === '12345') {
                        alert(`Login Successful! Welcome, ${userType}.`);
                        window.location.href = 'home.html';
                    } else {
                        alert('Invalid Password! Try: 12345');
                    }
                } else {
                    alert('Please fill in all fields.');
                }
            });
        });
    }

    // ==========================================
    // Dynamic Simulation Logic (State & Demos)
    // ==========================================

    // 1. State Management
    const appState = {
        users: [
            { name: 'John Doe', id: 'STU-001', dept: 'Computer Science', email: 'john@example.com' },
            { name: 'Jane Smith', id: 'STU-002', dept: 'Electrical Eng.', email: 'jane@example.com' }
        ],
        attendance: [
            { id: 'STU-001', name: 'John Doe', time: '08:55 AM', status: 'Present' },
            { id: 'STU-002', name: 'Jane Smith', time: '09:02 AM', status: 'Late' }
        ]
    };

    // 2. Helper Functions for Dynamic Content
    const getDashboardStats = () => {
        const total = appState.users.length;
        const present = appState.attendance.filter(a => a.status !== 'Absent').length;
        const absent = total - present; // Simplified logic
        const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
        return { present, absent, percentage };
    };

    const renderLogs = () => {
        return appState.attendance.map(entry => `
            <tr>
                <td>${entry.id}</td>
                <td>${entry.name}</td>
                <td>${entry.time}</td>
                <td style="color: ${entry.status === 'Present' ? 'green' : (entry.status === 'Late' ? 'orange' : 'red')}">${entry.status}</td>
            </tr>
        `).join('');
    };

    // 3. Dynamic Demo Content Generators
    const demoGenerators = {
        'profile': () => `
            <div class="demo-header">
                <h3>User Profile</h3>
                <p>Manage your account</p>
            </div>
            <div style="text-align: center;">
                <div style="width: 120px; height: 120px; background: #ddd; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; border: 4px solid #fff; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                    <i class="fas fa-user" style="font-size: 4rem; color: #666;"></i>
                </div>
                <h4 style="font-size: 1.5rem; margin-bottom: 5px;">Admin User</h4>
                <p style="color: #666; margin-bottom: 20px;">System Administrator</p>
                <div style="text-align: left; background: #f9f9f9; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <p><strong>Email:</strong> admin@smartattendance.com</p>
                    <p><strong>Role:</strong> Super Admin</p>
                    <p><strong>System Status:</strong> Active</p>
                </div>
                <button class="btn-primary" onclick="alert('Edit Profile feature coming soon!')">Edit Profile</button>
            </div>
        `,
        'detection': () => `
            <div class="demo-header">
                <h3>Face Detection Demo</h3>
                <p>Real-time Camera Feed</p>
            </div>
            <div class="video-container">
                <video id="webcam" autoplay playsinline></video>
                <div class="scan-overlay" id="scanOverlay"></div>
                <div class="result-message" id="resultMsg">Face Matched!</div>
            </div>
            <div style="text-align: center;">
                <button class="btn-primary" id="startCamBtn">Start Camera</button>
            </div>
        `,
        'recognition': () => `
            <div class="demo-header">
                <h3>Face Recognition</h3>
                <p>Mark Attendance</p>
            </div>
            
            <!-- Step 1: Enter Name -->
            <div id="recogStep1" style="text-align: center;">
                <p style="margin-bottom: 15px;">Please enter your name to start recognition:</p>
                <input type="text" id="recogNameInput" placeholder="Enter Name (e.g. Alice)" style="padding: 10px; width: 80%; border-radius: 5px; border: 1px solid #ddd; margin-bottom: 15px;">
                <button class="btn-primary" id="recogNextBtn">Next <i class="fas fa-arrow-right"></i></button>
            </div>

            <!-- Step 2: Camera Scan -->
            <div id="recogStep2" style="display: none;">
                <div class="video-container">
                    <video id="webcam" autoplay playsinline></video>
                    <div class="scan-overlay" id="scanOverlay"></div>
                    <div class="result-message" id="resultMsg"></div>
                </div>
                <div style="text-align: center; margin-top: 10px;">
                    <p id="scanningText" style="color: #666;">Initializing Camera...</p>
                </div>
            </div>
        `,
        'registration': () => `
            <div class="demo-header">
                <h3>New Student Registration</h3>
                <p>Enroll a new user into the database.</p>
            </div>
            <form class="mock-form" id="regForm">
                <input type="text" id="regName" placeholder="Full Name" required>
                <input type="text" id="regId" placeholder="Student ID (e.g. STU-003)" required>
                <input type="email" id="regEmail" placeholder="Email Address" required>
                <select id="regDept">
                    <option>Computer Science</option>
                    <option>Electrical Eng.</option>
                    <option>Mechanical Eng.</option>
                    <option>Civil Eng.</option>
                </select>
                
                <div style="margin: 10px 0; padding: 15px; background: #f9f9f9; border-radius: 10px; text-align: center;">
                    <p style="margin-bottom: 10px; font-size: 0.9rem; color: #666;">Face Registration Required</p>
                    
                    <!-- Camera Container for Registration -->
                    <div id="regCamContainer" style="display: none; margin-bottom: 10px;">
                        <video id="regWebcam" autoplay playsinline style="width: 100%; border-radius: 5px; border: 2px solid #ddd;"></video>
                    </div>

                    <div id="faceCapStatus" style="margin-bottom: 10px; font-weight: bold; color: #888;">Not Captured</div>
                    <button type="button" class="btn-primary" id="captureFaceBtn" style="background: #6c757d;">
                        <i class="fas fa-camera"></i> Capture Face
                    </button>
                </div>

                <button type="submit" class="btn-primary" id="finalRegisterBtn" disabled style="opacity: 0.6; cursor: not-allowed;">Register Student</button>
            </form>
        `,
        'logging': () => `
            <div class="demo-header">
                <h3>Attendance Log</h3>
                <p>Real-time entries</p>
            </div>
            <div style="max-height: 300px; overflow-y: auto;">
                <table class="mock-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="logBody">
                        ${renderLogs()}
                    </tbody>
                </table>
            </div>
        `,
        'dashboard': () => {
            const stats = getDashboardStats();
            return `
            <div class="demo-header">
                <h3>Real-Time Dashboard</h3>
                <p>Today's Statistics</p>
            </div>
            <div class="mock-stats">
                <div class="stat-box">
                    <h4>${stats.present}</h4>
                    <p>Present</p>
                </div>
                <div class="stat-box">
                    <h4>${stats.absent}</h4>
                    <p>Absent</p>
                </div>
                <div class="stat-box">
                    <h4>${stats.percentage}%</h4>
                    <p>Attendance</p>
                </div>
            </div>
            <div style="margin-top: 20px; padding: 20px; background: #f9f9f9; border-radius: 10px; text-align: center;">
                <p><strong>Total Registered Users:</strong> ${appState.users.length}</p>
                <p style="font-size: 0.9rem; color: #666;">(Data updates dynamically)</p>
            </div>
            `;
        },
        'database': () => `
            <div class="demo-header">
                <h3>Database View</h3>
                <p>Current Registered Users</p>
            </div>
            <div style="background: #333; color: #fff; padding: 15px; border-radius: 5px; font-family: monospace; max-height: 300px; overflow-y: auto;">
                > SELECT * FROM users;<br><br>
                | ID | Name | Dept |<br>
                |----|------|------|<br>
                ${appState.users.map(u => `| ${u.id} | ${u.name} | ${u.dept} |`).join('<br>')}
                <br>
                > ${appState.users.length} rows returned.
            </div>
        `,
        'reports': () => `
            <div class="demo-header">
                <h3>Monthly Report</h3>
                <p>Export Options</p>
            </div>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button class="btn-primary" style="background: #217346;" onclick="alert('Exporting to Excel...')"><i class="fas fa-file-excel"></i> Export to Excel</button>
                <button class="btn-primary" style="background: #b30b00;" onclick="alert('Exporting to PDF...')"><i class="fas fa-file-pdf"></i> Export to PDF</button>
            </div>
        `,
        'notifications': () => `
            <div class="demo-header">
                <h3>System Notifications</h3>
            </div>
            <div style="border-left: 4px solid #4e54c8; background: #f1f1f1; padding: 10px; margin-bottom: 10px;">
                <strong>System:</strong> Database updated with ${appState.users.length} users.
            </div>
            <div style="border-left: 4px solid #28a745; background: #f1f1f1; padding: 10px;">
                <strong>Live:</strong> ${appState.attendance.length} attendance records marked today.
            </div>
        `,
        'admin': () => `
            <div class="demo-header">
                <h3>Admin Panel</h3>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <button class="btn-primary">Manage Users</button>
                <button class="btn-primary">System Settings</button>
                <button class="btn-primary">View Logs</button>
                <button class="btn-primary">Backup Data</button>
            </div>
        `
    };

    // 4. Event Handlers
    const modal = document.getElementById('featureModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.close-modal');
    const featureTriggers = document.querySelectorAll('.feature-card, .nav-feature');
    let activeStream = null;

    const stopCamera = () => {
        if (activeStream) {
            activeStream.getTracks().forEach(track => track.stop());
            activeStream = null;
        }
    };

    if (modal && featureTriggers.length > 0) {
        // Open Modal
        featureTriggers.forEach(card => {
            card.addEventListener('click', (e) => {
                if (card.tagName === 'A') e.preventDefault();
                const featureType = card.getAttribute('data-feature');

                if (demoGenerators[featureType]) {
                    // Generate dynamic content
                    modalBody.innerHTML = demoGenerators[featureType]();
                    modal.classList.add('active');

                    // Attach specific listeners based on feature type
                    if (featureType === 'registration') {
                        const captureBtn = document.getElementById('captureFaceBtn');
                        const registerBtn = document.getElementById('finalRegisterBtn');
                        const statusDiv = document.getElementById('faceCapStatus');
                        const camContainer = document.getElementById('regCamContainer');
                        const video = document.getElementById('regWebcam');
                        let faceCaptured = false;
                        let isCameraOpen = false;

                        captureBtn.addEventListener('click', async () => {
                            if (!isCameraOpen) {
                                // Open Camera
                                try {
                                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                                    video.srcObject = stream;
                                    activeStream = stream;
                                    camContainer.style.display = 'block';
                                    captureBtn.innerHTML = '<i class="fas fa-camera"></i> Enroll Face';
                                    captureBtn.style.background = '#007bff';
                                    statusDiv.textContent = 'Scanning...';
                                    isCameraOpen = true;
                                } catch (err) {
                                    alert('Error accessing camera: ' + err.message);
                                }
                            } else {
                                // Enroll Face (Capture)
                                stopCamera(); // Stop the stream
                                camContainer.style.display = 'none'; // Hide video
                                faceCaptured = true;
                                isCameraOpen = false;

                                captureBtn.innerHTML = '<i class="fas fa-check"></i> Face Captured';
                                captureBtn.style.background = '#28a745';
                                captureBtn.disabled = true; // Disable capture button
                                statusDiv.textContent = 'Face Data Stored';
                                statusDiv.style.color = '#28a745';

                                // Enable Register Button
                                registerBtn.disabled = false;
                                registerBtn.style.opacity = '1';
                                registerBtn.style.cursor = 'pointer';
                            }
                        });

                        document.getElementById('regForm').addEventListener('submit', (ev) => {
                            ev.preventDefault();
                            if (!faceCaptured) {
                                alert('Please capture face data first!');
                                return;
                            }
                            const name = document.getElementById('regName').value;
                            const id = document.getElementById('regId').value;
                            const dept = document.getElementById('regDept').value;
                            const email = document.getElementById('regEmail').value;

                            appState.users.push({ name, id, dept, email });
                            alert(`Success! Student ${name} (${id}) registered in database.`);
                            modal.classList.remove('active');
                        });
                    }

                    if (featureType === 'recognition') {
                        const nextBtn = document.getElementById('recogNextBtn');
                        const nameInput = document.getElementById('recogNameInput');

                        nextBtn.addEventListener('click', async () => {
                            const nameToMatch = nameInput.value.trim();
                            if (!nameToMatch) {
                                alert('Please enter a name first.');
                                return;
                            }

                            // Switch to Camera View
                            document.getElementById('recogStep1').style.display = 'none';
                            document.getElementById('recogStep2').style.display = 'block';
                            const scanningText = document.getElementById('scanningText');
                            const overlay = document.getElementById('scanOverlay');
                            const resultMsg = document.getElementById('resultMsg');

                            // Start Camera
                            try {
                                const video = document.getElementById('webcam');
                                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                                video.srcObject = stream;
                                activeStream = stream;

                                scanningText.textContent = `Scanning face for: ${nameToMatch}...`;

                                // Simulate Scanning Delay
                                setTimeout(() => {
                                    overlay.style.display = 'block';
                                }, 1000);

                                setTimeout(() => {
                                    // Check Match
                                    const user = appState.users.find(u => u.name.toLowerCase() === nameToMatch.toLowerCase());

                                    if (user) {
                                        // MATCH FOUND
                                        overlay.style.borderColor = '#0f0';
                                        overlay.style.boxShadow = '0 0 20px #0f0';
                                        resultMsg.textContent = `Attendance Marked: ${user.name}`;
                                        resultMsg.style.display = 'block';
                                        resultMsg.className = 'result-message success';
                                        scanningText.textContent = 'Face Verified Successfully';
                                        scanningText.style.color = 'green';

                                        // Log Attendance
                                        const alreadyMarked = appState.attendance.find(a => a.id === user.id);
                                        if (!alreadyMarked) {
                                            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                            appState.attendance.unshift({ id: user.id, name: user.name, time: time, status: 'Present' });
                                        }
                                    } else {
                                        // NO MATCH
                                        overlay.style.borderColor = 'red';
                                        overlay.style.boxShadow = '0 0 20px red';
                                        resultMsg.textContent = 'Not accept your face';
                                        resultMsg.style.display = 'block';
                                        resultMsg.className = 'result-message';
                                        resultMsg.style.color = 'red';
                                        resultMsg.style.border = '1px solid red';
                                        scanningText.textContent = 'Face Mismatch / User Not Found';
                                        scanningText.style.color = 'red';
                                    }
                                }, 3000);

                            } catch (err) {
                                alert('Error accessing camera: ' + err.message);
                                document.getElementById('recogStep1').style.display = 'block';
                                document.getElementById('recogStep2').style.display = 'none';
                            }
                        });
                    }

                    // Camera Logic (Detection Demo Only)
                    if (featureType === 'detection') {
                        const startBtn = document.getElementById('startCamBtn');
                        if (startBtn) {
                            startBtn.addEventListener('click', async () => {
                                try {
                                    const video = document.getElementById('webcam');
                                    const overlay = document.getElementById('scanOverlay');
                                    const resultMsg = document.getElementById('resultMsg');
                                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                                    video.srcObject = stream;
                                    activeStream = stream;
                                    startBtn.style.display = 'none';

                                    setTimeout(() => overlay.style.display = 'block', 1000);
                                    setTimeout(() => {
                                        overlay.style.borderColor = '#0f0';
                                        resultMsg.style.display = 'block';
                                        resultMsg.classList.add('success');
                                    }, 3500);
                                } catch (err) {
                                    alert('Error accessing camera: ' + err.message);
                                }
                            });
                        }
                    }
                }
            });
        });

        // Close Modal Handlers
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            stopCamera();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                stopCamera();
            }
        });
    }
});
