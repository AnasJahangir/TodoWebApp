
var lemail = document.getElementById('email');
var lpass = document.getElementById('password');

var rname = document.getElementById('rname');
var remail = document.getElementById('remail');
var rpass = document.getElementById('rpass');
var rrpass = document.getElementById('rrpass');
var rCheck = document.getElementById('registerCheck');


var users = [
    {
        name : "Anas",
        email: "Anasjahangir.bus@gmail.com",
        pass: "123",
        todolists : [
            {
            task: "work on code",
            status: true,
            date: "9",
            month: "9"

        }
    ]
    },
]



function signUp() {
    if (rname.value != '' && rpass.value != '' && remail.value != '' && rrpass.value != '') {
        if (rpass.value === rrpass.value) {
            if (rCheck.checked  == true) {

                users.push(
                    {
                        name : rname.value,
                        email: remail.value.toLowerCase(),
                        pass: rpass.value,
                        todolists : [
                
                    ]
                    }
                )
                
                users[users.length -1]
                localStorage.setItem(users[users.length -1].email ,
                    JSON.stringify(users[users.length -1])
                  );
        
                remail.value="";
                rname.value="";
                rpass.value="";
                rrpass.value="";

                // Set value
                localStorage.setItem("currentUser", JSON.stringify(users[users.length -1]));
                Swal.fire({
                    icon: 'success',
                    title: '<h3 style="color: #00AD96 ">Great! You are now logged in. Click OK to proceed.</h3>',
                    confirmButtonColor: "#00AD96",
                    iconColor: '#00AD96',
                  }).then(() => {
                    if (true) {
                        location.href = 'https://anas-todo-web.netlify.app/home';
                    }
                  });
                
    

            }else{
                Swal.fire({
                    icon: 'error',
                    title: '<h3 style="color: #00AD96 ">Oops...</h3>',
                    text: 'Please tick the checkbox.',
                    confirmButtonColor: "#00AD96",
                    iconColor: '#00AD96',
                  })
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: '<h3 style="color: #00AD96 ">Oops...</h3>',
                text: 'Please make sure that the passwords match.',
                confirmButtonColor: "#00AD96",
                iconColor: '#00AD96',
              })
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: '<h3 style="color: #00AD96 ">Oops...</h3>',
            text: 'Please complete all the required fields.',
            confirmButtonColor: "#00AD96",
            iconColor: '#00AD96',
            footer: ''
          })
    }

}

function login() {
    if (lemail.value != '' && lpass.value != '') {
            var getUsers = null
           getUsers = JSON.parse(localStorage.getItem(lemail.value.toLowerCase()))

            // getUsers.pass === lpass.value;
        if (getUsers != null) {
            
            if (getUsers.email === lemail.value.toLowerCase() && getUsers.pass === lpass.value) {

                
                // Set value
                localStorage.setItem("currentUser", JSON.stringify(getUsers));
                    
            
                Swal.fire({
                    icon: 'success',
                    title: '<h3 style="color: #00AD96 ">Great! You are now logged in. Click OK to proceed.</h3>',
                    confirmButtonColor: "#00AD96",
                    iconColor: '#00AD96',
                  }).then(() => {
                    if (true) {
                        location.href = './Home.html';
                    }
                  });
                
    
    
            }else if ( getUsers.email === lemail.value.toLowerCase()) {
                Swal.fire({
                    icon: 'error',
                    title: '<h3 style="color: #00AD96 ">Oops...</h3>',
                    text: 'The password you entered is incorrect. Please try again.',
                    confirmButtonColor: "#00AD96",
                    iconColor: '#00AD96',
                    footer: ''
                  })
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: '<h3 style="color: #00AD96 ">Oops...</h3>',
                text: 'User not found. Please sign up first.',
                confirmButtonColor: "#00AD96",
                iconColor: '#00AD96',
                footer: ''
              })
        }

    }else{
        Swal.fire({
            icon: 'error',
            title: '<h3 style="color: #00AD96 ">Oops...</h3>',
            text: 'Fill all the inputs filds',
            confirmButtonColor: "#00AD96",
            iconColor: '#00AD96',
            footer: ''
          })
    }
}



var getcurrentUser = localStorage.getItem("currentUser")

if (JSON.parse(getcurrentUser) != null)  {
  var useCurrentUser = JSON.parse(getcurrentUser);
  var openModalButton = document.getElementById('openModalButton');
  var profileModal = document.getElementById('profileModal');
  var closeButtons = document.querySelectorAll('.close-btn');
  var ComTaskLength = 0;
  var PendingTaskLength = 0;
  if (useCurrentUser.todolists.length !== 0) {

    for (var i = 0; i < useCurrentUser.todolists.length; i++) {

    var tasksBody = document.getElementById('tasksBody');

      var tr = document.createElement('tr')
      var thNo = document.createElement('th')
      var thTaske = document.createElement('th')
      var thDate = document.createElement('th')
      var thCheck = document.createElement('th')
      var thEdit = document.createElement('th')
      var thDelete = document.createElement('th')

      if (useCurrentUser.todolists[i].status == true) {

              ComTaskLength++
             
          

        thNo.setAttribute("class",'wavy')
        thTaske.setAttribute("class",'wavy')
        thDate.setAttribute("class",'wavy')
        thNo.textContent = i + 1;
        thTaske.textContent = useCurrentUser.todolists[i].task;
        thDate.innerHTML = '<span>'+useCurrentUser.todolists[i].date+'</span>/<span>'+useCurrentUser.todolists[i].month+'</span>';
        thCheck.innerHTML = '<i onclick="taskCheck(this)" class="fa-solid fa-square-check"></i>';
        thEdit.innerHTML = '<i onclick="taskEdit(this)" class="fa-solid fa-pen-to-square"></i>';
        thDelete.innerHTML = '<i onclick="taskDelete(this)" class="fa-solid fa-trash-can"></i>';
  
    
  
        tr.appendChild(thNo)
        tr.appendChild(thTaske)
        tr.appendChild(thDate)
        tr.appendChild(thCheck)
        tr.appendChild(thEdit)
        tr.appendChild(thDelete)
        tasksBody.appendChild(tr)


      }else{

       
        thNo.textContent = i + 1;
        thTaske.textContent = useCurrentUser.todolists[i].task;
        thDate.innerHTML = '<span>'+useCurrentUser.todolists[i].date+'</span>/<span>'+useCurrentUser.todolists[i].month+'</span>';
        thCheck.innerHTML = '<i onclick="taskCheck(this)" class="fa-regular fa-square-check"></i>';
        thEdit.innerHTML = '<i onclick="taskEdit(this)" class="fa-solid fa-pen-to-square"></i>';
        thDelete.innerHTML = '<i onclick="taskDelete(this)" class="fa-solid fa-trash-can"></i>';
  
    
  
        tr.appendChild(thNo)
        tr.appendChild(thTaske)
        tr.appendChild(thDate)
        tr.appendChild(thCheck)
        tr.appendChild(thEdit)
        tr.appendChild(thDelete)
        tasksBody.appendChild(tr)
  

      }

      
      
    
    
    }


    for (var i = 0; i < useCurrentUser.todolists.length; i++) {
      if (useCurrentUser.todolists[i].status === false) {
        PendingTaskLength++
      }
    }
    var PendingTask =  document.getElementById('Pending').innerText = PendingTaskLength

    var ComTask =  document.getElementById('Completed').innerText =  ComTaskLength
    var totalTask =  document.getElementById('Total').innerText = useCurrentUser.todolists.length
   
    
 }
  
  openModalButton.addEventListener('click', function() {
    profileModal.style.display = 'block';
    document.getElementById('userIcon').style.color = '#00e0c2'
    document.getElementById('userIcon').style.backgroundColor = '#fff';
  });
  
 
  var userName = useCurrentUser.name.split(" ")[0].split('').splice(1,useCurrentUser.name.length -1).join("").toLowerCase();
    
    document.getElementById('userFullName').innerHTML = "Welcome, " + useCurrentUser.name.split(" ")[0][0].toUpperCase()+ userName 
    // + useCurrentUser.name.split(" ")[0].splice(1,0)
    var userFullName2 =  document.getElementById('userFullName2');
    var userEmail = document.getElementById('Useremail');
    var userPass = document.getElementById('userPass');

     
  userFullName2.value = useCurrentUser.name;
  userEmail.value = useCurrentUser.email;
  userPass.value = useCurrentUser.pass;



    function logout() {


      Swal.fire({
        icon: 'warning',
        title: 'Would you like to sign out, '+ String(useCurrentUser.name).split(" ")[0],
        confirmButtonColor: "#00AD96",
        iconColor: '#00AD96',
        showDenyButton: true,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Confirm',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          localStorage.setItem("currentUser",null)
          location.href = "https://anas-todo-web.netlify.app/"
        }
      })

    }

    function edit() {
    var userFullName2 =  document.getElementById('userFullName2');
    var userEmail = document.getElementById('Useremail');
     var userPass = document.getElementById('userPass');
     var editBtn =  document.getElementById('edit-btn');
     editBtn.innerText = "Save";
     editBtn.removeAttribute("onclick")
     editBtn.setAttribute('onclick','editSave()')
     userFullName2.focus();
     userFullName2.removeAttribute("readonly");
     userEmail.disabled = true
     userEmail.setAttribute('data-toggle','tooltip');
     userEmail.setAttribute('title','Sorry, email cannot be changed.')
    userEmail.removeAttribute("readonly");
    userPass.removeAttribute("readonly");
    userPass.setAttribute("type", "text");
    userFullName2.style = " border: 2px solid hsl(172, 100%, 34%); border-radius: 5px;";
    userPass.style = " border: 2px solid hsl(172, 100%, 34%); border-radius: 5px;";
    userEmail.style = " border: 2px solid hsl(172, 100%, 34%); border-radius: 5px;";
    }


    function editSave(){
      Swal.fire({
        icon: 'warning',
        title: 'Do you want to make changes to this?',
        confirmButtonColor: "#00AD96",
        iconColor: '#00AD96',
        showDenyButton: true,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Confirm',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
    


          var userFullName2 =  document.getElementById('userFullName2');
          var userEmail = document.getElementById('Useremail');
          var userPass = document.getElementById('userPass');
          var editBtn =  document.getElementById('edit-btn');

         editBtn.innerText = "Edit";
         editBtn.removeAttribute("onclick")
         editBtn.setAttribute('onclick','edit()')

        userFullName2.setAttribute("readonly", true);
        userEmail.setAttribute("readonly", true);
        userPass.setAttribute("readonly", true);
        userPass.setAttribute("type", "password");
        userFullName2.style = " border: none; border-radius: 0px;"
        userPass.style = "  border: none; border-radius: 0px;"
        userEmail.style = "  border: none; border-radius: 0px;"
        userEmail.removeAttribute("data-toggle")
        userEmail.removeAttribute("title")
        userEmail.disabled = false  

        var currentUserEmail = JSON.parse(localStorage.getItem("currentUser")).email;

          var currentUserData = JSON.parse(localStorage.getItem(currentUserEmail));

          currentUserData.name = userFullName2.value;
          currentUserData.pass = userPass.value;

          localStorage.setItem(currentUserEmail, JSON.stringify(currentUserData));
          localStorage.setItem("currentUser", JSON.stringify(currentUserData));


    document.getElementById('userFullName').innerHTML = "Welcome, " + String(currentUserData.name).split(" ")[0];


        profileModal.style.display = 'none';
        document.getElementById('userIcon').style = 'color: white; background: #00e0c2;';
        } else if (result.isDenied) {
          var userFullName2 =  document.getElementById('userFullName2');
          var userEmail = document.getElementById('Useremail');
          var userPass = document.getElementById('userPass');
          var editBtn =  document.getElementById('edit-btn');

          editBtn.innerText = "Edit";
            editBtn.removeAttribute("onclick")
            editBtn.setAttribute('onclick','edit()')
    
            userFullName2.setAttribute("readonly", true);
            userEmail.setAttribute("readonly", true);
            userPass.setAttribute("readonly", true);
            userPass.setAttribute("type", "password");
            userFullName2.style = " border: none; border-radius: 0px;"
            userPass.style = "  border: none; border-radius: 0px;"
            userEmail.style = "  border: none; border-radius: 0px;"
            userEmail.removeAttribute("data-toggle")
            userEmail.removeAttribute("title")
            userEmail.disabled = false  
            document.getElementById('userIcon').style = ' color: white; background: #00e0c2;';
            profileModal.style.display = 'none';
        }
      })
    }
   
  function closeModal() {
        var passwordInput = document.getElementById('userPass');

        var isPasswordType = passwordInput.getAttribute("type") === "password";

        
        if (isPasswordType) {
        profileModal.style.display = 'none';
        document.getElementById('userIcon').style = ' color: white; background: #00e0c2;';


        } else {

          Swal.fire({
            icon: 'warning',
            title: 'Do you want all of this to be removed?',
            confirmButtonColor: "#00AD96",
            iconColor: '#00AD96',
            showDenyButton: true,
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Yes',
          }).then((result) => {
            if (result.isConfirmed) {
        
              var userFullName2 =  document.getElementById('userFullName2');
              var userEmail = document.getElementById('Useremail');
              var userPass = document.getElementById('userPass');
              var editBtn =  document.getElementById('edit-btn');
    
            editBtn.innerText = "Edit";
            editBtn.removeAttribute("onclick")
            editBtn.setAttribute('onclick','edit()')
    
            userFullName2.setAttribute("readonly", true);
            userEmail.setAttribute("readonly", true);
            userPass.setAttribute("readonly", true);
            userPass.setAttribute("type", "password");
            userFullName2.style = " border: none; border-radius: 0px;"
            userPass.style = "  border: none; border-radius: 0px;"
            userEmail.style = "  border: none; border-radius: 0px;"
            userEmail.removeAttribute("data-toggle")
            userEmail.removeAttribute("title")
            userEmail.disabled = false  
            document.getElementById('userIcon').style = ' color: white; background: #00e0c2;';
            profileModal.style.display = 'none';
       }})
      
        }



  }
 
  function deleteAcc() {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want your account to be deleted?',
      confirmButtonColor: "#00AD96",
      iconColor: '#00AD96',
      showDenyButton: true,
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Confirm',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        var userEmail = JSON.parse(localStorage.getItem("currentUser")).email

        localStorage.setItem("currentUser",null)
        localStorage.removeItem(userEmail)
        location.href = "https://anas-todo-web.netlify.app/"

      }
      })
  



  }

  
  function handleKeyPress(event) {
    
    if (event.keyCode === 13) {
        addTask()
    }

}

    function addTask() {
      var todolists = useCurrentUser.todolists;


      var taskInput = document.getElementById('taskInput');
      var tasksBody = document.getElementById('tasksBody');
      if (taskInput.value !== '') {
        var time = new Date();
        var date = time.getDate() ;
        var month = time.getMonth()+1 ;

        var tr = document.createElement('tr')
        var thNo = document.createElement('th')
        var thTaske = document.createElement('th')
        var thDate = document.createElement('th')
        var thCheck = document.createElement('th')
        var thEdit = document.createElement('th')
        var thDelete = document.createElement('th')
        thNo.textContent = todolists.length +1;
        thTaske.textContent = taskInput.value;
        thDate.innerHTML = '<span>'+date+'</span>/<span>'+month+'</span>';
        thCheck.innerHTML = '<i onclick="taskCheck(this)" class="fa-regular fa-square-check"></i>';
        thEdit.innerHTML = '<i onclick="taskEdit(this)" class="fa-solid fa-pen-to-square"></i>';
        thDelete.innerHTML = '<i onclick="taskDelete(this)" class="fa-solid fa-trash-can"></i>';

    

        tr.appendChild(thNo)
        tr.appendChild(thTaske)
        tr.appendChild(thDate)
        tr.appendChild(thCheck)
        tr.appendChild(thEdit)
        tr.appendChild(thDelete)

        tasksBody.appendChild(tr)
        var userTask =  {
          task: taskInput.value,
          date: date,
          month: month,
          status: false
      }

      
    todolists.push(userTask)

    var currentUserEmail = JSON.parse(localStorage.getItem("currentUser")).email;

    var currentUserData = JSON.parse(localStorage.getItem(currentUserEmail));

    currentUserData.todolists = todolists;

    taskInput.value = ''

    localStorage.setItem(currentUserEmail, JSON.stringify(currentUserData));
    localStorage.setItem("currentUser", JSON.stringify(currentUserData));

    
    PendingTaskLength = 0;

    for (var i = 0; i < currentUserData.todolists.length; i++) {
      if (currentUserData.todolists[i].status === false) {
        PendingTaskLength++
      }
    }

    document.getElementById('Pending').innerText = PendingTaskLength
    document.getElementById('Total').innerText = currentUserData.todolists.length

      }

}



function taskDelete(e) {
    
  var parentNode = e.parentNode.parentNode;
  var childNodes = parentNode.childNodes;
  var editLength = childNodes[0].innerText
  var currentUserEmail = JSON.parse(localStorage.getItem("currentUser")).email;
  var currentUserData = JSON.parse(localStorage.getItem(currentUserEmail));


  var Length =  Number(editLength);
  currentUserData.todolists.splice(Length -1 ,1)
  localStorage.setItem(currentUserEmail, JSON.stringify(currentUserData));
  localStorage.setItem("currentUser", JSON.stringify(currentUserData));

  // e.parentNode.parentNode.remove()

  var getcurrentTodo = JSON.parse(localStorage.getItem("currentUser"))
  
  var tasksBody = document.getElementById('tasksBody');
  tasksBody.innerHTML = "";
  var ComTaskLength = 0;
  var PendingTaskLength = 0;

  for (var i = 0; i < getcurrentTodo.todolists.length; i++) {


      var tr = document.createElement('tr')
      var thNo = document.createElement('th')
      var thTaske = document.createElement('th')
      var thDate = document.createElement('th')
      var thCheck = document.createElement('th')
      var thEdit = document.createElement('th')
      var thDelete = document.createElement('th')

      if (getcurrentTodo.todolists[i].status == true) {

          ComTaskLength++
             
          

        thNo.setAttribute("class",'wavy')
        thTaske.setAttribute("class",'wavy')
        thDate.setAttribute("class",'wavy')
        thNo.textContent = i + 1;
        thTaske.textContent = getcurrentTodo.todolists[i].task;
        thDate.innerHTML = '<span>'+getcurrentTodo.todolists[i].date+'</span>/<span>'+getcurrentTodo.todolists[i].month+'</span>';
        thCheck.innerHTML = '<i onclick="taskCheck(this)" class="fa-solid fa-square-check"></i>';
        thEdit.innerHTML = '<i onclick="taskEdit(this)" class="fa-solid fa-pen-to-square"></i>';
        thDelete.innerHTML = '<i onclick="taskDelete(this)" class="fa-solid fa-trash-can"></i>';
  
    
  
        tr.appendChild(thNo)
        tr.appendChild(thTaske)
        tr.appendChild(thDate)
        tr.appendChild(thCheck)
        tr.appendChild(thEdit)
        tr.appendChild(thDelete)
        tasksBody.appendChild(tr)


      }else{

       
        thNo.textContent = i + 1;
        thTaske.textContent = getcurrentTodo.todolists[i].task;
        thDate.innerHTML = '<span>'+getcurrentTodo.todolists[i].date+'</span>/<span>'+getcurrentTodo.todolists[i].month+'</span>';
        thCheck.innerHTML = '<i onclick="taskCheck(this)" class="fa-regular fa-square-check"></i>';
        thEdit.innerHTML = '<i onclick="taskEdit(this)" class="fa-solid fa-pen-to-square"></i>';
        thDelete.innerHTML = '<i onclick="taskDelete(this)" class="fa-solid fa-trash-can"></i>';
  
    
  
        tr.appendChild(thNo)
        tr.appendChild(thTaske)
        tr.appendChild(thDate)
        tr.appendChild(thCheck)
        tr.appendChild(thEdit)
        tr.appendChild(thDelete)
        tasksBody.appendChild(tr)
  

      }

      
      
    
    
    }


    for (var i = 0; i < getcurrentTodo.todolists.length; i++) {
      if (getcurrentTodo.todolists[i].status === false) {
        PendingTaskLength++
      }
    }

    document.getElementById('Pending').innerText = PendingTaskLength

    document.getElementById('Completed').innerText =  ComTaskLength
     document.getElementById('Total').innerText = getcurrentTodo.todolists.length
   

}



function taskEdit(e) {


  var parentNode = e.parentNode.parentNode;
  var childNodes = parentNode.childNodes;

  var taskData = childNodes[1].innerText;
  var inp = document.createElement('input')
  inp.value = taskData
  inp.setAttribute('class','form-control')
  inp.setAttribute('placeholder','Edit your task...')
  inp.style =  "background: no-repeat; border: none; border-bottom: 2px solid #00e0c2; color: #454b54 ; caret-color: #00e0c2; height: 25px;"




  childNodes[4].innerHTML = '<i onclick="taskSave(this)" class="fa-solid fa-floppy-disk"></i>'
  childNodes[1].textContent = '';
  childNodes[1].appendChild(inp)



}


function taskSave(e) {

  var parentNode = e.parentNode.parentNode;
  var childNodes = parentNode.childNodes;
  var inp = childNodes[1].firstChild.value;

  var editLength = childNodes[0].innerText
  var currentUserEmail = JSON.parse(localStorage.getItem("currentUser")).email;
  var currentUserData = JSON.parse(localStorage.getItem(currentUserEmail));

  if (inp != '') {
    childNodes[1].textContent = inp
    childNodes[4].innerHTML = '<i onclick="taskEdit(this)" class="fa-solid fa-pen-to-square"></i>'

        
  
  var Length =  Number(editLength) -1;

  currentUserData.todolists[Length].task = inp

  localStorage.setItem(currentUserEmail, JSON.stringify(currentUserData));
  localStorage.setItem("currentUser", JSON.stringify(currentUserData));


  }else{
    Swal.fire({
      icon: 'error',
      title: '<h3 style="color: #00AD96 ">Oops...</h3>',
      text: 'Sir, you need to enter something in this field.',
      confirmButtonColor: "#00AD96",
      iconColor: '#00AD96',
    })
  }

}

function taskCheck(e) {

  var parentNode = e.parentNode.parentNode;
  var childNodes = parentNode.childNodes;

  var taskLength = childNodes[0].innerText
  var currentUserEmail = JSON.parse(localStorage.getItem("currentUser")).email;
  var currentUserData = JSON.parse(localStorage.getItem(currentUserEmail));


  
  if (String(childNodes[1].firstChild) != '[object HTMLInputElement]') {
      
    var Length =  Number(taskLength) -1;

  if (childNodes[0].nodeType === Node.ELEMENT_NODE && childNodes[0].classList.contains('wavy')) {

    childNodes[0].removeAttribute("class")
    childNodes[1].removeAttribute("class")
    childNodes[2].removeAttribute("class")
    childNodes[3].firstChild.classList.add('fa-regular')
    childNodes[3].firstChild.classList.remove('fa-solid')


    currentUserData.todolists[Length].status = false
  
    localStorage.setItem(currentUserEmail, JSON.stringify(currentUserData));
    localStorage.setItem("currentUser", JSON.stringify(currentUserData));
    
    ComTaskLength = 0;
    PendingTaskLength = 0;
    for (var i = 0; i < currentUserData.todolists.length; i++) {
      if (currentUserData.todolists[i].status == true) {
        ComTaskLength++;
      } else {
        PendingTaskLength++;
      }
    }
    
    document.getElementById('Pending').innerText = PendingTaskLength;
    document.getElementById('Completed').innerText = ComTaskLength;

  } else {

    childNodes[0].setAttribute("class",'wavy')
    childNodes[1].setAttribute("class",'wavy')
    childNodes[2].setAttribute("class",'wavy')
   
    childNodes[3].firstChild.classList.add('fa-solid')
    childNodes[3].firstChild.classList.remove('fa-regular')

    currentUserData.todolists[Length].status = true

    localStorage.setItem(currentUserEmail, JSON.stringify(currentUserData));
    localStorage.setItem("currentUser", JSON.stringify(currentUserData));

    ComTaskLength = 0;
    for (var i = 0; i < currentUserData.todolists.length; i++) {
      if (currentUserData.todolists[i].status == true) {
        ComTaskLength++
      }
    }

    PendingTaskLength = 0;

    for (var i = 0; i < currentUserData.todolists.length; i++) {
      if (currentUserData.todolists[i].status === false) {
        PendingTaskLength++
      }
    }

    document.getElementById('Pending').innerText = PendingTaskLength
    document.getElementById('Completed').innerText =  ComTaskLength

   }
  }

}


}

