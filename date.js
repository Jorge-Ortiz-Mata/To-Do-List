exports.getDate = function(){
    const options = {weekday: "long", day: "numeric", month: "long"};
    const today = new Date();
    return today.toLocaleDateString("en-US", options);
};

exports.calculator = function(){
    const a = 5;
    const b = 8;
    return a + b;
};
