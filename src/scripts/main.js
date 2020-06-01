function main() {
    const baseURL = "https://web-server-book-dicoding.appspot.com"
    const getBook = async () => {
        // fetch
        try {
            const response = await fetch(`${baseURL}/list`);
            const responseJson = await response.json();
        if(responseJson.error) {
               showResponseMessage(responseJson.message);
            } else {
               renderAllBooks(responseJson.books);
            }
          } catch(error) {
             showResponseMessage(error);
        }

        // fetch promise
        // fetch(`${baseURL}/list`)
        // .then(response => {
        //     return response.json();
        // })
        // .then(responseJson => {
        //     if(responseJson.error) {
        //         showResponseMessage(responseJson.message);
        //     } else {
        //         renderAllBooks(responseJson.books);
        //     }
        // })
        // .catch(error => {
        //     showResponseMessage(error);
        // })

        // xhr request
        // const xhr = new XMLHttpRequest();
        // xhr.onload = function() {
        //     const responseJson = JSON.parse(this.responseText);
        //     if (responseJson.error) {
        //         showResponseMessage(responseJson.message)
        //     } else {
        //         renderAllBooks(responseJson.books)
        //     }
        // }
        // xhr.onerror = function() {
        //     showResponseMessage()
        // }
        // xhr.open("GET", `${baseURL}/list`)
        // xhr.send()
    };
    


    const insertBook = async (book) => {
        // fetch async
        try{
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": "12345"
                },
                body: JSON.stringify(book)
            }
     
            const response = await fetch(`${baseURL}/add`, options)
            const responseJson = await response.json();
            showResponseMessage(responseJson.message);
            getBook();
        } catch(error) {
            showResponseMessage(error)
        }

        // fetch promise
        // fetch(`${baseUrl}/add`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "X-Auth-Token": "12345"
        //     },
        //     body: JSON.stringify(book)
        // })
        // .then(response => {
        //     return response.json();
        // })
        // .then(responseJson => {
        //     showResponseMessage(responseJson.message);
        //     getBook();
        // })
        // .catch(error => {
        //     showResponseMessage(error);
        // })

        // xhr request
        // const xhr = new XMLHttpRequest();
        // xhr.onload = function() {
        //     const responseJson = JSON.parse(this.responseText)
        //     showResponseMessage()
        //     getBook()
        // }
        // xhr.error = function() {
        //     showResponseMessage()
        // }
        // xhr.open("POST", `${baseURL}/add`)
        // xhr.setRequestHeader("Content-Type", "application/json")
        // xhr.setRequestHeader("X-Auth-Token", "12345")
        // xhr.send(JSON.stringify(book))
    };

    const updateBook = async (book) => {
        // fetch 
        try {
            const options = {
                method: "PUT",
                headers: {
                   "Content-Type": "application/json",
                    "X-Auth-Token": "12345"
               },
               body: JSON.stringify(book)
            }
        
            const response = await fetch(`${baseURL}/edit/${book.id}`, options);
            const responseJson = await response.json();
        
            showResponseMessage(responseJson.message);
            getBook();
       } catch(error) {
            showResponseMessage(error);
       }

        // fetch promise
        // fetch(`${baseURL}/edit/${book.id}`, {
        //     method: "PUT",
        //     headers: {
        //            "Content-Type": "application/json",
        //            "X-Auth-Token": "12345"
        //     },
        //     body: JSON.stringify(book)
        // })
        // .then(response => {
        //        return response.json();
        // })
        // .then(responseJson => {
        //        showResponseMessage(responseJson.message);
        //        getBook();
        // })
        // .catch(error => {
        //        showResponseMessage(error);
        // })

        // xhr request
        // const xhr = new XMLHttpRequest();
        // xhr.onload = function() {
        //     const responseJson = JSON.parse(this.responseText)
        //     showResponseMessage()
        //     getBook()
        // }
        // xhr.error = function() {
        //     showResponseMessage()
        // } 
        // xhr.open("PUT", `${baseURL}/edit/${book.id}`)
        // xhr.setRequestHeader("Content-Type", "application/json")
        // xhr.setRequestHeader("X-Auth-Token", "12345")
        // xhr.send(JSON.stringify(book))
    };

    const removeBook = (bookId) => {
        // fetch promise
        fetch(`${baseURL}/delete/${bookId}`, {
            method: "DELETE",
            headers: {
                "X-Auth-Token": "12345"
            }
        })
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            showResponseMessage(responseJson.message);
            getBook();      
        })
        .catch(error => {
            showResponseMessage(error);
        })

        // xhr request
        // const xhr = new XMLHttpRequest();
        // xhr.onload = function() {
        //     const responseJson = JSON.parse(this.responseText)
        //     showResponseMessage()
        //     getBook()
        // }
        // xhr.error = function() {
        //     showResponseMessage()
        // } 
        // xhr.open("DELETE", `${baseURL}/delete/${bookId}`)
        // xhr.setRequestHeader("X-Auth-Token", "12345")
        // xhr.send()
    };






    /*
        jangan ubah kode di bawah ini ya!
    */

    const renderAllBooks = (books) => {
        const listBookElement = document.querySelector("#listBook");
        listBookElement.innerHTML = "";

        books.forEach(book => {
            listBookElement.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <div class="card-body">
                            <h5>(${book.id}) ${book.title}</h5>
                            <p>${book.author}</p>
                            <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
                        </div>
                    </div>
                </div>
            `;
        });

        const buttons = document.querySelectorAll(".button-delete");
        buttons.forEach(button => {
            button.addEventListener("click", event => {
                const bookId = event.target.id;
                removeBook(bookId);
            })
        })
    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {

        const inputBookId = document.querySelector("#inputBookId");
        const inputBookTitle = document.querySelector("#inputBookTitle");
        const inputBookAuthor = document.querySelector("#inputBookAuthor");
        const buttonSave = document.querySelector("#buttonSave");
        const buttonUpdate = document.querySelector("#buttonUpdate");

        buttonSave.addEventListener("click", function () {
            const book = {
                id: Number.parseInt(inputBookId.value),
                title: inputBookTitle.value,
                author: inputBookAuthor.value
            };
            insertBook(book)
        });

        buttonUpdate.addEventListener("click", function () {
            const book = {
                id: Number.parseInt(inputBookId.value),
                title: inputBookTitle.value,
                author: inputBookAuthor.value
            };

            updateBook(book)
        });
        getBook();
    });
}

export default main;
