
"use strict";
const populateTable = (data) => {
  document.getElementById("city-name").innerText = data.city;
  document.getElementById("city-country").innerText = data.country;
};

const fetchCity = async(id) => {
  try {
    const response = await fetch('http://localhost:5001/cities/' + id);
    const data = await response.json();
    populateTable(data);
  } catch (error) {
    console.log(error);
  }
};


const editButton = document.getElementById('button-edit');
const saveButton = document.getElementById('button-save');

const switchMode = ()  => {
  const cityColumn = document.getElementById('city-name');
  const countryColumn = document.getElementById('city-country');

  const cityInput = document.createElement('input');
  cityInput.id = 'name-input';
  cityInput.setAttribute('value', cityColumn.innerText);
  cityInput.setAttribute('name', 'city');
  cityColumn.innerText = "";

  const countryInput = document.createElement('input');
  countryInput.id = 'country-input';
  countryInput.setAttribute('value', countryColumn.innerText);
  countryInput.setAttribute('name', 'country');
  countryColumn.innerText = "";

  cityColumn.appendChild(cityInput);
  countryColumn.appendChild(countryInput);
  
  document.getElementById('button-edit').style.display = 'none';
  
  saveButton.style.display = 'block';
  saveButton.onclick = async () => {
      await updateCity();
  } 
}

window.onload = () => {
  const id = sessionStorage.getItem('cityId');

  editButton.style.display = 'inline';

  editButton.addEventListener('click', () => {
      switchMode();
  });

  fetchCity(id);
}



const updateCity = async () => {
    const cityColumn = document.getElementById('city-name');
    const countryColumn = document.getElementById('city-country');
    const city = {
      id: sessionStorage.getItem('cityId'),
      city: document.getElementById('name-input').value,
      country: document.getElementById('country-input').value 
    }
    try {
      const response = await fetch('http://localhost:5001/cities',{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify(city)
      });
      const data = await response.json();
      if(response.status == 200) {
        cityColumn.innerText = data.city;
        countryColumn.innerText = data.country;
        saveButton.style.display = 'none';
        editButton.style.display = 'inline';
      }
    } catch (error) {
      console.log(error);
    }
  }


 