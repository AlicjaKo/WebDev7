"use strict";

const deleteCity = async (id) => {
    try {
        const response = await fetch(`http://localhost:5001/cities/${id}`, {
            method: 'DELETE',
        });
        if (response.status === 200) {
            fetchCities(); // Refresh the city table after deletion
        } else {
            console.error(`Failed to delete city with ID ${id}`);
        }
    } catch (error) {
        console.error(error);
    }
};

const createCityRow = (city) => {
    const rowElement = document.createElement('tr');

    
    const linkElement = document.createElement('a');
    linkElement.href = 'city.html'; 
    linkElement.innerText = city.id;

    
    linkElement.onclick = () => {
        sessionStorage.setItem('cityId', city.id);
    };

    const idColumn = document.createElement('td');
    idColumn.className = 'column-id';
    idColumn.appendChild(linkElement);
    rowElement.appendChild(idColumn);

    const nameCol = document.createElement('td');
    nameCol.className = 'column-name';
    nameCol.innerText = city.city;
    rowElement.appendChild(nameCol);

    const countryCol = document.createElement('td');
    countryCol.className = 'column-country';
    countryCol.innerText = city.country;
    rowElement.appendChild(countryCol);

    const deleteColumn = document.createElement('td');
    deleteColumn.className = 'column-delete';

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'x';
    deleteButton.onclick = () => {
        deleteCity(city.id);
    };
    deleteColumn.appendChild(deleteButton);
    rowElement.appendChild(deleteColumn);

    return rowElement;
};

const populateCityTable = (data) => {
    const tableElement = document.getElementById('city-table');
    tableElement.innerHTML = "";

    data.map((city) => {
        const row = createCityRow(city)
        tableElement.appendChild(row);
    });
};

const fetchCities = async() => {
 try {
    const response = await fetch('http://localhost:5001/cities');
    const data = await response.json();
    if(data.length > 0) {
        populateCityTable(data);
    }
    console.log(data);
 } catch (error) {
    console.error(error);
 }
}

fetchCities();

const addCity = async(city) => {
    try {
        const response = await fetch('http://localhost:5001/cities/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(city)
        });
        if(response.status === 200) {
            fetchCities();
        }
    } catch (error) {
        console.error(error);
    }
}

const form = document.getElementById('city-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = {
        city: form.elements['city'].value,
        country: form.elements['country'].value
    }

    addCity(city);

    form.elements['city'].value = "";
    form.elements['country'].value = "";
    
    console.log(city);
});
