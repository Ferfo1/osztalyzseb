let loggedIn = false;
let students = {};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'user' && password === 'password') {
        loggedIn = true;
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('appContent').style.display = 'block';
        loadStudents();
    } else {
        alert('Hibás felhasználónév vagy jelszó.');
    }
}

function addStudent() {
    if (loggedIn) {
        const name = document.getElementById('name').value;
        const balance = parseFloat(document.getElementById('balance').value);

        if (!name || isNaN(balance) || balance < 0) {
            console.log('Érvénytelen név vagy egyenleg.');
            return;
        }

        if (name in students) {
            console.log('Ilyen nevű tanuló már létezik.');
            return;
        }

        students[name] = { name, balance };
        updateStudentsListbox();
        saveStudents();
    } else {
        alert('Először jelentkezz be.');
    }
}

function deleteStudent() {
    if (loggedIn) {
        const select = document.getElementById('studentsList');
        const selectedStudent = select.options[select.selectedIndex].value;

        if (selectedStudent) {
            delete students[selectedStudent];
            updateStudentsListbox();
            saveStudents();
        }
    } else {
        alert('Először jelentkezz be.');
    }
}

function saveStudents() {
    if (loggedIn) {
        const dataToSave = Object.entries(students)
            .map(([name, { balance }]) => `${name},${balance}`)
            .join('\n');

        fetch('save_students.php', {
            method: 'POST',
            body: dataToSave,
        })
            .then(response => response.text())
            .then(message => console.log(message))
            .catch(error => console.error('Hiba történt:', error));
    } else {
        alert('Először jelentkezz be.');
    }
}

function loadStudents() {
    if (loggedIn) {
        fetch('load_students.php')
            .then(response => response.text())
            .then(data => {
                try {
                    const lines = data.split('\n');
                    students = {};

                    lines.forEach(line => {
                        const [name, balance] = line.split(',');
                        if (name.trim() !== '' && !isNaN(parseFloat(balance))) {
                            students[name] = { name, balance: parseFloat(balance) };
                        }
                    });

                    updateStudentsListbox();
                    saveStudents();
                } catch (error) {
                    console.error('Hiba történt a tanulók betöltése során:', error);
                }
            })
            .catch(error => console.error('Hiba történt a betöltés során:', error));
    } else {
        alert('Először jelentkezz be.');
    }
}

function withdrawMoney() {
    if (loggedIn) {
        const select = document.getElementById('studentsList');
        const selectedStudent = select.options[select.selectedIndex].value;

        if (selectedStudent) {
            try {
                const amount = parseFloat(document.getElementById('moneyAction').value);
                if (amount > 0) {
                    students[selectedStudent].balance -= amount;
                    updateStudentsListbox();
                    saveStudents();
                }
            } catch (error) {
                console.log('Érvénytelen összeg.');
            }
        }
    } else {
        alert('Először jelentkezz be.');
    }
}

function addMoney() {
    if (loggedIn) {
        const select = document.getElementById('studentsList');
        const selectedStudent = select.options[select.selectedIndex].value;

        if (selectedStudent) {
            try {
                const amount = parseFloat(document.getElementById('moneyAction').value);
                if (amount > 0) {
                    students[selectedStudent].balance += amount;
                    updateStudentsListbox();
                    saveStudents();
                }
            } catch (error) {
                console.log('Érvénytelen összeg.');
            }
        }
    } else {
        alert('Először jelentkezz be.');
    }
}

function withdrawMoneyFromAll() {
    if (loggedIn) {
        try {
            const amount = parseFloat(document.getElementById('moneyAction').value);
            if (amount > 0) {
                for (const key in students) {
                    students[key].balance -= amount;
                }
                updateStudentsListbox();
                saveStudents();
            }
        } catch (error) {
            console.log('Érvénytelen összeg.');
        }
    } else {
        alert('Először jelentkezz be.');
    }
}

function addMoneyToAll() {
    if (loggedIn) {
        try {
            const amount = parseFloat(document.getElementById('moneyAction').value);
            if (amount > 0) {
                for (const key in students) {
                    students[key].balance += amount;
                }
                updateStudentsListbox();
                saveStudents();
            }
        } catch (error) {
            console.log('Érvénytelen összeg.');
        }
    } else {
        alert('Először jelentkezz be.');
    }
}

function updateStudentsListbox() {
    if (loggedIn) {
        const select = document.getElementById('studentsList');
        select.innerHTML = '';

        let totalBalance = 0;
        for (const [key, student] of Object.entries(students)) {
            totalBalance += student.balance;
            const option = document.createElement('option');
            option.value = key;
            option.text = `${student.name} - Egyenleg: ${student.balance.toFixed(0)}`;
            select.add(option);
        }

        document.getElementById('totalBalance').innerText = `Összes egyenleg: ${totalBalance.toFixed(0)}`;
    } else {
        alert('Először jelentkezz be.');
    }
}

function autoSave() {
    if (loggedIn) {
        saveStudents();
    }
}

setInterval(autoSave, 300000);

window.onload = function() {
    // Nem szükséges betöltés a felhasználó bejelentkezése nélkül
};
