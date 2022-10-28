const fbFriendsElement = document.getElementById("fb-friends") as HTMLTextAreaElement;
const vcardElement = document.getElementById("vcard") as HTMLTextAreaElement;
const downloadElement = document.getElementById("download") as HTMLButtonElement;

//alert(utf8.decode('\u00c3\u00a1\u00c3\u00a1'));

downloadElement.addEventListener("click", () => {
  downloadVcard("fb-friends", vcardElement.value);
});
fbFriendsElement.addEventListener("keydown", convert);
fbFriendsElement.addEventListener("change", convert);
convert();

function convert() {
  const source = JSON.parse(
    fbFriendsElement.value.replace(/(\\u.{4}){2}/g, (utf8EncodedChar) => {
      try{
      utf8EncodedChar = eval(`"${utf8EncodedChar}"`);
      return (window as any /* <- TODO: Add lib definition */).utf8.decode(utf8EncodedChar);
      }catch(error){
          console.info('utf8EncodedChar',utf8EncodedChar);
          console.error(error);
        return '?'
      }
    })
  );

  const vCard = source.friends
    .map((friend) => {
      // TODO: Detect if there is more than name, timestamp and contact_info
      // TODO: Use contact_info in note

      /*
      let name = friend.name;
      try {
        name = utf8.decode(friend.name);
      } catch (error) {
        console.error(error);
      }*/

      return `
BEGIN:VCARD
VERSION:3.0
FN:${friend.name}
NOTE:Imported from Facebook friends
${
  friend.contact_info
    ? `EMAIL:${friend.contact_info}
`
    : ""
}END:VCARD
        `.trim();
    })
    .join("\n");

  vcardElement.value = vCard;
}

function downloadVcard(filename:string, contacts:string) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/vcard;charset=utf-8," + encodeURIComponent(contacts)
  );
  element.setAttribute("download", filename + ".vcf");

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
}
