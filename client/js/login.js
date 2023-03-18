
function checkInput(){
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    
    if(username.value.length <= 3 || username.value.length >= 10){
      alert("Độ dài username phải lớn hơn 3 và nhỏ hơn 10!");
      username.focus();
      return false;
    }else if(username.value.includes(" ")){
        alert("Username không được chứa khoảng trắng!");
        username.focus();
        return false;
    }else if(username.value.toLowerCase() != username.value){
        alert("Username phải là chuỗi kí tự thường!");
        username.focus();
        return false;
    }
    if(password.value.length <= 3){
        alert("Độ dài password phải lớn hơn 3!");
        password.focus();
        return false;
    }
    return true;
}
