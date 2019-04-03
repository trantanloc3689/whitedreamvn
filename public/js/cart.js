function shoppingCartIndex(){
    fetchTotalProductInCart();
    totalPriceAllProduct();

    var btnShowCart = document.getElementsByClassName('icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart')[0];
    btnShowCart.addEventListener('click', showCart);

    var btnDeleteCart = document.getElementsByClassName('fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart')[0];
    btnDeleteCart.addEventListener('click',deleteAllElementCart)

}

function shoppingCartDetail(){
    fetchTotalProductInCart();
    totalPriceAllProduct();

    var btnAddCart = document.getElementsByClassName('flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail')[0];
    btnAddCart.addEventListener('click',addCart);

    var btnShowCart = document.getElementsByClassName('icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart')[0];
    btnShowCart.addEventListener('click', showCart);
}


function fetchTotalProductInCart(){
    var products = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementsByClassName('icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart')[0].setAttribute('data-notify',products.length) ;
    document.getElementsByClassName('icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart')[0].setAttribute('data-notify',products.length) ;
}

function addCart(event){
    // var productElement = event.target
    if(localStorage.getItem('cart')){
        var cart = JSON.parse(localStorage.getItem('cart'));
    } else {
        var cart = [];
    };
    var product = {
        name: document.getElementsByClassName('mtext-105 cl2 js-name-detail p-b-14')[0].innerHTML.trim(),
        price: document.getElementsByClassName('mtext-106 cl2')[0].textContent.trim().slice(0,7),
        img_url: document.getElementsByClassName('wrap-pic-w pos-relative')[0].children[0].src,
        qty: document.getElementsByClassName('mtext-104 cl3 txt-center num-product')[0].value,
        size: document.getElementsByClassName('js-select2')[0].value,
        color: document.getElementsByClassName('js-select2')[1].value,
        total:  0
    };

    cart.push(product);
    localStorage.setItem('cart',JSON.stringify(cart));

    fetchTotalProductInCart();
    totalPriceAllProduct();
}

function showCart(){
    var products =  JSON.parse(localStorage.getItem('cart'));
    // document.getElementsByClassName('mtext-106 cl2')[0].textContent.trim().slice(1)
    for(var i=0; i<products.length; i++){
        addElementCart(products[i]);
        var btnDeleteOne = document.getElementsByClassName('deleteElement')[i];
        btnDeleteOne.addEventListener('click', deleteOneElementCart);

        btnDeleteOne.addEventListener('click',(i)=>{
            var cart = JSON.parse(localStorage.getItem('cart'));
            cart.splice(i,1);
            localStorage.setItem('cart',JSON.stringify(cart));
            fetchTotalProductInCart();
            totalPriceAllProduct();
        });
    };
    
}

function displayCart(){
    deleteAllElementCart();
}

function addElementCart(product){
    var ul = document.getElementsByClassName('header-cart-wrapitem w-full')[0];
    var li = document.createElement('li');
    ul.appendChild(li);
    li.setAttribute('class','header-cart-item flex-w flex-t m-b-12')
    li.innerHTML = `
        <div class="header-cart-item-img">
            <img src="${product.img_url}" alt="IMG">
        </div>

        <div class="header-cart-item-txt p-t-8">
            <a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                ${product.name}
            </a>

            <span class="header-cart-item-info">
                ${product.qty} X ${product.price} VND | <button type="button" class="btn btn-danger btn-xs deleteElement"><img src ="../../public/images/icons/icon-close2.png"></button>
            </span>
            
        </div>`;
}

function deleteAllElementCart(){
    var ul = document.getElementsByClassName('header-cart-wrapitem w-full')[0];
    while(ul.hasChildNodes){
        ul.children[0].remove();
    }  
}

function deleteOneElementCart(event){
    event.target.parentElement.parentElement.parentElement.remove();
}

function totalPriceAllProduct(){
    var products = JSON.parse(localStorage.getItem('cart')) || [];
    var total = 0;
    if(products.length != 0){
        for(i=0;i<products.length;i++){
            total+=products[i].qty*products[i].price;
        }
    }
    document.getElementsByClassName('header-cart-total w-full p-tb-40')[0].innerHTML = 'Total:  ' + total + '.000 VND';
}


// xử lí trang checkout


function loadCart(){

    var btnShowCart = document.getElementsByClassName('icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart')[0];
    btnShowCart.addEventListener('click', showCart);

    var hidenCart = document.getElementsByClassName('fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart')[0];
    hidenCart.addEventListener('click',displayCart);
    
    var products = JSON.parse(localStorage.getItem('cart')) || [];
    for(var i=0;i<products.length;i++){
        addListCartToCheckOut(products[i]);

        var btnReduce = document.getElementsByClassName('fs-16 zmdi zmdi-minus')[i];
        btnReduce.addEventListener('click',reduceNum);

        var btnIncrease = document.getElementsByClassName('fs-16 zmdi zmdi-plus')[i];
        btnIncrease.addEventListener('click',increaseNum);

        var btnDeleteRow = document.getElementsByClassName('deleteElement')[i];
        btnDeleteRow.addEventListener('click',deleteElementRowCart);
    }
}



function addListCartToCheckOut(product){
    var table = document.getElementsByClassName('table-shopping-cart')[0];
    var tr = document.createElement('tr');
    table.appendChild(tr);
    tr.setAttribute('class','table_row');
    tr.innerHTML = `
        <td class="column-1">
            <div class="how-itemcart1">
                <img src="${product.img_url}" alt="IMG">
            </div>
        </td>
        <td class="column-2">${product.name}</td>
        <td class="column-3">${product.price} VNĐ</td>
        <td class="column-4">
            <div class="wrap-num-product flex-w m-l-auto m-r-0">
                <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                    <i class="fs-16 zmdi zmdi-minus"></i>
                </div>

                <input class="mtext-104 cl3 txt-center num-product" type="number" value="${product.qty}">

                <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                    <i class="fs-16 zmdi zmdi-plus"></i>
                </div>
            </div>
        </td>
        <td class="column-5"> ${product.qty*product.price}.000 VNĐ</td>
        <td class="column-6" style="width: 172px;padding-right: 50px;text-align: right;"> <button type="button" class="btn btn-danger btn-xs deleteElement">X</button></td>
    `;
    totalProcductOnChange();
}

function increaseNum(event){
    var qty = event.target.parentElement.parentElement.children[1].value ++;
    var price = parseInt(event.target.parentElement.parentElement.parentElement.parentElement.children[2].textContent.slice(0,3));
    event.target.parentElement.parentElement.parentElement.parentElement.children[4].innerHTML = (qty+1)*price + ".000 VNĐ" ;
    AddAllCart();
}

function reduceNum(event){
    var qty = event.target.parentElement.parentElement.children[1].value --;
    var price = parseInt(event.target.parentElement.parentElement.parentElement.parentElement.children[2].textContent.slice(0,3));
    event.target.parentElement.parentElement.parentElement.parentElement.children[4].innerHTML = (qty-1)*price +".000 VNĐ" ;
    AddAllCart();
}

function AddAllCart(){
    var cart = [];
    var products = document.getElementsByClassName('table_row');
    for(i=1;i<products.length+1;i++){
        var product = {
            name: document.getElementsByClassName('column-2')[i].innerHTML,
            price: document.getElementsByClassName('column-3')[i].textContent.slice(0,3),
            img_url: document.getElementsByClassName('how-itemcart1')[i-1].children[0].src,
            qty: document.getElementsByClassName('mtext-104 cl3 txt-center num-product')[i-1].value,
            // size: document.getElementsByClassName('js-select2')[0].value,
            // color: document.getElementsByClassName('js-select2')[1].value,
            total:  0
        };
        product.total = product.price * product.qty;
        cart.push(product);
    }
    localStorage.setItem('cart',JSON.stringify(cart));

    fetchTotalProductInCart();
    totalPriceAllProduct();
    totalProcductOnChange();
}

function totalProcductOnChange(){
    var products = JSON.parse(localStorage.getItem('cart')) || 0;
    var total = 0;
    if(products.length != 0){
        for(i=0;i<products.length;i++){
            total+=products[i].total;
        }
    }
    document.getElementsByClassName('mtext-110 cl2')[1].innerHTML = total + '.000 VND'
}

function deleteElementRowCart(event){
    event.target.parentElement.parentElement.remove();
    AddAllCart();
}
