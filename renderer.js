// Fetch the current Litecoin price in USD and update the display
async function fetchLTCPrice() {
  const apiURL = "https://api.coinbase.com/v2/prices/LTC-USD/spot";

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    // Get the LTC price from the API response
    const ltcPrice = data.data.amount;

    // Update the price on the page
    const priceElement = document.getElementById("price");
    priceElement.textContent = `${parseFloat(ltcPrice).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } catch (error) {
    console.error("Error fetching LTC price:", error);

    // Display an error message
    const priceElement = document.getElementById("price");
    priceElement.textContent = "Error";
  }
}

// Refresh the price every 10 seconds
setInterval(fetchLTCPrice, 10000);

// Fetch the price immediately when the page loads
fetchLTCPrice();
