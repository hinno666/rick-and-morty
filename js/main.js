
const form = document.querySelector(".search__form");
const input = document.querySelector(".search__input");
const cardParent = document.querySelector(".results__list");


function showCard(image, name, status, species, gender) {
    const card = `
                 <li class="results__item">
                <img class="results__image" src="${image}" alt="${name}">
                <h3 class="results__title">${name}</h3>
                <p class="results__text">Status: ${status}</p>
                <p class="results__text">Species: ${species}</p>
                <p class="results__text">Gender: ${gender}</p>
            </li>
                    `;

    //Добавляем карточку в родителя

    cardParent.insertAdjacentHTML('beforeend', card);
}



form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let characterName = input.value;

    const url = `https://rickandmortyapi.com/api/character/?name=${characterName}`;

    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
         while (cardParent.firstChild) {
           cardParent.removeChild(cardParent.firstChild);
         }
         data.results.forEach((result) => {
           showCard(
             result.image,
             result.name,
             result.status,
             result.species,
             result.gender
           );
         });
    })
    form.reset();
});