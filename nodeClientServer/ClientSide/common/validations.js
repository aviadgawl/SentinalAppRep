function emailValidation(emailParam) {
    var flagMaster = false;
    var EMAIL_PATTERN = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/; 
    
    if(emailParam){
        
        var flagOne = emailParam.length <= 30;
        var flagTwo = emailParam.length >= 3;
        var flagthree = EMAIL_PATTERN.test(emailParam);
        flagMaster = flagOne && flagTwo && flagthree;
    }
    
    return flagMaster; 
    
}

function passwordValidation(passwordParams) {
    
    var flagMaster = false;
    
    if(passwordParams){
        var flagOne = passwordParams.length <= 20;
        var flagTwo = passwordParams.length >= 6;
        
        flagMaster = flagOne && flagTwo;
    }
    return flagMaster;
}
