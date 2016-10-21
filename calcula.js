
var num = 0, result = 0, numshow = "0";
var operate = 0;//判断输入状态的标志
var calcul = 0;//判断计算状态的标志
var quit = 0;//防止重复按键的标志
function command(num) {
    var str = document.calculator.numScreen.value;//获取当前显示数据
    str = (str != "0") ? ((operate == 0) ? str : "") : "";//如果当前值不是“0”，并且状态为0，则返回当前值，否则返回空值
    str = str + String(num);//给当前值追加字符
    document.calculator.numScreen.value = str;//刷新显示
    operate = 0;//重置输入状态
    quit = 0;//重置防止重复按键的标志
}
function dzero() {
    var str = document.calculator.numScreen.value;
    str = (str != "0") ? ((operate == 0) ? str + "00" : "0") : "0";//如果当前值不是“0”，并且状态为0，则返回str + "00",否则返回“0”
    document.calculator.numScreen.value = str;//刷新显示
    operate = 0;
}
function dot() {
    var str = document.calculator.numScreen.value;
    str = (str != "0") ? ((operate == 0) ? str : "0") : "0";//如果当前值不是“0”，且状态为0，则返回当前值，否则返回"0"
    for (i = 0; i < str.length; i++) {
        if (str.substr(i, 1) == ".") return false;//判断是否已经有一个点号，如果有则不再插入
    }
    str = str + ".";
    document.calculator.numScreen.value = str;//刷新显示
    operate = 0;
}
//退格
function del() {
    var str = document.calculator.numScreen.value;
    str = (str != "0") ? str : "";
    str = str.substr(0, str.length - 1);//取得字符串前length-1位
    str = (str != "") ? str : "0";//str如果为空，则返回"0"
    document.calculator.numScreen.value = str;//刷新显示
}
//清空
function clearscreen() {
    num = 0;
    result = 0;
    numshow = 0;
    document.calculator.numScreen.value = "0";
}
//加减乘除运算函数调用
function opera(s) {
    if (s == 6 || s == 7) {   //如果计算sin cos 直接得出结果
        calculate();
        calcul = s;
        equal();
    } else {
        calculate();//调用计算函数
        operate = 1;//更改输入状态
        calcul = s;//更改计算状态
        quit = 1;
    }

}
//等号运算
function equal() {
    calculate();
    operate = 1;
    num = 0;
    result = 0;
    numshow = "0";
}
//计算
function calculate() {
    numshow = Number(document.calculator.numScreen.value);
    if (num != 0 && quit != 1) {  //判断前一个运算数是否为零以及防重复按键的状态
        switch (calcul) {    //判断输入状态
            case 1:
                result = num + numshow; //加法计算
                break;
            case 2:
                result = num - numshow; //减法计算
                break;
            case 3:
                result = num * numshow; //乘法计算
                result = parseFloat(result.toFixed(15));
                break;
            case 4:
                if (numshow != 0) {
                    result = num / numshow; //除法计算
                    result = parseFloat(result.toFixed(15));
                } else {
                    document.getElementById("note").innerHTML = "被除数不能为0！";
                    setTimeout(clearnote, 4000)
                }
                break;
            case 5:
                result = num % numshow;//求余
                break;
            case 6:
                result = Math.sin(num);//sin
                break;
            case 7:
                result = Math.cos(num);//cos
                break;
        }
        quit = 1;//避免重复按键
    } else {
        result = numshow;
    }
    numshow = String(result);
    document.calculator.numScreen.value = numshow;
    num = result;//储存当前值
}
function clearnote() {//清空提示
    document.getElementById("note").innerHTML = "";
}