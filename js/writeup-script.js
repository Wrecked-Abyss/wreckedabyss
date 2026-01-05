document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const labName = urlParams.get('lab');

    if (labName) {
        loadLab(labName);
    } else {
        document.getElementById('markdown-content').innerHTML = "<h2>No lab selected.</h2>";
    }
});

async function loadLab(name) {
    const contentDiv = document.getElementById('markdown-content');
    const filenameDisplay = document.getElementById('lab-filename');

    // Safety Check: Is 'marked' library available?
    if (typeof marked === 'undefined') {
        contentDiv.innerHTML = "<h2 style='color:red'>Error: Marked library not loaded. Check internet connection.</h2>";
        return;
    }

    try {
        const response = await fetch(`writeup/${name}.md`);
        
        if (!response.ok) {
            contentDiv.innerHTML = `<h2 style="color:red">File Not Found: writeup/${name}.md</h2>`;
            return;
        }

        const text = await response.text();
        
        // Use marked.parse() for newer versions of the library
        contentDiv.innerHTML = marked.parse(text);
        
        if (filenameDisplay) filenameDisplay.textContent = `writeup/${name}.md`;

        // Highlight code blocks
        if (window.Prism) {
            Prism.highlightAll();
        }

    } catch (err) {
        contentDiv.innerHTML = `<h2 style="color:red">Execution Error: ${err.message}</h2>`;
    }
}
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.padding = '12px 10%';
        nav.style.background = '#000500'; // White background of nav bar on scroll for light theme
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        nav.style.padding = '20px 10%';
        nav.style.background = 'transparent';
        nav.style.boxShadow = 'none';
    }
});