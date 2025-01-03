import { searchAndRender, deleteBook } from "./book.js";
import { formValidator } from "./validator.js";


const MyApp = {};


MyApp.initHomePage = () => {
  searchAndRender();
 
};

MyApp.initAuthHomePage = () => {
  searchAndRender();
 
};

MyApp.userHamburgerMenu = () => {
  const userMenuBtn = document.getElementById('userMenuBtn');
  const userMenu = document.getElementById('userMenu');
  userMenuBtn.addEventListener('click', () => {
  userMenu.classList.toggle('hidden');
});
};

MyApp.initFormValidation = () => {
 formValidator();
}

MyApp.initDropdown = () =>{
  const sortButton = document.getElementById('sortButton');
  const sortDropdown = document.getElementById('sortDropdown');

  sortButton.addEventListener('click', () => {
      sortDropdown.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
      if (!sortButton.contains(e.target)) {
          sortDropdown.classList.add('hidden');
      }
  });
}

MyApp.initBooklistPage = () => {
  // Delete confirmation functionality
  document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
          const card = e.target.closest('.relative');
          const modal = card.querySelector('.delete-modal');
          modal.classList.remove('hidden');
      });
  });

  document.querySelectorAll('.cancel-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
          const modal = e.target.closest('.delete-modal');
          modal.classList.add('hidden');
      });
  });

  document.querySelectorAll('.confirm-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
          const card = e.target.closest('.relative');
          const bookId = parseInt(e.target.dataset.id);
          deleteBook(bookId);
          card.remove();
      });
  });
}
MyApp.initEditPage = () => {
    //bookrating
  const form = document.getElementById('editBookForm');
  const ratingInput = form.querySelector('input[type="number"]');

  // Enforce rating limits
  ratingInput.addEventListener('input', (e) => {
      let value = parseInt(e.target.value);
      if (value > 10) e.target.value = 10;
      if (value < 1) e.target.value = 1;
  });
 
};
MyApp.initSlideMenu = () =>{
  const sideMenuBtn = document.getElementById('sideMenuBtn');
  const sideMenu = document.getElementById('sideMenu');
  sideMenuBtn.addEventListener('click', () => {
  sideMenu.classList.toggle('hidden');
});
}
MyApp.initAccountSetting = () => {
  const current = document.getElementById('current-password');
  const changed = document.getElementById('new-password');
  const message = document.getElementById('message');
  const form = document.getElementById('password-form');

  changed.addEventListener('input',()=>{
          const currentPassword = current.value.trim();
          const newPassword = changed.value.trim();
          if(newPassword === currentPassword){
              message.classList.remove('hidden');
          }else{
              message.classList.add('hidden');
          }
      });
}
// // Close dropdown when clicking outside
// document.addEventListener('click', function(event) {
//   const dropdown = document.getElementById('dropdownMenu');
//   const dropdownButton = event.target.closest('button');
//   if (!dropdownButton && !dropdown.classList.contains('hidden')) {
//       dropdown.classList.add('hidden');
//   }
//   });


// Universal code that runs on all pages
document.addEventListener('DOMContentLoaded', () => {
  console.log('Universal script running');
  
  const navMenuBtn = document.getElementById('navMenuBtn');
  const navLinks = document.getElementById('navLinks');


  navMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('hidden');
  });

  
  if (document.querySelector('#home-page')) {
    MyApp.initHomePage();

  }
  if (document.querySelector('#auth-home-page')) {
    MyApp.initAuthHomePage();
    MyApp.userHamburgerMenu();
  }
  if (document.querySelector('#auth-about-page')) {
    MyApp.userHamburgerMenu();
  }
  if (document.querySelector('#login-page')) {
    MyApp.initFormValidation();
  }
  if (document.querySelector('#signup-page')) {
    MyApp.initFormValidation();
  }
  if (document.querySelector('#posts-page')) {
    MyApp.userHamburgerMenu();
  }
  if (document.querySelector('#public-profile-page')) {
    MyApp.initDropdown();
    MyApp.userHamburgerMenu();
  }
  if (document.querySelector('#book-list-page')) {
    MyApp.initDropdown();
    MyApp.userHamburgerMenu();
    MyApp.initBooklistPage();
  }
  if (document.querySelector('#book-detail-page')) {
    MyApp.userHamburgerMenu();
  }
   if (document.querySelector('#myprofile-page')) {
    MyApp.initDropdown();
    MyApp.userHamburgerMenu();
   
  }
  if (document.querySelector('#edit-page')) {
    MyApp.userHamburgerMenu();
    MyApp.initEditPage();
  }
   if (document.querySelector('#account-setting-page')) {
    MyApp.userHamburgerMenu();
    MyApp.initAccountSetting();
    MyApp.initSlideMenu();
  }
  if (document.querySelector('#profile-setting-page')) {
    MyApp.userHamburgerMenu();
    MyApp.initSlideMenu();
  }
});

