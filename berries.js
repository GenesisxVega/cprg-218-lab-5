/**
 * Create one card from berry data.
 */
function createCardElement(berry) {
  return `
    <li class="card">
      <div class="card-content">
        <img src="${berry.sprite}" alt="2-dimensional sprite of ${berry.name} fruit" class="berry-image">
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
 * Berry flavors data.
 */
const berryFlavors = {
  "cheri": ["spicy"],
  "chesto": ["dry"],
  "pecha": ["sweet"],
  "rawst": ["bitter"],
  "aspear": ["sour"],
  "leppa": ["spicy", "sweet", "bitter", "sour"],
  "oran": ["spicy", "dry", "sweet", "bitter", "sour"],
  "persim": ["spicy", "dry", "sweet", "bitter", "sour"],
  "lum": ["spicy", "dry", "sweet", "bitter", "sour"],
  "sitrus": ["spicy", "dry", "sweet", "bitter", "sour"],
  "figy": ["spicy"],
  "wiki": ["dry"],
  "mago": ["sweet"],
  "aguav": ["bitter"],
  "iapapa": ["sour"],
  "razz": ["spicy", "dry"],
  "bluk": ["dry", "sweet"],
  "nanab": ["sweet", "bitter"],
  "wepear": ["bitter", "sour"],
  "pinap": ["spicy", "sour"]
};

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
    const berryData = await fetchBerryDetails(berry.url);
    if (berryData) {
      const flavors = berryFlavors[berry.name] || ["Unknown"];

      // Fetch sprite image for the berry
      const spriteUrl = `http://localhost:8000/sprites/sprites/items/berries/${berry.name}-berry.png`;

      detailsList.push({
        name: berryData.name,
        flavor: flavors.join(", "),
        firmness: berryData.firmness.name,
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
    const cardFlavor = cards[i].querySelector(".subheader").textContent.toLowerCase();
    if (!cardName.includes(input) && !cardFlavor.includes(input)) {
      cards[i].style.display = "none";
    } else {
      cards[i].style.display = "block";
    }
  }
}

const searchbar = document.getElementById("searchbar");
searchbar.addEventListener("keyup", searchbarEventHandler);
