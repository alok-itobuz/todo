const fs = require("fs");

const input = process.argv.slice(2);

if (
  input.length === 0 ||
  (input[0] != 2 && !input[1]) ||
  (input[0] == 4 && (!input[1] || !input[2]))
) {
  console.log(
    "Wrong input....\nPress \n1 <task name> to add todo \n2 to view \n3 <task sl no.> to delete \n4 <task sl no> <new name of task> to update"
  );
  return;
}

const i = input[0] != "4" ? 1 : 2;
input[i] = input.splice(i).join(" ");

let fileData, count;

try {
  fileData = fs.readFileSync("./db.json").toString();
  if (!fileData) fileData = "[]";
  fileData = JSON.parse(fileData);
  count = fs.readFileSync("./count.txt").toString();
  if (!count) count = "0";
  count = Number(count);
} catch (error) {
  console.log(error);
}

switch (input[0]) {
  case "help":
    console.log(
      "Press \n1 <task name> to add todo \n2 to view \n3 <task sl no.> to delete \n4 <task sl no> <new name of task> to update"
    );
    break;
  case "1":
    const newTodo = {
      sl_no: ++count,
      name: input[1],
      created: new Date(),
    };
    fileData.push(newTodo);
    fs.writeFileSync("./db.json", JSON.stringify(fileData));
    fs.writeFileSync("./count.txt", JSON.stringify(count));
    console.log("Successfully added...");
    break;
  case "2":
    console.log(fileData);
    break;
  case "3":
    fileData = fileData.filter((t) => t.sl_no !== Number(input[1]));
    fs.writeFileSync("./db.json", JSON.stringify(fileData));
    console.log("Successfully deleted...");
    break;
  case "4":
    fileData[fileData.findIndex((t) => t.sl_no == input[1])].name = input[2];
    fs.writeFileSync("./db.json", JSON.stringify(fileData));
    console.log("Successfully updated...");
    break;
}
