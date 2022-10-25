var namesElement = document.getElementById("names");
var vcardElement = document.getElementById("vcard");
vcardElement.addEventListener("keydown", convertNamesToVcard);
vcardElement.addEventListener("change", convertNamesToVcard);
convertNamesToVcard();
function convertNamesToVcard() {
    const note = '';
    vcardElement.innerHTML = namesElement.value.split('\n').map((name)=>`BEGIN:VCARD
    VERSION:3.0
    FN:${name}
    NOTE:${note}
    END:VCARD`).join('\n');
}
