// Load saved mode on page load
$(function () {
    const isDark = localStorage.getItem("theme") === "dark";
    if (isDark) {
        $("body").addClass("dark-theme");
        $("#themeToggle").prop("checked", true);
        $(".mode-text").text("Dark");
    }
});

// Toggle mode
$("#themeToggle").on("change", function () {
    $("body").toggleClass("dark-theme");

    const darkEnabled = $("body").hasClass("dark-theme");
    localStorage.setItem("theme", darkEnabled ? "dark" : "light");

    $(".mode-text").text(darkEnabled ? "Dark" : "Light");
});
