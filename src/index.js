// on page load 
  // fetch dogs
  // make table row for each
  // add table row to table

const dogsUrl = "http://localhost:3000/dogs"


document.addEventListener('DOMContentLoaded', () => {
  const dogsTable = document.getElementsByTagName('table')[0]
  const dogsForm = document.getElementById('dog-form')
  // console.log(dogsTable)

  const makeDogTr = (dogs) => {
    dogs.forEach(dog => {
      const dogTr = document.createElement('tr')
      dogTr.dataset.dogId = dog.id
      dogTr.innerHTML = `
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex}</td> 
      <td>
        <button>Edit</button>
      </td>
      `
      dogsTable.appendChild(dogTr)
    });
  };
  
  const fetchDogsFromApi = (url) => {
    fetch(dogsUrl)
    .then(resp => resp.json())
    .then(makeDogTr)
  };

  fetchDogsFromApi(dogsUrl);

  const addDogDataToForm = () => {

  };  
  
  dogsTable.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON'){
      // console.log(e.target.parentNode.parentNode)
      addDogDataToForm(e.target.parentNode.parentNode)
    };
  });



})

// const fetchDogsFromApi = (url) => {
//   fetch(url)
//   .then(resp => resp.json())
//   .then(makeDogTr)
// };

// const makeDogTr = (dogs) => {
//   dogs.forEach(dog => {
//     const dogTr = document.createElement('tr')
//     dogTr.innerHTML = `
//     <td>${dog.name}</td>
//     <td>${dog.breed}</td>
//     <td>${dog.sex}</td> 
//     <td>
//       <button>Edit</button>
//     </td>
//     `
//     dogsTable.appendChild(dogTr)
//   });
// };