const API = "/list";

const form = document.getElementById("travelForm");
const destinationList = document.getElementById("destinationList");
const quantity = document.getElementById("quantity");

let editId = null;

window.onload = loadDestinations;


// GET ALL
async function loadDestinations() {
    const response = await fetch(API);
    const data = await response.json();
    
    destinationList.innerHTML = "";
    quantity.textContent = `${data.length} Destination`;

    if (data.length === 0) {
        destinationList.innerHTML =
        `<div class="empty">
        <h2>No Destinations Yet ✈️</h2>
        <p>Add your first dream destination.</p>
        </div>`;
        return;
    }
    
    data.forEach(item => {
        const image  = item.verified ? 
        "images/visited.jpg" : 
        "images/not-visited.jpg"
        destinationList.innerHTML += `
        <div class="destination-card">
        <div class="destination-left">
                <img src="${image}" alt="Destination">
                <div class="destination-info">
                    <h2>${item.country}</h2>
                    <h4><i class="fa-solid fa-location-dot"></i>${item.city}</h4>
                    <p><i class="fa-solid fa-star" style="color:orange"></i>${item.description}</p>
                </div>
            </div>

            <div class="actions">
                <div class="badge ${item.verified ? "visited" : "not-visited"}">
                    ${item.verified ? "✔ Visited" : "⭕ Not Visited"}
                </div>

                <div class="btn-group">
                    <button class="edit-btn"
                        onclick="editDestination(${item.id})">
                        <i class="fa-solid fa-pen"></i>
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteDestination(${item.id})">
                        <i class="fa-solid fa-trash"></i>
                        Delete
                    </button>

                </div>

            </div>

        </div>
        `;
    });

}


// ADD / UPDATE
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const destination = {
        country: document.getElementById("country").value,
        city: document.getElementById("city").value,
        description: document.getElementById("description").value,
        verified: document.getElementById("verified").value === "true"
    };

    if (editId === null) {
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(destination)
        });

    } else {

        await fetch(`${API}/${editId}`, {

            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(destination)
        });

        editId = null;

        form.querySelector("button").innerHTML =
            `<i class="fa-solid fa-plane-departure"></i> Add Destination`;

    }

    form.reset();
    loadDestinations();

});


// DELETE
async function deleteDestination(id) {

    if (!confirm("Delete this destination?")) return;
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadDestinations();

}


// EDIT
async function editDestination(id) {
    const response = await fetch(`${API}/${id}`);
    const item = await response.json();
    document.getElementById("country").value = item.country;
    document.getElementById("city").value = item.city;
    document.getElementById("description").value = item.description;
    document.getElementById("verified").value =
        item.verified.toString();

    editId = id;
    form.querySelector("button").innerHTML =
        `<i class="fa-solid fa-pen"></i> Update Destination`;
    window.scrollTo({
        top: 0,
        behavior: "smooth"

    });

}