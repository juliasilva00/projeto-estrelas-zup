const onLoad = async () => {
  try {
    const charactersList = await fetchCharacters();
    const scrambledList = shufullCharacters(charactersList.results);
    return renderCharacters(scrambledList.splice(0, 4));
  } catch (e) {
    console.error(e);
  }
};

const fetchCharacters = () => {
  return fetch("https://rickandmortyapi.com/api/character").then((resp) =>
    resp.json()
  );
};

const shufullCharacters = (charactersList) => {
  let randomIndex;

  for (let i = charactersList.length; i !== 0; i--) {
    randomIndex = Math.floor(Math.random() * i);

    [charactersList[i - 1], charactersList[randomIndex]] = [
      charactersList[randomIndex],
      charactersList[i - 1],
    ];
  }

  return charactersList;
};

const renderCharacters = (charactersList) => {
  const listElement = document.getElementById("characters-list");

  charactersList.forEach((character) => {
    listElement.appendChild(mountCharacters(character));
  });
};

const mountCharacters = (character) => {
  const element = document.createElement("li");
  element.classList.add("character-item");

  const image = document.createElement("img");
  image.setAttribute("src", character.image);
  image.setAttribute("alt", character.name);

  element.appendChild(image);

  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  h3.innerHTML = character.name;

  const p1 = document.createElement("p");
  const dash1 = document.createElement("span");
  dash1.innerHTML = " - ";

  const dash2 = document.createElement("span");
  dash2.innerHTML = " - ";

  const status = document.createElement("span");
  status.innerHTML = character.status;

  const specie = document.createElement("span");
  specie.innerHTML = character.species;

  const genre = document.createElement("span");
  genre.innerHTML = character.gender;

  p1.appendChild(status);
  p1.appendChild(dash1);
  p1.appendChild(specie);
  p1.appendChild(dash2);
  p1.appendChild(genre);

  const p2 = document.createElement("p");
  const originTitle = document.createElement("span");
  originTitle.classList.add("character-data-title");
  originTitle.classList.add("character-data-title");
  originTitle.innerHTML = " Origem:  ";

  const originValue = document.createElement("span");
  originValue.classList.add("character-data-value");
  originValue.innerHTML = character.origin.name;
  p2.appendChild(originValue);
  p2.appendChild(originTitle);

  const p3 = document.createElement("p");
  const locationTitle = document.createElement("span");
  locationTitle.classList.add("character-data-title");
  locationTitle.classList.add("character-data-title");
  locationTitle.innerHTML = " Localização:  ";

  const locationValue = document.createElement("span");
  locationValue.classList.add("character-data-value");
  locationValue.innerHTML = character.location.name;

  p3.appendChild(locationTitle);
  p3.appendChild(locationValue);

  div.appendChild(h3);
  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(p3);

  element.appendChild(div);

  return element;
};
