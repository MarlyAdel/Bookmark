var bookmarkId = 1;
var bookmarkName = document.getElementById("bookName");
var websiteUrl = document.getElementById("websiteUrl");
// console.log(bookmarkName,websiteUrl);
var bookmarkList = [];
if(localStorage.getItem("bookmarkList") != null){
    bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
    displayBookmark(bookmarkList);
}


// & Add:-

function addBookmark(){

   // ^ Avoid Bookmark Duplication

var duplicate = false;
for( var i=0 ; i<bookmarkList.length ; i++){
    if(bookmarkList[i].name.toLowerCase() == bookmarkName.value.toLowerCase()){
        duplicate = true;
        break;
    }
}
if(duplicate){
    alert("This name already exists, Please choose a different name");
    return;
  }

  // ^ Sweat alert

  if(bookmarkName.value.trim() == "" || websiteUrl.value.trim() == ""){
    Swal.fire({
        title: 'Site Name or Url is not valid, Please follow the rules below :',
        text: 'Site name must contain at least 3 characters and Site URL must be a valid one',
        icon: 'error',
        confirmButtonText: 'OK'
        });
        return;  // Stop further execution if fields are empty
  }

  var bookmarkRegex = /^[a-zA-Z0-9\s_]{3,}$/;
  if(!bookmarkRegex.test(bookmarkName.value)){
    Swal.fire({
        title: 'Site Name is not valid!',
        text: 'Site name must contain at least 3 characters".',
        icon: 'error',
        confirmButtonText: 'OK'
    });
    return;
  }

  var urlRegex = /^https?:\/\/[^\s$.?#].[^\s]*$/i;
  if(!urlRegex.test(websiteUrl.value)){
    Swal.fire({
        title: 'Invalid URL!',
        text: 'The URL must start with "http://" or "https://".',
        icon: 'error',
        confirmButtonText: 'OK'
    });
    return;
  }

    var newId = bookmarkList.length + 1;
    var bookmark = {
        idBookmark: newId,
        name: bookmarkName.value,
        url: websiteUrl.value,
    }
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmarkList",JSON.stringify(bookmarkList));
    clear();
    displayBookmark(bookmarkList);
    // console.log(bookmarkList);
}

// & Display:-

function displayBookmark(list){
    var box = "";

  for( var i=0 ; i<list.length ; i++){
    box += ` <tr>
                    <td>${list[i].idBookmark}</td>
                    <td>${list[i].name}</td>
                    <td><button onclick="bookmarkVisit('${list[i].url}')" class="btn btn-visit"><i class="fa-solid fa-eye"></i> Visit</button></td>
                    <td><button onclick="deleteBookmark(${i})" class="btn btn-delete pe-2"><i class="fa-regular fa-trash-can"></i> Delet</button></td>
                </tr>`
  }  

  document.getElementById("tabelContent").innerHTML = box;
}

// & Clear:-

function clear(){
    // bookmarkId = null;
    bookmarkName.value = null;
    websiteUrl.value = null;
}

// & Delete:-

function deleteBookmark(index){
      bookmarkList.splice(index,1);
      localStorage.setItem("bookmarkList",JSON.stringify(bookmarkList));
      displayBookmark(bookmarkList);
}

// & Validation:-

function validateBookmarkInput(element){
    // console.log(element.id)
    var regex = {
        bookName : /^[a-zA-Z0-9\S_]{3,}$/,
        websiteUrl: /^https?:\/\/[^\s$.?#].[^\s]*$/i ,
    };
    // console.log( regex[element.id]);

    if(regex[element.id].test(element.value) == true){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid")
    }
    else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
}

// & visit:-

function bookmarkVisit(url){
   window.open(url, '_blank');
}