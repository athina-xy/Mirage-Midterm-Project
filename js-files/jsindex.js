// DARK MODE
$("#darkModeBtn").on("click", function () {
    $("body").toggleClass("dark-theme");
});

// Fake Latest Activity (Later: load real tasks)
$("#latest-activity").text("A shadow creature was spotted in the Fragment of Dust...");

// API Integration (Public Quote API)
function loadQuote() {
    fetch("https://api.quotable.io/random")
        .then(res => res.json())
        .then(data => {
            let quote = `"${data.content}" — ${data.author}`;
            $("#quote-box").text(quote);
        });
}

$("#new-quote").on("click", loadQuote);

// Load first quote at page start
loadQuote();
