let lastPrice = null; // Store the last price to track changes

// Fetch the current Litecoin price in USD and update the display
async function fetchLTCPrice() {
  const apiURL = "https://api.coinbase.com/v2/prices/LTC-USD/spot";

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    // Get the LTC price from the API response
    const ltcPrice = parseFloat(data.data.amount);

    // Get the price element
    const priceElement = document.getElementById("price");

    // Update the price on the page
    priceElement.textContent = ltcPrice.toLocaleString("en-US", { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });

    // If there's a previous price, compare it to the current price and update the color
    if (lastPrice !== null) {
      if (ltcPrice > lastPrice) {
        priceElement.style.color = "green"; // Price went up
      } else if (ltcPrice < lastPrice) {
        priceElement.style.color = "red"; // Price went down
      }
    }

    // Update the last price
    lastPrice = ltcPrice;
    
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
