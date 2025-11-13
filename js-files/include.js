// include.js

$(function () {
    // Load navbar
    $("nav").load("partials/navbar.html", function () {
        // After navbar is loaded, highlight the current page
        const currentPage = location.pathname.split("/").pop() || "index.html";

        $(".nav-link").each(function () {
            const href = $(this).attr("href");
            if (href === currentPage) {
                $(".nav-link").removeClass("active");
                $(this).addClass("active");
            }
        });
    });

    // Load footer
    $("footer").load("partials/footer.html");
});
