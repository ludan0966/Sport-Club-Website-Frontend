document.getElementById("registrationForm").addEventListener("submit", function (event) {
  event.preventDefault();

  let register = {
    id: document.getElementById("id").value,
    fullname: document.getElementById("fullname").value,
    address: document.getElementById("address").value,
    status: document.getElementById("status").value
  };

  let messageElement = document.getElementById("message");
  messageElement.textContent = "";

  if (!register.id.trim()) {
    messageElement.textContent = "Please enter your ID.";
    return;
  }

  if (!register.fullname.trim()) {
    messageElement.textContent = "Please enter your name.";
    return;
  }

  if (!register.address.trim()) {
    messageElement.textContent = "Please enter your address.";
    return;
  }

  if (isNaN(Number(register.id))) {
    messageElement.textContent = "Please enter a valid id.";
    return;
  }

  fetch(this.action, {
    method: this.method,
    body: JSON.stringify(register),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      Registration(data);
    })
    .catch(error => {
      messageElement.textContent = "An error occurred. Please try again later.";
      console.error("Error:", error);
    });
});

function Registration(dataObj) {
  document.getElementById("registrationForm").style.display = "none";
  let displayInfo = document.getElementById("DisplayInfo");
  displayInfo.style.display = "block";
  displayInfo.innerHTML = `
      <h2>Below is your registration information:</h2>
      <br>
      <p>ID: ${dataObj.id}</p>
      <p>Name: ${dataObj.fullname}</p>
      <p>Address: ${dataObj.address}</p>
      <p>Status: ${dataObj.status}</p>
      <p>Price: $${dataObj.price}</p>
  `;
}