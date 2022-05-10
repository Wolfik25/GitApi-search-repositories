
let searchInput = document.querySelector('.search__input');

function createCard(names, owners, star) {
    let list = document.createElement('li');
    list.className = 'repo__element';

    let divLeft = document.createElement('div');
    let divRight = document.createElement('div');

    let name = document.createElement('p');
    name.className = 'repo__data';
    name.textContent = `Name: ${names}`
    let owner = document.createElement('p');
    owner.className = 'repo__data';
    owner.textContent = `Owner: ${owners} `
    let stars = document.createElement('p');
    stars.className = 'repo__data';
    stars.textContent = `Stars: ${star}`

    let button = document.createElement('button');
    button.className = 'repo__delete';

    button.addEventListener('click', () => {
        list.remove();
    })

    repositories.append(list);
    list.append(divLeft);
    list.append(divRight);
    divLeft.append(name);
    divLeft.append(owner);
    divLeft.append(stars);
    divRight.append(button)
}

function checkForBlank() {
    let inp = document.querySelector('.search__input');
    if (inp.value === '') {
        document.querySelectorAll('.show__result').forEach(el => el.remove());
    }
}

function search() {
    let debounce;
    searchInput.addEventListener('keyup', (event) => {
        checkForBlank();
        clearTimeout(debounce);
        if (event.target.value.trim().length > 0) {
            return debounce = setTimeout(() => fetch(`https://api.github.com/search/repositories?q=${event.target.value}&&per_page=5`)
                .then((res) => {
                    if (res.ok) {
                        res.json().then(res => {
                            document.querySelectorAll('.show__result').forEach(el => el.remove());
                            createAutocompliteList(res.items);
                        })
                    }
                }), 1000)
        }
    })
}

function createAutocomplite(el) {
    let li = document.createElement('li');
    li.className = 'show__result';
    li.innerHTML = `${el.name}`;
    let names = `${el.name}`;
    let owners = `${el.owner.login}`;
    let star = `${el.stargazers_count}`;
    li.addEventListener('click', createCard.bind(this, names, owners, star));
    let inp = document.querySelector('.search__input');
    li.addEventListener('click', () => { document.querySelectorAll('.show__result').forEach(el => el.remove()); return inp.value = '' });
    repo.append(li);
}

function createAutocompliteList(data) {
    for (el of data) {
        createAutocomplite(el);
    }
}

search();