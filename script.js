// Function to show a specific section and hide others
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Function to fetch jobs and filter by city location
const getJobsByLocation = async (city) => {
    const response = await fetch('https://project-1-database.vercel.app/jobs');
    const fetchedJobs = await response.json();

    console.log(fetchedJobs); // Log all fetched jobs
    const filteredJobs = fetchedJobs.filter(job => job.location === city);
    console.log(filteredJobs); // Log filtered jobs by city

    const jobListings = document.getElementById('job-listings');
    if (jobListings) {
        if (filteredJobs.length === 0) {
            jobListings.innerHTML = '<div>No data available</div>';
        } else {
            jobListings.innerHTML = ''; // Clear previous job listings
            filteredJobs.forEach(job => {
                const jobCard = document.createElement('div');
                jobCard.className = 'job-card';
                jobCard.innerHTML = `
                    <h3>${job.title}</h3>
                    <p>${job.location}</p>
                    <p>${job.description}</p>
                    <button onclick="showSection('apply')">Apply</button>
                `;
                jobListings.appendChild(jobCard);
            });
        }
    }
}

// Function to fetch all jobs and display them
const getJobs = async () => {
    const response = await fetch('https://project-1-database.vercel.app/jobs');
    const fetchedJobs = await response.json();
    console.log(fetchedJobs); // Log all fetched jobs

    const jobListingsPage = document.getElementById('job-listings-page');
    if (jobListingsPage) {
        jobListingsPage.innerHTML = ''; // Clear previous job listings
        fetchedJobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.className = 'job-card';
            jobCard.innerHTML = `
                <h3>${job.title}</h3>
                <p>${job.location}</p>
                <p>${job.description}</p>
                <button onclick="showSection('apply')">Apply</button>
            `;
            jobListingsPage.appendChild(jobCard);
        });
    }
}

// Call getJobs function to fetch and display jobs when the script runs
getJobs();

// Function to fetch the user's location based on IP and get jobs for that location
const getLocation = async (ip) => {
    const response = await fetch(`https://api.geoapify.com/v1/ipinfo?&apiKey=dfcb79d43b494a1ab258f5dc0bf765f0`);
    const data = await response.json();

    console.log(data.city); // Log the city derived from IP
    getJobsByLocation(data.city.name);
}

// Fetch the user's IP address and then fetch their location
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        console.log(data.ip); // Log the IP address
        getLocation(data.ip);
    })
    .catch(error => {
        console.log('Error:', error); // Log any errors
    });

// Function to display jobs in a specific container
function displayJobs(jobs, containerId) {
    const jobListings = document.getElementById(containerId);
    if (jobListings) {
        if (jobs.length === 0) {
            jobListings.innerHTML = '<div>Sorry, the job is not available.</div>';
        } else {
            jobListings.innerHTML = ''; // Clear previous job listings
            jobs.forEach(job => {
                const jobCard = document.createElement('div');
                jobCard.className = 'job-card';
                jobCard.innerHTML = `
                    <h3>${job.title}</h3>
                    <p>${job.location}</p>
                    <p>${job.description}</p>
                    <button onclick="applyForJob('${job.title}')">Apply</button>
                `;
                jobListings.appendChild(jobCard);
            });
        }
    }
}

// Function to apply for a job and show the application section
function applyForJob(jobTitle) {
    showSection('application');
}

// Event listener for the search form submission
document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally
    const jobTitle = document.getElementById('job-title').value;
    const location = document.getElementById('location').value;
    searchJobs(jobTitle, location); // Call searchJobs function with input values
});

// Function to search jobs based on title and location
async function searchJobs(jobTitle, location) {
    try {
        const response = await fetch(`https://project-1-database.vercel.app/jobs?title=${jobTitle}&location=${location}`);
        const jobs = await response.json();
        displayJobs(filterJobsByTitle(jobs, jobTitle), 'job-listings'); // Display filtered jobs
    } catch (error) {
        console.error('Error searching jobs:', error); // Log any errors
    }
}

// Function to filter jobs by title
function filterJobsByTitle(jobs, searchTitle) {
    const searchTitleLower = searchTitle.toString().toLowerCase();
    return jobs.filter(job => job.title.toLowerCase().includes(searchTitleLower));
}

// Event listener for the login form submission
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('password').value;
    alert(`Logging in with email: ${email}`); // Show alert with login details
});

// Event listener for the contact form submission
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    alert(`Message sent!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`); // Show alert with contact details
});

// Event listener for the application form submission
document.getElementById('application-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally
    const name = document.getElementById('applicant-name').value;
    const email = document.getElementById('applicant-email').value;
    const coverLetter = document.getElementById('applicant-cover-letter').value;
    alert(`Application submitted!\n\nName: ${name}\nEmail: ${email}\nCover Letter: ${coverLetter}`); // Show alert with application details
});

// Function to show the sign-up modal
function showSignUpModal() {
    document.getElementById('signup-modal').style.display = 'block';
}

// Function to close the sign-up modal
function closeSignUpModal() {
    document.getElementById('signup-modal').style.display = 'none';
}

// Event listener to close the sign-up modal when clicking outside of it
window.onclick = function (event) {
    if (event.target == document.getElementById('signup-modal')) {
        closeSignUpModal();
    }
}

// Function to validate the sign-up form
function validateSignUp(event) {
    event.preventDefault(); // Prevent form from submitting normally
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const passwordError = document.getElementById('password-error');

    if (password !== confirmPassword) {
        passwordError.style.display = 'block'; // Show error if passwords do not match
    } else {
        passwordError.style.display = 'none'; // Hide error if passwords match
        alert('Form submitted successfully!'); // Show success alert
    }
}
