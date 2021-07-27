let obj1 = '{"data": [{"name": "John", "email": "john2@mail.com", "age": 22},{"name": "John", "email": "john1@mail.com", "age": 19},{"name": "Jane", "email": "jane@mail.com", "age": 23}],"condition": {"include": [{"name": "John"}, {"name": "Jane"}], "sort_by": ["age"]}}';
let obj2 = '{"data": [{"user": "mike@mail.com", "rating": 20, "disabled": false},{"user": "greg@mail.com", "rating": 14, "disabled": false},{"user": "john@mail.com", "rating": 25, "disabled": true}],"condition": {"exclude": [{"disabled": true}], "sort_by": ["rating"]}}';

let modules = {

    include: function(arr, condition, data) {
        for (let i = 0; i < condition.length; i++) {
            for (let j = 0; j < data.length; j++) {
                for (let key in condition[i]) {
                    if (data[j][key] === condition[i][key]) arr.push(data[j]);
                }
            }
        }
    },

    sort_by: function(arr, condition) {
        function compare(a, b) {
            if (a[condition] > b[condition]) return 1;
            if (a[condition] == b[condition]) return 0;
            if (a[condition] < b[condition]) return -1;
        }
        arr.sort(compare);
    },

    exclude: function(arr, condition, data) {
        for (let i = 0; i < condition.length; i++) {
            for (let j = 0; j < data.length; j++) {
                for (let key in condition[i]) {
                    if (data[j][key] !== condition[i][key]) arr.push(data[j]);
                }
            }
        }
    }

};

function main(obj) {
    let json = JSON.parse(obj);

    let data = json.data;
    let condition = json.condition;

    let arr = [];

    for (let key in condition) {
        modules[key](arr, condition[key], data);
    }

    let result = {result: arr};

    console.log(result);
};

main(obj1);