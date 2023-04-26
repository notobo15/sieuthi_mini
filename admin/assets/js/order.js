

function LoadOrder() {
    return new Promise((resolve, reject) => {
        var xml = new XMLHttpRequest();


        xml.open("GET", 'http://localhost:3000/api/user/order/list', true);
        xml.send();
        xml.onload = function () {
            let orders = JSON.parse(this.responseText);
            var html = document.createElement('tr');
            html.innerHTML = ` <td>${orders[0].order_timestamp}</td>
                                <td>${orders[0].order_id}</td>
                                <td>${orders[0].user_id}</td>
                                <td>${orders[0].totalPrice}</td>
                                <td>
                                    <p class="status ${orders[0].status}">${orders[0].status}</p>
                                </td>
                                <td>
                                    <button class="approve" value="${orders[0].order_id}">Approve</button>
                                    <button class="view" value="${orders[0].order_id}">View</button>
                                    <button class="delay" value="${orders[0].order_id}">Delay</button>
                                </td>`;

            document.querySelector('#order_container .order_table tbody').append(html);

            resolve();
        }

        xml.onerror = function () {
            console.log("** An error occurred during the load order");
            reject();
        }

        xml.onprogress = (event) => { // triggers periodically
            // event.loaded - how many bytes downloaded
            // event.lengthComputable = true if the server sent Content-Length header
            // event.total - total number of bytes (if lengthComputable)
            console.log(`Received ${event.loaded} of ${event.total}: ${event.lengthComputable}`);
        };
    });
}


function Approve() {
    var approves = document.querySelectorAll(".order_table tbody .approve");
    approves.forEach(approve => {
        approve.addEventListener('click', () => {
            let order = approve.parentNode.parentNode
            let status = order.querySelector('.status');

            (status.classList.contains('processing')) ? status.classList.remove('processing') : status.classList.remove('delayed')
            status.classList.add('approved')
            status.innerHTML = 'approved';

            let xml = new XMLHttpRequest();
            xml.open('POST', `http://localhost:3000/api/user/order/edit/${approve.value}`)
            xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xml.send('status=approved')
            xml.onload = function () {
                if (this.status === 200) {
                    console.log(`Order approved complete - ${xml.statusText}`)
                }
            }
        })
    })
}

function View() {

    var views = document.querySelectorAll(".order_table tbody .view");
    views.forEach(view => {
        view.addEventListener('click', () => {
            let xml = new XMLHttpRequest();
            xml.open('GET', `http://localhost:3000/api/user/order/${view.value}`)
            xml.send();
            xml.onload = function () {
                let carts = JSON.parse(this.responseText);
                let rows = ``;
                for (const cart of carts) {
                    rows += ` <tr>
                         <td> ${cart.product_id} </td>
                         <td><img src="http://localhost:3000/img/products/${cart.img}" alt=""></td>
                         <td>${cart.name}</td>
                         <td> ${cart.price} </td>
                         <td> <p class="status pending">${cart.quantity}</p></td>
                     </tr>`
                }

                let html = document.createElement('section');
                html.id = "cart";
                html.innerHTML = `
                    <div class="cart_header">
                        <button class="close">&times;</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Id<span class="icon-arrow">&UpArrow;</span></th>
                                <th>image<span class="icon-arrow">&UpArrow;</span></th>
                                <th>Name<span class="icon-arrow">&UpArrow;</span></th>
                                <th>Price <span class="icon-arrow">&UpArrow;</span></th>
                                <th>Quantity<span class="icon-arrow">&UpArrow;</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>`;
                document.querySelector('.main').appendChild(html);

                // ----------------------------------- Close cart ----------------------------------- //
                let close = document.querySelector('#cart .cart_header .close')
                close.onclick = () => { document.querySelector('.main').removeChild(close.parentNode.parentNode) };

                window.addEventListener('click', function RmCart(event) {
                    let cart = this.document.querySelector('#cart') || null;
                    if (cart && (event.target !== cart && !cart.contains(event.target))){
                        document.querySelector('.main').removeChild(cart);
                        window.removeEventListener('click', RmCart);
                    }
                    else if (cart === null) {
                        window.removeEventListener('click', RmCart);
                    }
                })
            }
        })
    })


}


function Delay() {
    var delays = document.querySelectorAll(".order_table tbody .delay");
    for (const delay of delays) {
        delay.addEventListener('click', () => {
            let order = delay.parentNode.parentNode
            let status = order.querySelector('.status');
            (status.classList.contains('processing')) ? status.classList.remove('processing') : status.classList.remove('approved')
            status.classList.add('delayed')
            status.innerHTML = 'delayed';

            let xml = new XMLHttpRequest();
            xml.open('POST', `http://localhost:3000/api/user/order/edit/${delay.value}`)
            xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xml.send('status=delayed')
            xml.onload = function () {
                if (this.status === 200) {
                    console.log(`Order delay complete - ${xml.statusText}`)
                }
            }
        })
    }
}






//---------------------------- Active functions -------------------------------------//

LoadOrder()
    .then(() => {
        Approve();
        View();
        Delay();
    })
    .catch(() => {
        console.log("fail load order to table!")
    });

function ReLoadOrder() {
    var reload = document.querySelector('#order_container .reload_order')
    reload.addEventListener('click', () => {
        document.querySelector('#order_container .order_table tbody').replaceChildren();
        LoadOrder().then(() => {
            Approve();
            View();
            Delay();
        })
        .catch(() => {
            console.log("fail load order to table!")
        });;
    })
}

ReLoadOrder();
