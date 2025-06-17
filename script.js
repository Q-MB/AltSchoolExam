// 1. Fetch Live Prices from Backend
async function fetchPrices() {
  const res = await fetch('/api/prices');
  const data = await res.json();

  document.getElementById('cement').textContent = `🧱 Cement: ₦${data.cement}`;
  document.getElementById('iron').textContent = `🔩 Iron Rods: ₦${data.iron}`;
  document.getElementById('sand').textContent = `🏖️ Sharp Sand: ₦${data.sand}`;
}

setInterval(fetchPrices, 5000);
fetchPrices(); // initial load

// 2. Handle Material Estimation Form
document.getElementById('estimate-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const inputs = e.target.elements;
  const payload = {
    buildingType: inputs[0].value,
    area: parseFloat(inputs[1].value),
    floors: parseInt(inputs[2].value)
  };

  const res = await fetch('/api/estimate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  document.getElementById('estimate-result').textContent = data.estimate;
});

// 3. Search + Filter Functionality
function filterItems(category) {
  const items = document.querySelectorAll('.item-card');
  items.forEach(item => {
    if (category === 'all' || item.classList.contains(category)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

document.getElementById('searchBar').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const items = document.querySelectorAll('.item-card');
  items.forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(query) ? 'block' : 'none';
  });
});