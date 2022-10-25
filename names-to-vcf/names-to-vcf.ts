
const namesElement = document.getElementById("names") as HTMLTextAreaElement;
const vcardElement = document.getElementById("vcard");


vcardElement.addEventListener("keydown", convertNamesToVcard);
vcardElement.addEventListener("change", convertNamesToVcard);
convertNamesToVcard();

function convertNamesToVcard() {
  vcardElement.innerHTML = namesElement.value;
}
