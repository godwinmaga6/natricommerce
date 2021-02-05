const PRODUCTBOX = document.querySelector('#products-box .row');

function renderProduct(doc) {

    let productBox = document.createElement('div');
    let figure = document.createElement('figure');
    let img =   document.createElement('img');
    let title = document.createElement('h3');
    let description = document.createElement('p');
    let price = document.createElement('p');
    let btn = document.createElement('button');
    
    productBox.setAttribute('data-id',  doc.id);
    
    //To Display Product images
    //get product image
    STORAGE.ref(`products/${doc.id}/product.jpg`).getDownloadURL().then( imgUrl => {
        img.src = imgUrl; //set the image from DB to DOM
    })
     
    title.textContent = doc.data().name;
    description.textContent = doc.data().description;
    price.textContent = `NGN ${doc.data().price}`;
    btn.textContent = 'Buy';
    btn.classList.add('btn', 'orange', 'buy-btn');
    //style the buy button
    // const BUYBTN = document.querySelector('.buy-btn');
    // BUYBTN.style.cssText = 'margin: 5px; width: 70%;';

    figure.appendChild(img);
    productBox.appendChild(figure);
    productBox.appendChild(title);
    productBox.appendChild(description);
    productBox.appendChild(price);
    productBox.appendChild(btn);
    
    function createProductPad(){
        let col = document.createElement('div');
        let box = document.createElement('div');
        
        col.classList.add('col-xl-4', 'col-lg-4', 'col-md-6', 'col-sm-12');
        box.classList.add('products-box');
    
        col.appendChild(box);
        PRODUCTBOX.appendChild(col);
    
        box.appendChild(productBox);
    }
    ;

    createProductPad();
    // appendChild(productBox);
    };

DB.collection('products').onSnapshot(snapshots => {
        snapshots.forEach(doc => {
            renderProduct(doc);// call to render each product
            // console.log(snap);
        });
    });

