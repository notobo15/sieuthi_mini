function LoadDiscount() {
    return new Promise((resolve, reject) => {
        var xml = new XMLHttpRequest();
        xml.open("GET", 'http://localhost/sieuthi_mini_api_php/api/discount/list.php', true);
        xml.send();
        xml.onload = function () {
            let discounts = JSON.parse(this.responseText);
            var html = ``;
            for (const discount of discounts) {
                html += ` <tr><td>${discount.id}</td>
                <td>${discount.name}</td>
                <td>${discount.price_per}</td>
                <td>${discount.start_date}</td>
                <td>${discount.end_date}</td>
                <td>${discount.isDeleted}</td>
                <td>
                    <button class="edit" value="${discount.id}">Edit</button>
                    <button class="delete" value="${discount.id}">Delete</button>
                </td> </tr>`;
            }
            document.querySelector('#discount_container .discount_table tbody').innerHTML = html;
            resolve();
        }

        xml.onerror = function () {
            console.log("** An error occurred during the load discount");
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


function EditDiscount() {
    var edits = document.querySelectorAll('#discount_container .edit');

    for (const edit of edits) {
        edit.addEventListener('click', () => {

            // ---------------------------- Load form -------------------------------------------------//
            const doc = document.querySelector('.main');
            if (doc.querySelector('#form_popup') !== null) {
                var rm = doc.querySelector('#form_popup');
                doc.removeChild(rm);
            }


            var data = edit.parentNode.parentNode.querySelectorAll('td');
            // console.log(data);
            var html = document.createElement('div');
            html.id = "form_popup";
            html.innerHTML = `
                <div class="close">&times;</div>
                <div class="form_profile" >
                    
                    <div class="form_ele">
                        <label for="discount_id">Id</label>
                        <input type="text" name="discount_id" id="discount_id" value="${data[0].textContent}">
                    </div>
                    <div class="form_ele">
                        <label for="discount_name">Name</label>
                        <input type="text" name="discount_name" id="discount_name" value="${data[1].textContent}">
                    </div>
                    <div class="form_ele">
                        <label for="discount_price_per">Name_code</label>
                        <input type="text" name="discount_price_per" id="discount_price_per" value="${data[2].textContent}">
                    </div>
                    <div class="form_ele">
                        <label for="discount_start_date">Name_code</label>
                        <input type="text" name="discount_start_date" id="discount_start_date" value="${data[3].textContent}">
                    </div>  
                    <div class="form_ele">
                        <label for="discount_end_date">Name_code</label>
                        <input type="text" name="discount_end_date" id="discount_end_date" value="${data[4].textContent}">
                    </div>    
                    <div class="form_footer">
                        <Button class="save" disabled style="pointer-events: none">Save</Button>
                        <Button class="cancel">Cancel</Button>
                    </div> 
                </div>`;

            document.querySelector('.main').appendChild(html);

            // ---------------------------- Disable save button -------------------------------------------------//
            var a = doc.querySelector('#form_popup');
            a.addEventListener('input', () => {
                let save = a.querySelector('.save');
                save.disabled = false;
                save.style.pointerEvents = 'auto';
            })

            // ---------------------------- Close produce profile -------------------------------------------------//
            var close = document.querySelector('#form_popup .close');
            var cancel = document.querySelector('#form_popup .cancel');
            var form_popup = document.querySelector('#form_popup');

            close.addEventListener('click', () => {
                document.querySelector('.main').removeChild(form_popup);
            });

            cancel.addEventListener('click', () => {
                document.querySelector('.main').removeChild(form_popup);
            })

            setTimeout(() => {
                window.addEventListener('click', function RmCart(event) {
                    let form = this.document.querySelector('#form_popup') || null;
                    if (form && (event.target !== form && !form.contains(event.target))) {
                        document.querySelector('.main').removeChild(form);
                        window.removeEventListener('click', RmCart);
                    }
                    else if (form === null) {
                        window.removeEventListener('click', RmCart);
                    }
                })
            }, 100);


            // ---------------------------- save produce profile -------------------------------------------------//
            var save = document.querySelector('#form_popup .save');
            save.addEventListener('click', () => {
                let id = document.querySelector('#form_popup #discount_id'),
                    name = document.querySelector('#form_popup #discount_name'),
                    price_per = document.querySelector('#form_popup #discount_price_per'),
                    start_date = document.querySelector('#form_popup #discount_start_date'),
                    end_date = document.querySelector('#form_popup #discount_end_date');
                data[1].textContent = name;
                data[2].textContent = price_per;
                data[3].textContent = start_date;
                data[4].textContent = end_date;

                let xml = new XMLHttpRequest();
                xml.open('POST', 'http://localhost/sieuthi_mini_api_php/api/discount/update.php');
                xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xml.send(`id=${id}&name=${name}&price_per=${price_per}&start_date=${start_date}&end_date=${end_date}`)
                xml.onload = function () {
                    console.log(this.response)
                }
            })

        })
    }
}


function DeleteDiscount() {
    var deletes = document.querySelectorAll('#discount_container .delete');
    for (const del of deletes) {
        del.addEventListener('click', () => {
            let row = del.parentNode.parentNode;
            var confirm = window.confirm(`Do you want to delete: ${row.children[1].textContent} ??`);
            if (confirm) {
                row.parentNode.removeChild(row);
                let xml = new XMLHttpRequest();
                xml.open('POST', `http://localhost/sieuthi_mini_api_php/api/discount/delete.php`);
                xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xml.send(`id=${del.value}`)
                xml.onload = () => {
                    console.log(xml.response);
                }
            }
        })
    }
}


function searchTable() {
    const search = document.querySelector('#discount_container .input-group input'),
        table_rows = document.querySelectorAll('.discount_table tbody tr');
    // console.log(search.innerHTML);

    search.addEventListener('input', () => {
        table_rows.forEach((row, i) => {
            let table_data = row.textContent.toLowerCase(),
                search_data = search.value.toLowerCase();
            row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        })
    });
}





//---------------------------- Active functions -------------------------------------//
LoadDiscount()
    .then(() => {
        console.log(`Load discount table complete`);
        EditDiscount();
        DeleteDiscount();
        searchTable();
    })
    .catch(() => {
        console.log(`Load discount table fail`)
    });


function ReLoadCategory() {
    var reload = document.querySelector('#discount_container .reload_discount')
    reload.addEventListener('click', () => {
        document.querySelector('#discount_container .discount_table tbody').replaceChildren();
        LoadDiscount()
            .then(() => {
                console.log(`Load discount table complete`);
                EditDiscount();
                DeleteDiscount();
                searchTable();
            })
            .catch(() => {
                console.log(`Load discount table fail`)
            });
    })
}

ReLoadCategory();