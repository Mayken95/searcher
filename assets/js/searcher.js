const URL1 = "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json";
const URL2 = "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml";
let  loadProducts = ()=>{
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

function filterByProduct(text_product){
  let list_products="";
  let list_products2="";
    let products = document.getElementById("list-products");
    fetch( URL1 )
      .then(response => response.json() ) /* Convierte el response a JSON */
      .then(result => {   
        /* Callback por éxito: Procese el result */        
      //  console.log( result );
      let productos_filter= result.filter(producto=> (text_product.toLowerCase()==producto.name.toLowerCase() || text_product.toLowerCase()==producto.type.toLowerCase()));
      for(let producto  of  productos_filter){
          list_products+=formattedProducts(producto.name, producto.price, producto.src, producto.type);
      }
        products.innerHTML= list_products;
      })
      .catch(error => {        
        /* Callback por fallo: Procese el error */ 
        console.log( error );

      });
      fetch( URL2 )
      .then(response => response.text()  ) /* Convierte el response a JSON */
      .then(result => {   
        let xml = (new DOMParser()).parseFromString(result, 'application/xml');
        let arrayProducts = xml.getElementsByTagName("product") ;
        //let result_filter = arrayProducts.filter(product => (product.getElementsByTagName("name")[0].innerHTML==text_product || product.getElementsByTagName("name")[0].innerHTML==text_product));
        if(arrayProducts.length>0){
          for(let i=0;i<arrayProducts.length;i++){
            if(arrayProducts[i].getElementsByTagName("name")[0].innerHTML.toLowerCase()==text_product.toLowerCase() ||arrayProducts[i].getElementsByTagName("type")[0].innerHTML.toLowerCase()==text_product.toLowerCase() ){
            let name = arrayProducts[i].getElementsByTagName("name")[0].innerHTML;
            let price =  arrayProducts[i].getElementsByTagName("price")[0].innerHTML;
            let img =  arrayProducts[i].getElementsByTagName("src")[0].innerHTML;
            let type =  arrayProducts[i].getElementsByTagName("type")[0].innerHTML;
            list_products2+=formattedProducts(name, price, img, type);
            }
          }
        }
       // console.log("aqiooo "+ result_filter);
        products.innerHTML+= list_products2;
      })
      .catch(error => {        
        /* Callback por fallo: Procese el error */   

        console.log( error );

      });
}
loadProducts();

let btn_filter = document.getElementById("filter");

btn_filter.addEventListener('click', (event) => {
  var box_product= document.getElementById("text").value;
  if(box_product==""||box_product==undefined){
    loadProducts();
  }else{
    filterByProduct(box_product);
  }

});