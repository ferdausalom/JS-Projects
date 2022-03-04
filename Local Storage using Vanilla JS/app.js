// ****** select items **********
const groceryForm = document.querySelector(".grocery-form");
const alertTxt = groceryForm.querySelector(".alert");
const submitBtn = groceryForm.querySelector(".submit-btn");
const grocery = document.getElementById("grocery");
const groceryContainer = document.querySelector(".grocery-container");
const groceryList = groceryContainer.querySelector(".grocery-list");
const clearBtn = groceryContainer.querySelector(".clear-btn");

// show-container

let editingItem = false;
let itemID = "";
let elementValue;

window.addEventListener("DOMContentLoaded", showFromLocal);

groceryForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = grocery.value;

  if (value && !editingItem) {
    const id = new Date().getTime().toString();

    const element = document.createElement("article");
    element.classList.add("grocery-item");
    element.setAttribute("data-id", id);
    element.innerHTML = `<p class="title">${value}</p>
      <div class="btn-container">
        <!-- edit btn -->
        <button type="button" class="edit-btn">
          <i class="fas fa-edit"></i>
        </button>
        <!-- delete btn -->
        <button type="button" class="delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    groceryList.appendChild(element);
    groceryContainer.classList.add("show-container");

    const editBtn = element.querySelector(".edit-btn");
    const deleteBtn = element.querySelector(".delete-btn");
    editBtn.addEventListener("click", editItem);
    deleteBtn.addEventListener("click", deleteItem);

    addToLocalStorage(id, value);
    showAlert("Item added", "success");
    setToDefault();
  } else if (value && editingItem) {
    elementValue.innerHTML = value;
    showAlert("Item Updated", "success");
    editFromStorage(itemID, value);
    setToDefault();
  } else {
    alert("Insert Item");
  }
});

function setToDefault() {
  grocery.value = "";
  submitBtn.textContent = "Submit";
  editingItem = false;
  itemID = "";
  elementValue = "";
}

clearBtn.addEventListener("click", () => {
  showAlert("Cleared Items", "danger");

  groceryContainer.classList.remove("show-container");
  groceryList.innerHTML = "";
});

function showAlert(text, alertClass) {
  alertTxt.innerHTML = text;
  alertTxt.classList.add(`alert-${alertClass}`);
  setTimeout(() => {
    alertTxt.innerHTML = "";
    alertTxt.classList.remove(`alert-${alertClass}`);
  }, 2000);
}

function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // const item = element.querySelector(".title");
  elementValue = e.currentTarget.parentElement.previousElementSibling;
  grocery.value = elementValue.innerHTML;
  submitBtn.textContent = "Update";
  editingItem = true;
  itemID = element.dataset.id;
}

function deleteItem(e) {
  const item = e.currentTarget.parentElement.parentElement;
  const id = item.dataset.id;
  if (groceryList.children.length > 1) {
    removeFromStorage(id);
    item.remove();
    showAlert("Items Deleted", "danger");
  } else {
    showAlert("Item Deleted", "danger");
    removeFromStorage(id);
    groceryContainer.classList.remove("show-container");
    groceryList.innerHTML = "";
  }
}

function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = setLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function setLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function showFromLocal() {
  let items = setLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      createItem(item.id, item.value);
    });
  }
}

function editFromStorage(id, value) {
  let items = setLocalStorage();
  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function removeFromStorage(id) {
  let items = setLocalStorage();
  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}

// localStorage.removeItem("list");

function createItem(id, value) {
  const element = document.createElement("article");
  element.classList.add("grocery-item");
  element.setAttribute("data-id", id);
  element.innerHTML = `<p class="title">${value}</p>
      <div class="btn-container">
        <!-- edit btn -->
        <button type="button" class="edit-btn">
          <i class="fas fa-edit"></i>
        </button>
        <!-- delete btn -->
        <button type="button" class="delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
  groceryList.appendChild(element);
  groceryContainer.classList.add("show-container");
  const editBtn = element.querySelector(".edit-btn");
  const deleteBtn = element.querySelector(".delete-btn");
  editBtn.addEventListener("click", editItem);
  deleteBtn.addEventListener("click", deleteItem);
}
