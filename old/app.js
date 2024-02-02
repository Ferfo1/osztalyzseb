let loggedIn = false;
let students = {};
let registering = false;

function switchForm() {
    if (registering) {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
    } else {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    }
    registering = !registering;
}

function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const password2 = document.getElementById('registerPassword2').value;


    if (username.trim() === '' || password.trim() === '') {
        alert('A felhasználónév és jelszó megadása kötelező!');
        return;
    }

    if (username.trim() === '' ) {
        alert('Felhasználónév megadása kötelező.');
        return;
    }

    if (password.trim() === '') {
        alert('Jelszó megadása kötelező')
    }

    fetch('register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&password2=${encodeURIComponent(password2)}`,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loggedIn = true;
                document.getElementById('loginForm').style.display = 'none';
                document.getElementById('appContent').style.display = 'block';
                loadStudents(data.username);
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Hiba történt:', error));
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loggedIn = true;
                document.getElementById('loginForm').style.display = 'none';
                document.getElementById('appContent').style.display = 'block';
                loadStudents(data.username);
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Hiba történt:', error));
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
            fetch('delete_users.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: selectedStudent,
                }),
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        console.log(result.message);

                        delete students[selectedStudent];
                        updateStudentsListbox();

                        saveStudents();
                    } else {
                        console.error(result.message);
                    }
                })
                .catch(error => console.error('Hiba történt:', error));
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
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    console.log(result.message);
                } else {
                    console.error(result.message);
                }
            })
            .catch(error => console.error('Hiba történt:', error));
    } else {
        alert('Először jelentkezz be.');
    }
}



function loadStudents(username) {
    if (loggedIn) {
        fetch(`load_students.php?username=${encodeURIComponent(username)}`)
            .then(response => response.text())
            .then(data => {
                try {
                    const parsed = JSON.parse(data)

                    students = {};

                    console.log(JSON.parse(data))

                    parsed.data.forEach(d => {
                        if (d.name.trim() !== '' && !isNaN(parseFloat(d.balance))) {
                            students[d.name] = { name: d.name, balance: parseFloat(d.balance) };
                        }
                    });

                    updateStudentsListbox();
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
};
