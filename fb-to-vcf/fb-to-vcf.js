var fbFriendsElement = document.getElementById("fb-friends");
var vcardElement = document.getElementById("vcard");
var downloadElement = document.getElementById("download");
//alert(utf8.decode('\u00c3\u00a1\u00c3\u00a1'));
downloadElement.addEventListener("click", function () {
    downloadVcard("fb-friends", vcardElement.value);
});
fbFriendsElement.addEventListener("keydown", convert);
fbFriendsElement.addEventListener("change", convert);
convert();
function convert() {
    var source = JSON.parse(fbFriendsElement.value.replace(/(\\u.{4}){2}/g, function (utf8EncodedChar) {
        try {
            utf8EncodedChar = eval("\"".concat(utf8EncodedChar, "\""));
            return window /* <- TODO: Add lib definition */.utf8.decode(utf8EncodedChar);
        }
        catch (error) {
            console.info('utf8EncodedChar', utf8EncodedChar);
            console.error(error);
            return '?';
        }
    }));
    var vCard = source.friends
        .map(function (friend) {
        // TODO: Detect if there is more than name, timestamp and contact_info
        // TODO: Use contact_info in note
        /*
        let name = friend.name;
        try {
          name = utf8.decode(friend.name);
        } catch (error) {
          console.error(error);
        }*/
        return "\nBEGIN:VCARD\nVERSION:3.0\nFN:".concat(friend.name, "\nNOTE:Imported from Facebook friends\n").concat(friend.contact_info
            ? "EMAIL:".concat(friend.contact_info, "\n")
            : "", "END:VCARD\n        ").trim();
    })
        .join("\n");
    vcardElement.value = vCard;
}
function downloadVcard(filename, contacts) {
    var element = document.createElement("a");
    element.setAttribute("href", "data:text/vcard;charset=utf-8," + encodeURIComponent(contacts));
    element.setAttribute("download", filename + ".vcf");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
