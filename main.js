/**
 * Created by ayrat on 06.11.16.
 */

var TEST_ARRAY = [];                // тестовый массив
var SINGLY_LIST = new SinglyList(); // тестовый односвязанный список

// Генерация тестового массив (TEST_ARRAY) из целых случайных
// чисел (от 100 до 10000), случайно длинны в диапазоне от 20 до 50
function initTEST_ARRAY() {
    TEST_ARRAY = [];
    for (var i = 1; i <= getIntRandomArbitary(30,70); i++) {
        TEST_ARRAY.push(getIntRandomArbitary(100,10000));
    }
}

//Выдает HTML последовательность отображающую массив
 Array.prototype.toHTML = function () {
     var HTMLstring = "[ ";
     this.forEach(function (item) {         // перебираем массив
         HTMLstring += item + " , "
     });
     HTMLstring = HTMLstring.slice(0, -2);  // удаляем последнии 2 симовола
     if (HTMLstring.length == 0) {
         HTMLstring = "Массив пустой";
     } else {
         HTMLstring += "]";
     }

     return HTMLstring
};

//  Целое случайно число от min до max
function getIntRandomArbitary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Анимация вывода результатов
// result - HTML строка
// idDiv  -
// анимация осуществляется постепенным (в течении 1 секунды)
// выводом HTML кода (getElementById) в элемент с id = idDiv
function ainimationResult (result, idDiv) {
    var start = Date.now(); // сохранить время начала
    var timer = setInterval(function() {
        // вычислить сколько времени прошло с начала анимации
        var timePassed = Date.now() - start;

        if (timePassed > 600) {
            clearInterval(timer); // конец через 0,5 секунды
            return;
        }
        // вывод HTML кода в элемент
        var theElement = document.getElementById(idDiv);
        theElement.innerHTML = result.substring(0,
            result.length*timePassed/500);
    }, 20);
}


//  ===== ОДНОСВЯЗАННЫЕ СПИСКИ =====

    //Конструктор УЗЛА
    function ListNode(data) {
        this.data = data;   //Данные хранимые в узле
        this.next = null;   //Ссылка на следующий узел
    }

    //Конструктор ОДНОСВЯЗАННОГО СПИСКА
    function SinglyList() {
        this._length = 0;   //Длинна списка
        this.root = null;   //Корневой узел
    }

    //СОЗДАНИЕ и ДОБАВЛЕНИЕ нового узла в КОНЕЦ списка
    //передаются данные (data), которые будут храниться в новом узле
    //возращается ссылка на новый узел
    SinglyList.prototype.addLast = function(data) {

        var newListNode = new ListNode(data); // создаем новый узел
        var currentNode = this.root;          // ставим указатель на корневой узел
        this._length++;                       // длинну цепи увеличивае на 1

        if (!currentNode) {                   // 1-ый случай: SingleList пока пустой
            this.root = newListNode;          // корневой указатель указывает на новый узел

        } else  {                             // 2-ой случай: SingleList НЕ пустой
            while (currentNode.next) {        // перемещаем указатель на последний узел
                currentNode = currentNode.next;
            }
            currentNode.next = newListNode;   // последний узел будет указывать на новый узел
        }

        return newListNode;                      // возвращает ссылку но новый узел
    };

    //СОЗДАНИЕ нового списка из МАССИВА
    //передается массив (array), на основании которого
    //будет создан SinglyList
    function arrayToList (array) {

        var newSinglyList = new SinglyList();  // создаем пустой список
        array.forEach(function (item) {        // перебираем массив
            newSinglyList.addLast(item);       // добавлям новый узел в список
        });

        return newSinglyList;                  // новый заполненный список
    }

    //СОЗДАНИЕ массива из СПИСКА
    //передается список, на основании которого
    //будет создан массив
    function listToArray (singlyList) {

        var newArray = [];                     // создаем пустой массив
        var currentNode = singlyList.root;     // ставим указатель на корневой узел

        if (currentNode) {                     // 2-ой случай: SingleList НЕ пустой
            while (currentNode.next) {         // последовательное перемещение указателя
                newArray.push(currentNode.data);
                currentNode = currentNode.next;
            }
            newArray.push(currentNode.data);
        }
        return newArray;                       // возвращаем массив
    }

    //СОЗДАНИЕ и ДОБАВЛЕНИЕ нового узла в НАЧАЛО списка
    //передаются данные (data), которые будут храниться в новом узле
    //возращается ссылка на новый узел
    SinglyList.prototype.addFirts = function(data) {

        var newListNode = new ListNode(data);  // создаем новый узел
        this._length++;                        // длинну цепи увеличивае на 1
        newListNode.next = this.root;          // новый узел будет указывать на бывший корневой
        this.root = newListNode;               // корневой указатель указывает на новый узел
        return newListNode;                    // возвращает ссылку но новый узел
    };

    //Выдает HTML последовательность отображающую список
    SinglyList.prototype.toHTML = function () {

        var currentNode = this.root;          // ставим указатель на корневой узел

        var HTMLstring = "";
        if (!currentNode) {                   // 1-ый случай: SingleList пустой
            HTMLstring += "Список пустой";
        } else {                              // 2-ой случай: SingleList НЕ пустой
            while (currentNode.next) {        // последовательное перемещение указателя
                HTMLstring += "<span style='background: #73b5f2; color:white; padding: 5px 0px 5px 5px; border: 1px dashed #333;'>&nbsp;<b>"
                    + currentNode.data.toString()
                    + "</b>&nbsp;<span style='background: #7b75f3; color:white; padding: 5px 5px; border: 1px dashed #333;'>&#9658;</span></span>&nbsp;&#8594;&nbsp;" + " ";
                currentNode = currentNode.next;
            }
            HTMLstring += "<span style='background: #73b5f2; color:white; padding: 5px 0px 5px 5px; border: 1px dashed #333;'>&nbsp;<b>"
                + currentNode.data.toString()
                + "</b>&nbsp;<span style='background: #7b75f3; color:white; padding: 5px 5px; border: 1px dashed #333;'>&#9658;</span></span>&nbsp;&#8594;&nbsp;";
            HTMLstring = HTMLstring.slice(0, -19); //удаляем лишную " -> "
            HTMLstring = "<p style='line-height: 40px;'>" + HTMLstring + "</p>"; //оборачиваем в параграф
        }
        return HTMLstring;
    };

    // Копирование списка (метод списка SinglyList)
    // Возращается новый объект (потомок SinglyList) идентичный по содержанию полученному
    SinglyList.prototype.copy = function() {

        var newSinglyList = new SinglyList();
        var currentNode = this.root;          // ставим указатель на корневой узел полученного

        if (currentNode) {                    // 2-ой случай: SingleList НЕ пустой
            while (currentNode.next) {        // последовательное перемещение указателя
                newSinglyList.addLast(currentNode.data);
                currentNode = currentNode.next;
            }
            newSinglyList.addLast(currentNode.data); // запись в данных в последний узел
        }

        return newSinglyList;                 // возвращает ссылку но новый узел
    };
        
    // Метод экземпляра
    // Возвращает ссылку на элемента по индексу - т.е.
    // порядкову номеру элемента в списки.
    // 0-ой элемент - это корневой узел (как в массивах).
    // В случае превышения index кол-ва элементов,
    // возвращает undefined
    SinglyList.prototype.nth = function(index) {

        var currentNode = this.root;          // ставим указатель на корневой узел полученного
        var counter = 0;

        if (currentNode) {                    // 2-ой случай: SingleList НЕ пустой
            while (currentNode.next) {        // последовательное перемещение указателя
                if (index == counter) {
                    return currentNode;
                }
                currentNode = currentNode.next;
                counter ++;
            }
            if (index == counter) {
                return currentNode;
            }
        }
        return undefined;                      // возвращает ссылку но новый узел или undefined
    };

    //Выдает HTML последовательность отображающую узел
    ListNode.prototype.toHTML = function () {
        return "<span style='background: #73b5f2; color:white; padding: 5px 0px 5px 5px; border: 1px dashed #333;'>&nbsp;<b>"
            + this.data.toString()
            + "</b>&nbsp;<span style='background: #7b75f3; color:white; padding: 5px 5px; border: 1px dashed #333;'>&#9658;</span></span>";
    };


    //Выдает HTML последовательность отображающую Объект
    function ObjecttoHTML (obj) {
        var HTMLstring = "{ ";
        for (var key in obj) {
            HTMLstring += key + " : <b>" + obj[key] + "</b> , ";
        }
        HTMLstring = HTMLstring.slice(0, -2);  // удаляем последнии 2 симовола
        if (HTMLstring.length == 0) {
            HTMLstring = "Объект пустой";
        } else {
            HTMLstring += "}";
        }

        return HTMLstring;
    }