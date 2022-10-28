const namesElement = document.getElementById("names") as HTMLTextAreaElement;
const noteElement = document.getElementById("note") as HTMLInputElement;
const vcardElement = document.getElementById("vcard") as HTMLInputElement;
const downloadElement = document.getElementById("download") as HTMLButtonElement;

initialize();

function initialize() {
  restoreStateFromHistory();
  namesElement.addEventListener("keydown", /*not await*/ handleChange);
  namesElement.addEventListener("change", /*not await*/ handleChange);
  noteElement.addEventListener("keydown", /*not await*/ handleChange);
  noteElement.addEventListener("change", /*not await*/ handleChange);
  convertNamesToVcard();

  downloadElement.addEventListener("click", () => {
    downloadVcard(noteElement.value.trim()||"contacts", vcardElement.value);
  });

}

async function handleChange() {
  await forImmediate();
  saveStateIntoHistory(/* TODO: Debounce */);
  convertNamesToVcard();
}

function convertNamesToVcard() {
  const note = noteElement.value.trim() || null;
  vcardElement.innerHTML = namesElement.value
    .split("\n")
    .flatMap((name) => [
      `BEGIN:VCARD`,
      `VERSION:3.0`,
      `FN:${name}`,
      note ? `NOTE:${note}` : null,
      `END:VCARD`,
    ])
    .filter((row) => row != null)
    .join("\n");
}

function saveStateIntoHistory() {
  const note = noteElement.value.trim();
  const names = namesElement.value.split("\n");

  // TODO: Maybe propperly pushState not just replace
  window.history.replaceState(
    {},
    "",
    `#${[...names, note].map((name) => encodeURIComponent(name)).join(",")}`
  );
}

function restoreStateFromHistory() {
  if (window.location.hash.length < 2) {
    // Note: There is no previous state to restore
    return;
  }

  const items = window.location.hash
    .substring(1)
    .split(",")
    .map((item) => decodeURIComponent(item));

  const note = items.pop();
  const names = items;

  noteElement.value = note;
  namesElement.value = names.join("\n");
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


function forImmediate(): Promise<void> {
  // Note: Not using setImmediate because it is non-standard feature only in browser window
  //       @see https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1);
  });
}

// TODO: !!! Same async+forImmediate everyhere
// TODO: !!! Same naming convertNamesToVcard everyhere
// TODO: !!! Same HTMLInputElement readonly everyhere
// TODO: !!! Create for all tools menu OR backink to main README
// TODO: !!! Same structure of control everyhere
// TODO: !!! Save input into URL after the hash part # everyhere
