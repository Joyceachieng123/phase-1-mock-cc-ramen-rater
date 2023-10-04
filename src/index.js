document.addEventListener("DOMContentLoaded", () => {
    const ramenMenu = document.getElementById("ramen-menu");
    const ramenDetail = document.getElementById("ramen-detail");
    const ratingDisplay = document.getElementById("rating-display");
    const commentDisplay = document.getElementById("comment-display");
    const newRamenForm = document.getElementById("new-ramen");
  
    fetch("http://localhost:3000/ramens")
      .then((response) => response.json())
      .then((data) => {
        displayRamenMenu(data);
        // Display the details of the first ramen on page load
        if (data.length > 0) {
          displayRamenDetails(data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  
    function displayRamenDetails(ramen) {
      ramenDetail.innerHTML = `
        <img class="detail-image" src="${ramen.image}" alt="${ramen.name}" />
        <h2 class="name">${ramen.name}</h2>
        <h3 class="restaurant">${ramen.restaurant}</h3>
      `;
      ratingDisplay.textContent = ramen.rating;
      commentDisplay.textContent = ramen.comment;
    }
  
    function displayRamenMenu(ramenData) {
      ramenMenu.innerHTML = "";
      ramenData.forEach((ramen) => {
        const ramenImage = document.createElement("img");
        ramenImage.src = ramen.image;
        ramenImage.alt = ramen.name;
  
        ramenImage.addEventListener("click", () => {
          displayRamenDetails(ramen);
        });
  
        ramenMenu.appendChild(ramenImage);
      });
    }
  
    newRamenForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      
      const name = document.getElementById("new-name").value;
      const restaurant = document.getElementById("new-restaurant").value;
      const image = document.getElementById("new-image").value;
      const rating = parseInt(document.getElementById("new-rating").value);
      const comment = document.getElementById("new-comment").value;
  
      
      const newRamen = {
        name,
        restaurant,
        image,
        rating,
        comment,
      };
  
      displayRamenMenu([...ramenMenu.querySelectorAll("img")].map((ramenImage) => ({
        name: ramenImage.alt,
        restaurant: "Restaurant Name",
        image: ramenImage.src,
      })).concat(newRamen));
  
      
      newRamenForm.reset();
    });
  
  });
  