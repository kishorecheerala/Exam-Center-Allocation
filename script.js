
//Object array to store the cities and exam centers
const examCenters = {
    "hyderabad": ["Hyderabad-1", "Hyderabad-2", "Hyderabad-3", "Hyderabad-4"],
    "kolkata": ["Kolkata-1", "Kolkata-2", "Kolkata-3", "Kolkata-4"],
    "mumbai": ["Mumbai-1", "Mumbai-2", "Mumbai-3", "Mumbai-4"],
    "delhi": ["Delhi-1", "Delhi-2", "Delhi-3", "Delhi-4"],
    "banglore": ["Banglore-1", "Banglore-2", "Banglore-3", "Banglore-4"],
};


const userForm = document.getElementById("userForm");
const userDetails = document.getElementById("user-details");

// Create a new Set to store allocated email addresses
const allocatedEmails = new Set();

// Event listener for form submission
userForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const selectedCity = document.getElementById("city").value;

    // Check if email is already allocated
    if (allocatedEmails.has(email)) {
        alert(`Email (${email}) already exists. Please use a unique email.`);
        return;
    }

    const allocatedCenter = getRandomCenter(selectedCity);
    allocatedEmails.add(email);

    const user = {
        name,
        email,
        center: allocatedCenter,
    };

    displayUserDetails(user);
    displayGoodLuckMessage(user); // Call the function to display the message

    userForm.reset(); // Reset the form fields

    // Focus on the Name input field after submission
    document.getElementById("name").focus();

});

//function to generate the random center from the selected city

function getRandomCenter(city) {

    const centers = examCenters[city];
    const randomIndex = Math.floor(Math.random() * centers.length);

    return centers[randomIndex];
}

//function to display the user details on the HTML page

function displayUserDetails(user) {
    const userDetailElement = document.createElement("div");
    userDetailElement.classList.add("user-detail");
    userDetailElement.innerHTML = `
        <h3>User Information</h3>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Exam Center:</strong> ${user.center}</p>
    `;
    userDetails.appendChild(userDetailElement);

    const hrElement = document.createElement("hr");
    userDetails.appendChild(hrElement); // Add <hr> after each user detail

    userDetails.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of user-details

}

function displayGoodLuckMessage(user){

const goodLuckMessage = document.getElementById("good-luck-message");

//Reset opacity and Show the message by updating its display property
goodLuckMessage.style.opacity = "1";
goodLuckMessage.style.display = "block";

// Update the content of the message with the user's name
goodLuckMessage.innerText = `Good luck, ${user.name}! Your exam center is assigned. All the best!`;

 setTimeout(() => {
            goodLuckMessage.style.opacity = "0"; // Start fading out
            setTimeout(() => {
                goodLuckMessage.style.display = "none"; // Hide after fading out
            }, 500); // Wait for the fade-out transition duration
    }, 5000); // Hide the message after 5000 milliseconds (5 seconds)
}

resetButton.addEventListener("click", function() {
    const resetButton = document.getElementById("resetButton");
    // Clear user details and reset the form
    userDetails.innerHTML = ""; // Clear the user details div
    allocatedEmails.clear(); // Clear allocated emails set
    userForm.reset(); // Reset the form fields
});