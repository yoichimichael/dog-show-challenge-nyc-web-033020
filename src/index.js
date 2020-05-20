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

  const addDogDataToForm = (dogTr) => {
    const name = dogTr.children[0].textContent
    const breed = dogTr.children[1].textContent
    const sex = dogTr.children[2].textContent

    dogsForm.dataset.dogId = dogTr.dataset.dogId
    dogsForm.children[0].value = name
    dogsForm.children[1].value = breed
    dogsForm.children[2].value = sex
  };  
  
  dogsTable.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON'){
      // console.log(e.target.parentNode.parentNode)
      addDogDataToForm(e.target.parentNode.parentNode)
    };
  });

  const sendPatchRequestAndEditDom = (dogData, dogId) => {
    fetch(`${dogsUrl}/${dogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(dogData)
    })
    .then(resp => resp.json())
    .then(dog => {
      const dogTr = document.querySelector(`tr[data-dog-id="${dog.id}"]`)
      dogTr.children[0].textContent = dog.name
      dogTr.children[1].textContent = dog.breed
      dogTr.children[2].textContent = dog.sex
      
    })

  };

  document.addEventListener('submit', (e) => {
    e.preventDefault()
    const form = e.target
    const formData = {
      name: form.name.value,
      breed: form.breed.value,
      sex: form.sex.value
    };

    sendPatchRequestAndEditDom(formData, form.dataset.dogId);

    form.reset()
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