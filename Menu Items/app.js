const menu = [
  {
    id: 1,
    title: "pancakes",
    category: "breakfast",
    price: 17.95,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner",
    category: "breakfast",
    price: 11.95,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "milkshake",
    category: "breakfast",
    price: 16.95,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "cake",
    category: "lunch",
    price: 20.95,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "fry",
    category: "lunch",
    price: 12.95,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "dinner",
    category: "dinner",
    price: 18.95,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
];
// SELECTORS
const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

window.addEventListener("DOMContentLoaded", () => {
  showMenus(menu);
  loadBtns();
});

function showMenus(menu) {
  const menuItem = menu
    .map((item) => {
      return `<article class="menu-item">
    <img src="${item.img}" alt="menu item" class="photo" />
    <div class="item-info">
      <header>
        <h4>${item.title}</h4>
        <h4 class="price">$${item.price}</h4>
      </header>
      <p class="item-text">
      ${item.desc}
      </p>
    </div>
  </article>`;
    })
    .join("");

  sectionCenter.innerHTML = menuItem;
}

function loadBtns() {
  const categories = menu.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );

  const btns = categories
    .map((category) => {
      return `<button type="button" class="filter-btn" data-id="${category}">${category}</button>`;
    })
    .join("");

  btnContainer.innerHTML = btns;
  const filterBtns = btnContainer.querySelectorAll(".filter-btn");

  btnFilter(filterBtns);
}

function btnFilter(filterBtns) {
  filterBtns.forEach((btns) => {
    btns.addEventListener("click", (e) => {
      const category = e.target.dataset.id;
      const items = menu.filter((item) => {
        if (category === item.category) {
          return item;
        }
      });
      if (category === "all") {
        showMenus(menu);
      } else {
        showMenus(items);
      }
    });
  });
}
