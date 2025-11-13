// jsindex.js


// Latest Activity in home page 


// Creating storing tasks function to appear to home page
function getStoredTasks() {
    const possibleKeys = ["mirageTasks", "tasks", "taskList"];

    for (const key of possibleKeys) {
        const raw = localStorage.getItem(key);
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            } catch (e) {
                console.error("Error parsing tasks from key:", key, e);
            }
        }
    }
    return [];
}

function renderLatestActivity() {
    const tasks = getStoredTasks();
    const $box = $("#latest-activity");

    if (!tasks.length) {
        $box.html(
            `<p class="mb-0 text-center">
                <em>No echoes from the realms yet... Add tasks in the Tasks page.</em>
             </p>`
        );
        return;
    }

    const completed = tasks.filter(t => t.status === "completed" || t.completed === true).length;
    const total = tasks.length;
    const pending = total - completed;

    // Sorting the tasks by lastUpdated / dueDate / createdAt if available (newest first)
    const sorted = [...tasks].sort((a, b) => {
        const da = new Date(a.lastUpdated || a.dueDate || a.createdAt || 0);
        const db = new Date(b.lastUpdated || b.dueDate || b.createdAt || 0);
        return db - da;
    });

    const recent = sorted.slice(0, 3);

    let items = recent.map(t => {
        const name = t.name || t.title || "Unnamed task";
        const isDone = t.status === "completed" || t.completed === true;
        const statusLabel = isDone ? "Completed" : "Pending";
        const statusClass = isDone ? "text-success" : "text-warning";
        const priorityBadge = t.priority
            ? `<span class="badge bg-secondary ms-1">${t.priority}</span>`
            : "";

        return `
            <li class="mb-1">
                <strong>${name}</strong>${priorityBadge}
                <span class="${statusClass} ms-1">(${statusLabel})</span>
            </li>
        `;
    }).join("");

    if (!items) {
        items = `<li>No recent events.</li>`;
    }

    $box.html(`
        <p class="mb-2">
            <strong>Task Summary</strong><br>
            Total: ${total} • Pending: ${pending} • Completed: ${completed}
        </p>
        <ul class="mb-0 ps-3">
            ${items}
        </ul>
    `);
}


// Archives section (API)


function setQuoteLoading() {
    $("#quote-box").html(
        `<p class="mb-0 text-center">
            Tuning into the Crystal Archives...
         </p>`
    );
}

function setQuoteError() {
    $("#quote-box").html(
        `<p class="mb-0 text-center">
            <em>The crystal is silent. Try again in a moment.</em>
         </p>`
    );
}

function setQuote(text, author) {
    const safeText = text || "The realms speak in whispers only the brave can hear.";
    const safeAuthor = author ? `— ${author}` : "";

    $("#quote-box").html(`
        <p class="mb-1">"${safeText}"</p>
        <p class="mb-0 text-end"><small>${safeAuthor}</small></p>
    `);
}

// API 
function fetchQuote() {
    setQuoteLoading();

    fetch("https://api.adviceslip.com/advice")
        .then(resp => {
            if (!resp.ok) throw new Error("Network response was not ok");
            return resp.json();
        })
        .then(data => {
            const text = data && data.slip && data.slip.advice
                ? data.slip.advice
                : "Sometimes the clearest path appears only after you take the first step.";

            // AdviceSlip has no author, so we assign a random name that suits Mirage
            const author = "Whisper from the Crystal Archives";
            setQuote(text, author);
        })
        .catch(err => {
            console.error("Quote fetch error:", err);

            // In case API fails, display some Mirage-styled quotes 
            const fallbackQuotes = [
                {
                    text: "In a world of fractured mirrors, every shard hides a possible you.",
                    author: "Crystal Archives"
                },
                {
                    text: "Not all exiles are lost; some are simply ahead of their time.",
                    author: "Old Mirage Proverb"
                },
                {
                    text: "Balance is not the absence of chaos, but learning to dance with it.",
                    author: "Sylwen"
                }
            ];
            const random = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
            setQuote(random.text, random.author || "Crystal Archives");
        });
}


// Page transition


$(function () {
    // Reveal section when button clicked
    $("#enterRealmBtn").on("click", function () {
        const $section = $("#revealContent");

        $section.slideDown(600, function () {
            // After reveal, load API and latest activity
            fetchQuote();
            renderLatestActivity();

            // Smooth scroll to the revealed section
            $("html, body").animate(
                { scrollTop: $section.offset().top - 20 },
                600
            );
        });
    });

    // Refresh quote button
    $("#new-quote").on("click", function () {
        fetchQuote();
    });
});
