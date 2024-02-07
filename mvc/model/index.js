const fs = require("fs");

const getUserDB = () => {
  const content = fs.readFileSync("users.json", "utf8");
  const users = JSON.parse(content);
  return users;
};

const postUserDB = (data, id) => {
  if (!data || !id) return "Данных нет";
  else {
    const { name, surname, date, phone, age } = data;
    // деструкторизация
    if (!name || !surname || !date || !phone || !age) return "данные не указаны";

    const content = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(content);

    const id = Math.max.apply(
      Math,
      users.map((e) => e.id),
    );

    const user = {
      id: id == null ? 0 : id + 1,
      name, //name:name
      surname,
      date,
      phone,
      age,
    };

    console.log("users:", typeof users);
    users.push(user);
    fs.writeFileSync("users.json", JSON.stringify(users));
    return;
  }
};
const deleteUserDB = (id) => {
  const content = fs.readFileSync("users.json", "utf8");
  const users = JSON.parse(content);

  const update = users.filter((el) => {
    return el.id != id;
  });

  fs.writeFileSync("users.json", JSON.stringify(update, null, 2));
  return;
};
const putUserDB = (data, id) => {};

// var userName = req.body.name;
// var userAge = req.body.age;
// var user = { name: userName, age: userAge };

// var data = fs.readFileSync('users.json', 'utf8');
// var users = JSON.parse(data);

// // находим максимальный id
// var id = Math.max.apply(
//     Math,
//     users.map(function (o) {
//         return o.id;
//     })
// );
// // увеличиваем его на единицу
// user.id = id + 1;
// // добавляем пользователя в массив
// users.push(user);
// var data = JSON.stringify(users);
// // перезаписываем файл с новыми данными
// fs.writeFileSync('users.json', data);
// res.send(user);

module.exports = { getUserDB, postUserDB, deleteUserDB, putUserDB };
