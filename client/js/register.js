
function checkInput(){
    var first_name = document.getElementById("first_name");
    var last_name = document.getElementById("last_name");
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var phone = document.getElementById("phone");
    
    if(username.value.length <= 3 || username.value.length >= 10){
      alert("Độ dài username phải lớn hơn 3 và nhỏ hơn 10!");
      return false;
    }
    if(password.value.length <= 3){
        alert("Độ dài password phải lớn hơn 3!");
        return false;
    }
    if(phone.value.length != 10){
        alert("SĐT có độ dài = 10!");
        return false;
    }
    if(first_name.value <= 0 || first_name >= 10){
        alert("Độ dài First Name phải lớn hơn 0 và nhỏ hơn 10");
        return false;
    }
    if(last_name.value <= 0 || last_name >= 30){
        alert("Độ dài Last Name phải lớn hơn 0 và nhỏ hơn 30");
        return false;
    }
    return true;
}