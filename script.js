const imagePaths = {
    wine: ["images/wine1.jpg", "images/wine2.jpg", "images/wine3.jpg", "images/wine4.jpg", "images/wine5.jpg"],
    beer: ["images/beer1.jpg", "images/beer2.jpg", "images/beer3.jpg", "images/beer4.jpg", "images/beer5.jpg"],
    cocktail: ["images/cocktail1.jpg", "images/cocktail2.jpg", "images/cocktail3.jpg", "images/cocktail4.jpg", "images/cocktail5.jpg"]
  };
  
  const menuData = {
    wine: [
      "Cabernet Sauvignon - ₱350",
      "Chardonnay - ₱320",
      "Merlot - ₱330",
      "Sauvignon Blanc - ₱310",
      "Pinot Noir - ₱360"
    ],
    beer: [
      "San Miguel Pale Pilsen - ₱80",
      "Red Horse - ₱90",
      "Heineken - ₱120",
      "Corona Extra - ₱130",
      "Stella Artois - ₱140"
    ],
    cocktail: [
      "Margarita - ₱180",
      "Mojito - ₱170",
      "Cosmopolitan - ₱190",
      "Tequila Sunrise - ₱185",
      "Piña Colada - ₱200"
    ]
  };
  
  let orders = {};
  
  function showSection(id) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('show'));
    document.getElementById(id).classList.add('show');
  }
  
  function goToMenu() {
    const orderType = document.querySelector("input[name='orderType']:checked");
  
    if (!orderType) {
      alert("Please select an order type.");
      return;
    }
  
    const tableNumber = Math.floor(Math.random() * 30) + 1;
    document.getElementById("assignedTable").innerText = `Table: ${tableNumber}`;
    document.getElementById("assignedTable").dataset.tableNumber = tableNumber;
  
    showSection("menu");
  }
  
  function showCategory(category) {
    showSection("items");
    document.getElementById("categoryTitle").innerText = category.charAt(0).toUpperCase() + category.slice(1);
    let itemList = document.getElementById("itemList");
    itemList.innerHTML = "";
    menuData[category].forEach((item, index) => {
      let card = document.createElement("div");
      card.className = "item-card";
      card.innerHTML = `
        <img src="${imagePaths[category][index]}" alt="${item}">
        <div>${item}</div>
        <button class="item-button" onclick="addToOrder('${item}')">Add to Order</button>
      `;
      itemList.appendChild(card);
    });
  }
  
  function addToOrder(item) {
    if (orders[item]) {
      orders[item]++;
      alert(`You already added "${item.split(' - ')[0]}". Increasing quantity by 1.`);
    } else {
      orders[item] = 1;
      alert(`"${item.split(' - ')[0]}" successfully added to your order.`);
    }
  }
  
  function showReview() {
    showSection("review");
    let summaryHTML = "";
    let total = 0;
    for (let item in orders) {
      let quantity = orders[item];
      let match = item.match(/\u20b1(\d+)/);
      let price = match ? parseInt(match[1]) : 0;
      total += price * quantity;
      summaryHTML += `
        <div style="margin-bottom: 10px;">
          ${item} x${quantity} = ₱${(price * quantity).toLocaleString('en-PH')}
          <span class="quantity-controls">
            <button onclick="updateQuantity('${item}', -1)">−</button>
            <button onclick="updateQuantity('${item}', 1)">+</button>
          </span>
        </div>`;
    }
    summaryHTML += `<p><strong>Total: ₱${total.toLocaleString('en-PH')}</strong></p>`;
    document.getElementById("orderSummary").innerHTML = summaryHTML;
  }
  
  function updateQuantity(item, change) {
    if (orders[item] !== undefined) {
      orders[item] += change;
      if (orders[item] <= 0) {
        delete orders[item];
      }
      showReview();
    }
  }
  
  function goToCheckout() {
    if (Object.keys(orders).length === 0) {
      alert("You have no items in your order.");
      return;
    }
    showSection("checkout");
  }
  
  function printSummary() {
    const tableText = document.getElementById("assignedTable").innerText;
    const tableNumber = tableText.replace("Table: ", "");
    const orderType = document.querySelector("input[name='orderType']:checked").value;
    const payment = document.querySelector("input[name='payment']:checked");
  
    if (!payment) {
      alert("Please select a payment method.");
      return;
    }
  
    showSection("summary");
    let total = 0;
    let final = `<p><strong>Table:</strong> ${tableNumber}</p>`;
    final += `<p><strong>Order Type:</strong> ${orderType}</p>`;
    final += `<p><strong>Payment Method:</strong> ${payment.value}</p>`;
    final += `<p><strong>Items:</strong></p>`;
    for (let item in orders) {
      let quantity = orders[item];
      let match = item.match(/\u20b1(\d+)/);
      let price = match ? parseInt(match[1]) : 0;
      total += price * quantity;
      final += `<div>${item} x${quantity} = ₱${(price * quantity).toLocaleString('en-PH')}</div>`;
    }
    final += `<p><strong>Total: ₱${total.toLocaleString('en-PH')}</strong></p>`;
    document.getElementById("finalSummary").innerHTML = final;
  }
  
  function backToMenu() {
    showSection("menu");
  }
  
  function backToItems() {
    showSection("items");
  }
  
  function backToReview() {
    showSection("review");
  }
  