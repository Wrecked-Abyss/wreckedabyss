document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const fileName = urlParams.get('file');

    if (fileName) {
        loadScriptContent(fileName);
    }

    // Copy Button Logic
    const copyBtn = document.getElementById('copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const code = document.querySelector('#code-block code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                copyBtn.textContent = "Copied!";
                setTimeout(() => copyBtn.textContent = "Copy Code", 2000);
            });
        });
    }
});

async function loadScriptContent(filename) {
    const codeBlock = document.querySelector('#code-block code');
    const titleElement = document.getElementById('script-title');
    const downloadLink = document.getElementById('download-link');

    try {
        // Fetches from the 'scripts' folder at the root level
        const response = await fetch(`scripts/${filename}`);
        if (!response.ok) throw new Error("File not found");
        
        const codeText = await response.text();
        
        // Update Page Content
        titleElement.innerHTML = `${filename.replace(/_/g, ' ')}`;
        codeBlock.textContent = codeText;
        
        if (downloadLink) {
            downloadLink.href = `scripts/${filename}`;
            downloadLink.setAttribute('download', filename);
        }

        // Apply Syntax Highlighting
        Prism.highlightElement(codeBlock);

    } catch (err) {
        titleElement.textContent = "Error Loading Script";
        codeBlock.textContent = `[!] ${err.message}. Ensure the file is in the /scripts/ folder.`;
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