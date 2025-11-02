// When Send button is clicked
$("#sendBtn").on("click", function () {
    let name = $("#contactName").val().trim();
    let email = $("#contactEmail").val().trim();
    let subject = $("#contactSubject").val().trim();
    let message = $("#contactMessage").val().trim();

    if (!name || !email || !subject || !message) {
        alert("Please fill all fields before sending.");
        return;
    }

    alert(
        `Message Sent!\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Subject: ${subject}\n` +
        `Message: ${message}`
    );

    // Clear fields
    $("#contactName, #contactEmail, #contactSubject, #contactMessage").val("");
});

// Pre-Order Pop-Up
$("#preorderBtn").on("click", function () {
    alert("Pre-Order Confirmed!\nThank you for supporting Mirage.");
});
