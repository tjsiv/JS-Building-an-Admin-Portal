async function bkTracker(){ //should geet books and change them after with showBook

    let response = await fetch('http://localhost:3001/listBooks') //fetch rq for book list
 //response will return 4 books because unlinke before when we did this  let response = await fetch('http://localhost:3001/updateBook', {
    //     method: "PATCH",
    //     headers:{
    //          'Content-Type' : 'application/json'
    //     },
    //     body: JSON.stringify({
    //         "id": 3,
    //         "title": "The Legends of Arathrae"
    //     }),
    // });
    // let updateBook = await response.json();
 //just putting it in as a url gets whole list

    let books = await response.json() //the list of books stored in the book variable
    
    books.forEach(showBook)
}

function showBook(book){
    let root = document.querySelector('#root'); //make html elements in the proper div

    let li = document.createElement('li'); //make list items for each book
    li.textContent = book.title; //use boo title

    let inventory = document.createElement('input')//update qnty of books in text space
    inventory.value = book.quantity;

    let saveBtn = document.createElement('button')//make button to submit update
    saveBtn.textContent = 'Save';//call it save

 //need to make a fetch rq  method 'patch' each lime the button is clicked
 //to save the changes to the inventory

    saveBtn.addEventListener("click", () =>{
        fetch('http://localhost:3001/updateBook', {
            method: "PATCH",
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ //items to patch to the json
                "id": book.id, //book id doens't get patched but is needed for the request to even work
                "quantity": inventory.value // what we really want to patcch is the inventory
            })
        });
    });

    li.append(inventory, saveBtn);
    root.append(li);
}
bkTracker(); //this is the call that should get the function running
// Your Code Here
