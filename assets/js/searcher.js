let  loadProducts = ()=>{
    let URL1="https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products.json";
    let URL2="https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products.xml";
    loadProOne(URL1);
    loadProTwo(URL2);
}
function formattedProducts (name, price, src, type){
    return `
    <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
        <div class="card card-blog card-plain">
        <div class="card-header p-0 mt-n4 mx-3">
            <a class="d-block shadow-xl border-radius-xl">
            <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
            </a>
        </div>
        <div class="card-body p-3">
            <p class="mb-0 text-sm">${type}</p>
            <a href="javascript:;">
            <h5>
                ${name}
            </h5>
            </a>
            <p class="mb-4 text-sm">
            <b>Price: </b> $ ${price}
            </p>
        </div>
        </div>
    </div>`;
}
function loadProOne(URL){   
   
    let list_products="";
    let products = document.getElementById("list-products");

    fetch( URL )
      .then(response => response.json() ) /* Convierte el response a JSON */
      .then(result => {   
        /* Callback por éxito: Procese el result */        
      //  console.log( result );
        for(let producto  of result){
            list_products+=formattedProducts(producto.name, producto.price, producto.src, producto.type);
        }
        products.innerHTML= list_products;
      })
      .catch(error => {        
        /* Callback por fallo: Procese el error */   

        console.log( error );

      });
      //console.log( list_products);
     // products.innerHTML =  list_products;
}

function loadProTwo(URL){   
    let list_products="";
    let products = document.getElementById("list-products");

    fetch( URL )
    .then(response => response.text() ) /* Convierte el response a texto */
    .then(result => {
        /* Callback por éxito: Procese el result */        
      //  console.log( result );
      let xml = (new DOMParser()).parseFromString(result, 'application/xml');
      let arrayProducts = xml.getElementsByTagName("product") ;
      //console.log(arrayProducts[0].getElementsByTagName("name")[0].innerHTML);
    
      if(arrayProducts.length>0){
        for(let i=0;i<arrayProducts.length;i++){
          let name = arrayProducts[i].getElementsByTagName("name")[0].innerHTML;
          let price =  arrayProducts[i].getElementsByTagName("price")[0].innerHTML;
          let img =  arrayProducts[i].getElementsByTagName("src")[0].innerHTML;
          let type =  arrayProducts[i].getElementsByTagName("type")[0].innerHTML;
          list_products+=formattedProducts(name, price, img, type);
        }
      }
      //console.log( list_products);
      products.innerHTML+= list_products;
      })
      .catch(error => {        
        /* Callback por fallo: Procese el error */   

        console.log( error );

      });
     // products.innerHTML =  list_products;
}
loadProducts();