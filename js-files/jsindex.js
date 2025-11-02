// DARK MODE
$("#darkModeBtn").on("click", function () {
    $("body").toggleClass("dark-theme");
});

$("#enterRealmBtn").on("click", function () {
    $("#revealContent").slideDown(700);

    // optional: scroll smoothly to it
    $("html, body").animate({
        scrollTop: $("#revealContent").offset().top
    }, 700);
});


$(function () {
    let current = location.pathname.split("/").pop();
    $(".nav-link").each(function () {
        if ($(this).attr("href") === current) {
            $(this).addClass("active");
        }
    });
});


// Fetch Quote from Quotable API
function loadQuote() {
   // Typewriter effect
function typeEffect(text, index = 0) {
    if (index === 0) $("#quote-box").text("");

    if (index < text.length) {
        $("#quote-box").text($("#quote-box").text() + text[index]);
        setTimeout(() => typeEffect(text, index+1), 30);
    }
}


function loadQuote() {
    fetch("https://api.quotable.io/random")
        .then(res => res.json())
        .then(data => {
            let full = `"${data.content}" — ${data.author}`;
            typeEffect(full);
        });
}

}

$("#new-quote").on("click", loadQuote);

// Load first quote automatically
loadQuote();
