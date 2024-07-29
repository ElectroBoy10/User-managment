const maxCompetitors = 500;
let competitors = [];

function updateList() {
    const list = document.getElementById('competitor-list');
    list.innerHTML = '';
    competitors.forEach((competitor, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${index + 1}. ${competitor.name} ${competitor.surname} - ${competitor.phone} (${competitor.note})
            <div class="actions">
                <button class="edit" onclick="editCompetitor(${index})">Edit</button>
                <button class="delete" onclick="removeCompetitor(${index})">Delete</button>
            </div>
        `;
        list.appendChild(listItem);
    });
    toggleSection('competitorSection', competitors.length > 0);
}

function addCompetitor() {
    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const note = document.getElementById('note').value.trim();

    if (competitors.length >= maxCompetitors) {
        alert('Maximum number of competitors reached.');
        return;
    }

    if (name && surname && phone) {
        competitors.push({ name, surname, phone, note });
        updateList();
        clearForm();
        alert('Competitor added successfully.');
    } else {
        alert('Please fill out all fields.');
    }
}

function removeCompetitor(index) {
    if (confirm('Are you sure you want to delete this competitor?')) {
        competitors.splice(index, 1);
        updateList();
      alert('Competitor deleted successfully.');
    }
}

function editCompetitor(index) {
    const name = prompt('Enter new name', competitors[index].name);
    const surname = prompt('Enter new surname', competitors[index].surname);
    const phone = prompt('Enter new phone number', competitors[index].phone);
    const note = prompt('Enter new note', competitors[index].note);

    if (name && surname && phone) {
        competitors[index] = { name, surname, phone, note };
        updateList();
        alert('Competitor updated successfully.');
    } else {
        alert('Please fill out all fields.');
    }
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('surname').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('note').value = '';
}

function clearAll() {
    if (confirm('Are you sure you want to clear all competitors?')) {
        competitors = [];
        updateList();
        alert('All competitors cleared.');
    }
}

function toggleSection(sectionId, show = true) {
    const sections = ['competitorSection', 'searchSection', 'dataManagementSection'];
    sections.forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });

    const section = document.getElementById(sectionId);
    if (section && show) {
        section.classList.remove('hidden');
    }
}

function viewWinners() {
    const winner1 = document.getElementById('winner1').value;
    const winner2 = document.getElementById('winner2').value;
    const winner3 = document.getElementById('winner3').value;

    if (winner1 && winner2 && winner3) {
        alert(`Winner 1: ${competitors[winner1 - 1] ? competitors[winner1 - 1].name : 'N/A'}
Winner 2: ${competitors[winner2 - 1] ? competitors[winner2 - 1].name : 'N/A'}
Winner 3: ${competitors[winner3 - 1] ? competitors[winner3 - 1].name : 'N/A'}`);
    } else {
        alert('Please fill out all winner fields.');
    }
}

function saveData() {
    localStorage.setItem('competitors', JSON.stringify(competitors));
    alert('Data saved successfully.');
}

function loadData() {
    const storedCompetitors = localStorage.getItem('competitors');
    if (storedCompetitors) {
        competitors = JSON.parse(storedCompetitors);
        updateList();
        alert('Data loaded successfully.');
    } else {
        alert('No data to load.');
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
}

function validatePhoneNumber(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}

function copyToClipboard() {
    const dataArea = document.getElementById('dataArea');
    const data = JSON.stringify(competitors);
    dataArea.value = data;
    dataArea.select();
    document.execCommand('copy');
    alert('Data copied to clipboard.');
}

function loadFromClipboard() {
    const dataArea = document.getElementById('dataArea');
    try {
        const data = JSON.parse(dataArea.value);
        if (Array.isArray(data)) {
            competitors = data;
            updateList();
            alert('Data loaded from text box.');
        } else {
            alert('Invalid data format.');
        }
    } catch (e) {
        alert('Invalid JSON format.');
    }
                      }
