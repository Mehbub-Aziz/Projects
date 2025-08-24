const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=1";

// Fetch Data
async function fetchCryptoData() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderTable(data);
  } catch (error) {
    document.getElementById("cryptoTable").innerHTML =
      `<tr><td colspan="4">❌ Failed to load data 😢</td></tr>`;
  }
}

// Render Table
function renderTable(data) {
  const tableBody = document.getElementById("cryptoTable");
  tableBody.innerHTML = "";

  data.forEach(coin => {
    const row = `
      <tr>
        <td>${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
          ${coin.price_change_percentage_24h.toFixed(2)}%
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Search
document.getElementById("search").addEventListener("input", async (e) => {
  const res = await fetch(API_URL);
  let data = await res.json();
  const searchText = e.target.value.toLowerCase();
  data = data.filter(coin => coin.name.toLowerCase().includes(searchText));
  renderTable(data);
});

// Refresh
document.getElementById("refresh").addEventListener("click", fetchCryptoData);

// Load on start
fetchCryptoData();
