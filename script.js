// Modální okno pro přihlášení
document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('myModal').style.display = 'flex';
});

// Zavření modálního okna
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('myModal').style.display = 'none';
});

// Simulace přihlášení
document.querySelector('#loginForm button').addEventListener('click', function(e) {
    e.preventDefault();  // Zabráníme defaultnímu odeslání formuláře
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "Vojvyb" && password === "Admin") {
        // Uložení stavu přihlášení do localStorage
        localStorage.setItem('isLoggedIn', 'true');
        document.getElementById('avatar-container').style.display = 'inline-block';
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('myModal').style.display = 'none';
        document.getElementById('addProjectBtn').style.display = 'block';  // Zobrazí tlačítko pro přidání projektu
    } else {
        alert('Špatné přihlašovací údaje!');
    }
});

// Kontrola přihlášení při načítání stránky
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('avatar-container').style.display = 'inline-block';
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('addProjectBtn').style.display = 'block';  // Zobrazí tlačítko pro přidání projektu
    }
});

// Odhlášení při kliknutí na avatar
document.getElementById('avatar').addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn');  // Odstraníme stav přihlášení
    document.getElementById('avatar-container').style.display = 'none';
    document.getElementById('loginBtn').style.display = 'inline-block';
    document.getElementById('addProjectBtn').style.display = 'none';  // Skryje tlačítko pro přidání projektu
});

// Otevření modálního okna pro přidání projektu, pokud je uživatel přihlášen
document.getElementById('addProjectBtn').addEventListener('click', function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('addProjectModal').style.display = 'flex';
    } else {
        document.getElementById('myModal').style.display = 'flex'; // Pokud uživatel není přihlášen
    }
});

// Odeslání formuláře pro přidání projektu
document.getElementById('addProjectForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Získání dat z formuláře
    const image = document.getElementById('projectImage').files[0];
    const version = document.getElementById('projectVersion').value;
    const description = document.getElementById('projectDescription').value;
    const date = new Date();

    // Vytvoření objektu pro projekt
    const project = {
        image: URL.createObjectURL(image),
        version: version,
        description: description,
        date: date
    };

    // Načteme projekty z localStorage a přidáme nový projekt
    const projects = loadProjectsFromLocalStorage();
    projects.push(project);

    // Uložíme projekty zpět do localStorage
    saveProjectsToLocalStorage(projects);

    // Přidáme projekt na stránku
    addProjectToPage(project.image, version, description, date);

    // Zavření modálního okna
    document.getElementById('addProjectModal').style.display = 'none';

    // Vyprázdnění formuláře
    document.getElementById('addProjectForm').reset();
});

// Funkce pro přidání projektu na stránku
function addProjectToPage(image, version, description, date) {
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project');

    const img = document.createElement('img');
    img.src = image;
    img.alt = 'Projektový obrázek';

    const projectInfo = document.createElement('div');
    projectInfo.classList.add('project-info');

    const dateElement = document.createElement('p');
    dateElement.textContent = 'Datum: ' + formatDate(date);
    const versionElement = document.createElement('p');
    versionElement.textContent = 'Verze: ' + version;
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;

    projectInfo.appendChild(dateElement);
    projectInfo.appendChild(versionElement);
    projectInfo.appendChild(descriptionElement);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '✏️';  // Tužka emoji pro mazání
    deleteBtn.addEventListener('click', function() {
        if (confirm('Jste si jistý, že chcete tento projekt smazat?')) {
            projectContainer.remove();
            removeProjectFromLocalStorage(image);  // Mazání z localStorage
        }
    });

    projectContainer.appendChild(img);
    projectContainer.appendChild(projectInfo);
    projectContainer.appendChild(deleteBtn);

    document.getElementById('projectsContainer').appendChild(projectContainer);
}

// Funkce pro odstranění projektu z localStorage
function removeProjectFromLocalStorage(imageUrl) {
    const projects = loadProjectsFromLocalStorage();
    const filteredProjects = projects.filter(project => project.image !== imageUrl);
    saveProjectsToLocalStorage(filteredProjects);
}

// Funkce pro formátování data na lokalizovaný formát
function formatDate(date) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(date).toLocaleDateString('cs-CZ', options);
}

// Načíst projekty z localStorage při načtení stránky
document.addEventListener('DOMContentLoaded', function() {
    const projects = loadProjectsFromLocalStorage();
    projects.forEach(project => {
        addProjectToPage(project.image, project.version, project.description, project.date);
    });
});

// Uložit projekty do localStorage
function saveProjectsToLocalStorage(projects) {
    try {
        localStorage.setItem('projects', JSON.stringify(projects));
    } catch (e) {
        console.error('Chyba při ukládání do localStorage:', e);
    }
}

// Načíst projekty z localStorage
function loadProjectsFromLocalStorage() {
    try {
        return JSON.parse(localStorage.getItem('projects')) || [];
    } catch (e) {
        console.error('Chyba při načítání z localStorage:', e);
        return [];
    }
}
