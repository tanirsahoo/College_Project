// Select all dropdown containers
const menuContainers = document.querySelectorAll('.menu-container');
const submitButton = document.getElementById('submit-button');

// Object to store selected values
const selectedValues = {};

// Add event listeners to each dropdown
menuContainers.forEach((menuContainer, index) => {
  const toggleButton = menuContainer.querySelector('.menu-toggle-btn');
  const menuItems = menuContainer.querySelectorAll('.menu-item');
  const key = `dropdown_${index + 1}`;

  // Initialize the selected value
  selectedValues[key] = null;

  // Toggle dropdown open/close
  toggleButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent closing other dropdowns
    menuContainer.classList.toggle('open');
  });

  // Handle item selection
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent closing other dropdowns
      const selectedValue = item.getAttribute('data-value'); // Get the selected value
      selectedValues[key] = selectedValue; // Store the value in the object
      toggleButton.innerHTML = `${item.textContent} <span class="toggle-arrow">&#9662;</span>`; // Update button text
      menuContainer.classList.remove('open'); // Close dropdown
    });
  });
});

// Close dropdown if clicked outside
document.addEventListener('click', () => {
  menuContainers.forEach(menuContainer => menuContainer.classList.remove('open'));
});

// Handle Submit Button Click
submitButton.addEventListener('click', () => {
  console.log("Selected Values:", selectedValues);
  // alert(`Selected Values:\n${JSON.stringify(selectedValues, null, 2)}`);
  filter_implementation();
});



function search_work(){
  alert("Hello World");
}