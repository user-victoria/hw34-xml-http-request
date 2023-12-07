// Є масив з посадами ['investor', 'manager', 'assistant', 'worker']
/*
    1. Для кожної посади створити файл в форматі .json, який заповнити рандомними даними
    2. Зробити запит на масив з посадами і для кожної посади зробити запит на створений файл.
       (наприклад - manager -> manager.json)
    3. Дані з файлів вивести в таблицю на UI
    4. Зробити так, щоб запити були в строгій послідовності - всі посади від investor до worker
       (Щоб investor завжди виводився першим, worker - останнім)
*/

const refs = {
    tableRef: document.querySelector('table'),
}

let globalPositions;

// worker.json
function getWorker(worker) {
    let tr = document.createElement('tr');

    for (let j = 0; j < 3; j++) {
        let td = document.createElement('td');
        tr.append(td);

        if (j === 0) {
            td.textContent = worker.position;
        }
        if (j === 1) {
            td.textContent = worker.name;
        }
        if (j === 2) {
            td.textContent = worker.age;
        }
    }

    refs.tableRef.append(tr);
}

// assistant.json
function getAssistant(assistant) {
    let tr = document.createElement('tr');

    for (let j = 0; j < 3; j++) {
        let td = document.createElement('td');
        tr.append(td);

        if (j === 0) {
            td.textContent = assistant.position;
        }
        if (j === 1) {
            td.textContent = assistant.name;
        }
        if (j === 2) {
            td.textContent = assistant.age;
        }
    }

    refs.tableRef.append(tr);

    getFile(`./json/${globalPositions[3]}.json`, getWorker);
}

// manager.json
function getManager(manager) {
    let tr = document.createElement('tr');

    for (let j = 0; j < 3; j++) {
        let td = document.createElement('td');
        tr.append(td);

        if (j === 0) {
            td.textContent = manager.position;
        }
        if (j === 1) {
            td.textContent = manager.name;
        }
        if (j === 2) {
            td.textContent = manager.age;
        }
    }

    refs.tableRef.append(tr);

    getFile(`./json/${globalPositions[2]}.json`, getAssistant);
}

// investor.json
function getInvestor(investor) {
    let tr = document.createElement('tr');

    for (let j = 0; j < 3; j++) {
        let td = document.createElement('td');
        tr.append(td);

        if (j === 0) {
            td.textContent = investor.position;
        }
        if (j === 1) {
            td.textContent = investor.name;
        }
        if (j === 2) {
            td.textContent = investor.age;
        }
    }

    refs.tableRef.append(tr);

    getFile(`./json/${globalPositions[1]}.json`, getManager);
}

// positions.json
function getPositions(positions) {
    globalPositions = positions;
    getFile(`./json/${positions[0]}.json`, getInvestor);
}

// all positions
function getFile(file, callback) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', file);
    xhr.send();

    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4) {
            const isStatus = xhr.status >= 200 && xhr.status < 400;
            const response = isStatus ? JSON.parse(xhr.response) : [];

            callback(response);
        }
    });
}
getFile('./json/positions.json', getPositions);