    - 1️⃣ What is the difference between var, let, and const?

    var: Function-scoped, can be redeclared and reassigned, hoisted with undefined.

    let: Block-scoped, cannot be redeclared in the same scope, can be reassigned, hoisted but in Temporal Dead Zone (TDZ).

    const: Block-scoped, cannot be redeclared or reassigned, hoisted but in TDZ. For objects/arrays, properties/elements can be modified.


    - 2️⃣ What is the spread operator (...)?

    The Spread Operator (...) is a JavaScript operator that helps spread the elements or properties of an array or object and use them as separate values.


    - 3️⃣ What is the difference between map(), filter(), and 
    forEach()?

    map() loops over each element of an array and creates a new array.

    filter() selects elements from an array based on a condition and creates a new array.

    forEach() loops over each element of an array, but does not create a new array.


    - 4️⃣ What is an arrow function?

    Arrow functions are a shorter syntax for writing functions.

    Example:
    **Normal function
    function add(a,b){
       return a+b; 
       }
    **Arrow function
    const addArrow = (a,b) => a+b;
    console.log(addArrow(2,3)); // 5

    - 5️⃣ What are template literals?




