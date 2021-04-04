$(document).ready(function() {
    $.get("https://reqres.in/api/users?page=2", function(page2) {

        $.get("https://reqres.in/api/users?page=1", function(page1) {

            let result = page1.data.concat(page2.data) // merge two data



            let col = ['id', 'email', 'first_name', 'last_name', 'avatar']
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // BULDING PAGES
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
            function buildPage() {
                for (let i = 0; i < result.length; i++) {

                    $(".pageFace").append(`<div class="pages mt-3 col-12 col-md-6 col-lg-4">
                <div class="card">
                    <img class="card-img-top" id="dvPreview" src="${result[i].avatar}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">id:${result[i].id} </h5>
                        <p class="card-text">email:${result[i].email} <span></span></p>
                        <button  class="Edit${i} btn btn-primary" data-toggle="modal" data-target="#myModal">See/Edit profile</button>
                    </div>
                </div>

            </div>`)

                }
            }
            buildPage()


            // ****PAGEIN****
            let pages = $(`.pageFace .pages`).length
            let limitPerPage = 6

            function hideCards(e) { // hide cards
                $(`.pageFace .pages:gt(${e-1})`).hide()
            }
            hideCards(limitPerPage)

            let totalPages = Math.floor((result.length) / limitPerPage) + 1


            for (let i = 1; i <= totalPages; i++) {
                $('.pagin').append(`<a href="#" class="current-page">${i}</a>`)
            }

            $("body").on("click", ".current-page", function() { // click on page number
                // if ($(this).hasClass("active")) { // won't do anything if you click on the same page again
                //     return false
                // } else {

                let pageOnCLick = ($(this).index()) + 1
                    // $(".current-page").removeClass("active") // give the page numbre active class
                    // $(this).addClass("active")
                $(`.pageFace .pages`).hide()
                let total = limitPerPage * pageOnCLick
                for (let i = total - limitPerPage; i < total; i++) {
                    $(`.pageFace .pages:eq(${i})`).show()
                }
                // }
            })


            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
            // CRUD
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // *****CREAT*****
            $("body").on("click", ".creat", function() { // save changes
                $('.modal-title').html("")
                $('.modal-title').html("Creat New User")
                $('.modal-body').html("")
                $('.modal-body').html(` <label>id:</label><br><input class='input-creat input-group form-control' type="text" placeholder="id"><br>
                            <label>Email address:</label><br><input class='input-creat input-group form-control' type="email"  placeholder="Email Address"><br>
                            <label>Frist Name:</label><br><input class='input-creat input-group form-control' type="text" placeholder="First name"><br>
                            <label>Last name:</label><br><input class='input-creat input-group form-control' type="text" placeholder="Last name"><br>
                            <label>Avatar:</label><br><input  class='input-creat input-group form-control' id="fileupload" type="text" placeholder="Avatar"><br>`)
                $('.modal-footer').html("")
                $(`.modal-footer`).html(`<button type="button" class="btn btn-outline-danger" data-dismiss="modal">Close</button>
                        <button type="button" class="save btn  btn-outline-success" >add</button>`)
            })


            $("body").on("click", ".save", function() { // save changes

                let obj = {}
                let input = $(".input-creat")
                for (let i = 0; i < input.length; i++) {

                    if (input[i].value !== "") { // check if the input is filled or it is empty!

                        obj[col[i]] = input[i].value;


                        for (let j in result) {

                            if (obj.id == result[j].id) { // check if the uis is taken or not!

                                obj = '';
                                input[0].value = ""
                                input[0].placeholder = "This id is already taken!"
                                $(input[0]).css("background-color", "rgba(255, 0, 0, 0.3)");
                                $(input[0]).keypress(function() {
                                    $(input[0]).css("background-color", "white")
                                });
                                break
                            }
                        }

                    } else {
                        obj = '';

                        input[i].placeholder = "Fill this input"
                        $(input[i]).css("background-color", "rgba(255, 0, 0, 0.3)");
                        $(input[i]).keypress(function() {
                            $(input[i]).css("background-color", "white")
                        });
                        break
                    }
                }

                if (Object.keys(obj).length > 0) { // CHECK IF OBJECT IS NOT EMPTY.
                    result.push(obj); // PUSH (ADD) DATA TO THE JSON ARRAY.
                    $('.modal-body').html("New user sucssefuly created!") // change modal if opreation is sucsseful
                    $('.modal-footer').html(`<button type="button" class="btn btn-outline-danger" data-dismiss="modal">Close</button>`)
                    $(".pageFace").html("")
                    buildPage()
                    hideCards(limitPerPage)

                }

            })

            // *****SHOW UPDATE/DELETE
            for (let i = 0; i <= 999; i++) {
                $("body").on("click", `.Edit${i}`, function() {
                    $('.modal-title').html("")
                    $('.modal-title').html("Update User")
                    $('.modal-body').html("")
                    $('.modal-body').html(` <label ">id:</label><br><input class='input-creat input-group form-control' type="text" value="${result[i].id}" disabled><br>
                                <label ">Email address:</label><br><input class='input-creat input-group form-control' type="email" value="${result[i].email}"><br>
                                <label ">Frist Name:</label><br><input class='input-creat input-group form-control' type="text" value="${result[i].first_name}"><br>
                                <label ">Last name:</label><br><input class='input-creat input-group form-control' type="text" value="${result[i].last_name}"><br>
                                <label ">Avatar:</label><br><input class='input-creat input-group form-control' type="text" value="${result[i].avatar}"><br>`)
                    $('.modal-footer').html("")
                    $(`.modal-footer`).html(`<button type="button" class="btn btn-outline-danger" data-dismiss="modal">Close</button>
                                 <button type="button" class="update btn  btn-outline-success" data-dismiss="modal">update</button>
                                <button type="button" class="remove btn  btn-outline-dark" data-dismiss="modal">delete</button>`)

                })
            }
            $("body").on("click", `.remove`, function() { // delete this id
                let a = $('input')
                let userId = a[1].value
                for (let i in result) {
                    if (userId == result[i].id) {
                        result.splice(i, 1)
                    }
                }
                $(".pageFace").html("")
                buildPage()
                hideCards(limitPerPage)
            });
            $("body").on("click", `.update`, function() { // update this id
                let input = $("input")

                for (let f = 0; f < input.length; f++) {

                    for (let i in result) {
                        if (input[1].value == result[i].id) {

                            result[i].email = input[2].value
                            result[i].first_name = input[3].value
                            result[i].last_name = input[4].value
                            result[i].avatar = input[5].value
                            break
                        }
                    }

                }

                $(".pageFace").html("")
                buildPage()
                hideCards(limitPerPage)
            })



        });
    });
})