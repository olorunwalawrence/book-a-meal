const cardInfo = [
  {
    img: 'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fgrilled-flank-steak-cherry-pecan-rice-ck.jpg%3Fitok%3DG3CZbicH&w=450&c=sc&poi=face&q=85',
    title: 'rice with beaf',
    desc: 'Jollof Rice, Beef and Plantain. 4 pieces of beef per plate',
    price: 1500
  },
  {
    img: 'https://media-cdn.tripadvisor.com/media/photo-s/0c/17/d2/ec/endless-beef-ribs-with.jpg',
    title: 'beef with fires',
    desc: 'Meal consists fries, tomatos, beefs',
    price: 2200
  },
  {
    img: 'https://static.pulse.ng/img/incoming/origs7167742/5270485143-w980-h640/Pounded-yam-and-Egusi-soup.jpg',
    title: 'Pounded Yam and Egusi',
    desc: 'Meal contains 2 pieces of beef or one piece of chicken',
    price: 2500
  },
  {
    img: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
    title: 'Vegetable Sharwama and Guava Smoothie',
    desc: 'Sharwama contains no animal products, perfect for dieters',
    price: 1200
  },
  {
    img: 'http://sisijemimah.com/wp-content/uploads/2015/08/IMG_8335.jpg',
    title: 'Ewa Agoyin, Plantain and Local Fish',
    desc: '',
    price: 1500
  },
  {
    img: 'http://www.gratednutmeg.com/wp-content/uploads/2015/03/DSC_07722.jpg',
    title: 'Adalu (Beans and Corn) and Local Fish',
    desc: '',
    price: 1800
  },
  {
    img: 'http://www.kalakutahgrills.com/wp-content/uploads/2017/02/my-pics-group-3-007.jpg',
    title: 'Eba and Ogbono Soup',
    desc: 'Meals also contains Meat/Fish',
    price: 2000
  },

  {
    img: 'https://lagosmums.com/wp-content/uploads/2015/06/Jollof-Spaghetti.jpeg',
    title: 'Jollof Spaghetti, Plantain and Turkey',
    desc: '',
    price: 3000
  },
  {
    img: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Pancakes and Kiwi Smoothie',
    desc: '',
    price: 2200
  }
];

const menuMealCards = cardInfo.map(card =>
  `<div class="meal-card" id="meal-card">
    <div class="meal-card-header">
      <img src="${card.img}" alt="meal">
      <div class="menu-card-title">
        <p>${card.title}</p>
      </div>
    </div>
    <div class="meal-card-body">
      <div>
        <h3>&#8358; ${card.price}</h3>
        <p>${card.desc}</p>
      </div>
    </div>
  </div>`
);

const catererMealCards = cardInfo.map(card =>
  `<div class="meal-card" id="meal-card">
    <div class="meal-card-header">
      <img src="${card.img}" alt="meal">
      <div class="dropdown card-dropdown">
        <a href="#" id="dropdown-toggler" class="dropdown-menu">&hellip;</a>
        <div class="dropdown-content meal" data-dropdown="" id="dropdown-content">
          <a href="#add-edit-modal" id="edit-meal" >Edit</a>
          <a href="#add-edit-modal" id="delete-meal">Delete</a>
        </div>
      </div>
      <div class="menu-card-title">
        <p>${card.title}</p>
      </div>
    </div>
    <div class="meal-card-body">
      <div>
        <h3>&#8358; ${card.price}</h3>
        <p>${card.desc}</p>
      </div>
      <!--<div class="action-btns">
        <button class="btn btn-sec" id="edit-meal">Edit</button>
        <button class="btn btn-sec-danger" id="delete-meal">Delete</button>
      </div>-->
    </div>
  </div>`
);

const userMealCards = cardInfo.map(card =>
  `<div class="meal-card order-meal-card" id="meal-card">
    <div class="meal-card-header">
      <img src="${card.img}" alt="meal">
      <div class="menu-card-title">
        <p>${card.title}</p>
      </div>
    </div>
    <div class="meal-card-body">
      <div>
        <h3>&#8358; ${card.price}</h3>
        <p>${card.desc}</p>
      </div>
      <div class="meal-card-action">
        <button class="btn btn-sec meal-card-btn">Click to Order</button>
      </div>
    </div>
  </div>`
);

$('.caterer-meals #card-group').html(catererMealCards);
$('.menu-meals #card-group').html(menuMealCards);
$('.user-meals #card-group').html(userMealCards);

// $('.meal-card').on('click', '.meal-card-header', function() {
//   $(this).parent().toggleClass('no-content');
//   $(this).next('.meal-card-body').toggle(250, 'linear');
//   $(this).find('#edit-meal').on('click', function(e) {
//     console.log('tyay');
//     return showModal(e, mealModal);
//   })
// });

// if (e.target !== e.currentTarget && (e.target.id === 'edit-meal' || e.target.id === 'delete-meal')) {
//   showModal(e, mealModal);
// }
