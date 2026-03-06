// console.log('hi');
document.getElementById('sign-btn').addEventListener('click', function(e){
    e.preventDefault();
     //get the username input
    const InputUserName = document.getElementById('input-username');
    const userName = InputUserName.value;
    console.log(userName);
    //get the password input
    const inputPassword = document.getElementById('input-password');
    const password = inputPassword.value;
    console.log(password);
    // match userName & password
    if(userName=="admin" && password=="admin123"){
        //true:::>> alert> homepage
        alert('Sign In Success');

        // window.location.replace("/home.html");
        window.location.assign("home.html");
    }else{
        //false:::>> alert> return
        alert("Sign In Failed");
        return;
    }
})


