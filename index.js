let authorEl=document.getElementById("author-el");
let cryptoEl=document.getElementById("crypto-top");
fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
  .then((response) => response.json())
  .then((data) =>{
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    authorEl.innerHTML=`By: ${data.user.name}`;
  });

fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
    .then((response) => response.json())
    .then((data) =>{
        cryptoEl.innerHTML=`
        <img src=${data.image.small} />
        <span>${data.name}</span>
    `;
    })
