/**
 * Create one card from berry data.
 */
function createCardElement(berry) {
  return `
    <li class="card">
      <div class="card-content">
        <img src="http://localhost:8000/sprites/sprites/items/berries/${berry.name}-berry.png" alt="${berry.name}" class="berry-image">
        <h3 class="header">
          ${berry.name}
        </h3>
        <p class="subheader">
          Flavor: ${berry.flavor}<br>
          Firmness: ${berry.firmness}
        </p>
      </div>
    </li>
  `;
}

/**
* Create multiple cards from array of berry data.
*/
function createCardElements(data) {
  return data.map(createCardElement).join("");
}

/**
* Fetch list of berries.
*/
async function fetchBerriesList() {
  try {
      const response = await fetch('https://pokeapi.co/api/v2/berry/');
      const data = await response.json();
      return data.results;
      //Error handling
  } catch (error) {
      console.error(error);
  }
}

/**
* Fetch details of a berry.
*/
async function fetchBerryDetails(url) {
  try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
      //Error handling
  } catch (error) {
      console.error(error);
  }
}

/**
* Fetch details of all berries.
*/
async function fetchAllBerryDetails() {
  const detailsList = [];
  const berries = await fetchBerriesList();

  for (const berry of berries) {
      const data = await fetchBerryDetails(berry.url);
      if (data) {
          // Fetch sprite image for the berry
          const spriteUrl = `http://localhost:8000/sprites/sprites/items/berries/${berry.name}-berry.png`;
          // Push berry details with sprite URL to the details list
          detailsList.push({
              name: data.name,
              flavor: data.flavors[0].flavor.name, // Assuming each berry has at least one flavor
              firmness: data.firmness.name, // Assuming each berry has a firmness property
              sprite: spriteUrl
          });
      }
  }

  return detailsList;
}

/**
* Render Option 2 Enhanced: Display berries with search functionality.
*/
async function renderOption2Enhanced() {
  const data = await fetchAllBerryDetails();
  const cards = createCardElements(data);
  document.getElementById("option-2-enhanced-results").innerHTML = cards;
}

renderOption2Enhanced();

/**
* Option 2 Enhanced: Search bar function.
*/
function searchbarEventHandler() {
  // Get the value of the input field with id="searchbar"
  let input = document.getElementById("searchbar").value.toLowerCase().trim();
  // Get all the cards
  const enhancedResults = document.getElementById("option-2-enhanced-results");
  const cards = enhancedResults.getElementsByClassName("card");

  for (let i = 0; i < cards.length; i++) {
      // If the value of the input field is not equal to the name, flavor, or firmness of the berry, hide the card
      const cardName = cards[i].querySelector(".header").textContent.toLowerCase();
      const cardFlavorFirmness = cards[i].querySelector(".subheader").textContent.toLowerCase();
      if (!cardName.includes(input) && !cardFlavorFirmness.includes(input)) {
          cards[i].style.display = "none";
      } else {
          cards[i].style.display = "block";
      }
  }
}

const searchbar = document.getElementById("searchbar");
searchbar.addEventListener("keyup", searchbarEventHandler);
