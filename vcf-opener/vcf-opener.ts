const vcardElement = document.getElementById("vcard") as HTMLTextAreaElement;
const socialElement = document.getElementById("social");
const openAllElement = document.getElementById("open-all");
const sumElement = document.getElementById("sum");

vcardElement.addEventListener("drop", async (event) => {
  event.preventDefault();

  const item = event.dataTransfer.items[0];
  const file = item.getAsFile();
  const content = await file.text();
  vcardElement.value = content;
  convert();
});

openAllElement.addEventListener("click", () => {
  openAll();
});
vcardElement.addEventListener("keydown", convert);
vcardElement.addEventListener("change", convert);
for (const searchElement of Array.from(
  document.querySelectorAll("input.search")
)) {
  searchElement.addEventListener("click", convert);
  searchElement.addEventListener("change", convert);
}

convert();

function convert() {
  const source = vcardElement.value;

  const searchNetworks = Array.from(document.querySelectorAll("input.search"))
    .filter((element: HTMLInputElement) => element.checked)
    .map((element: HTMLInputElement) => ({
      title: element.getAttribute("data-search-title"),
      template: element.getAttribute("data-search-template"),
    }));

  socialElement.innerHTML = "";

  let profilesCount = 0;
  let linksCount = 0;
  for (const name of parseVcard(source)) {
    profilesCount++;
    for (const { title, template } of searchNetworks) {
      linksCount++;
      const aElement = document.createElement("a") as HTMLAnchorElement;
      aElement.innerText = `${name} on ${title}`;
      const url = (aElement.href = template
        .split("{{FULLNAME}}")
        .join(encodeURIComponent(name)));

      aElement.href = url;
      aElement.target = "_blank";
      aElement.addEventListener("click", (event) => {
        // Note: this is bacause annoying FB CORS rules on search page
        //event.preventDefault();
        //window.open(url);
      });

      socialElement.appendChild(aElement);
    }
  }
  sumElement.innerHTML = `&nbsp;${profilesCount}&nbsp;profiles&nbsp;(in ${linksCount} tabs)&nbsp;`;
}

async function openAll() {
  for (const aElement of Array.from(socialElement.querySelectorAll("a"))) {
    console.log(`Opening "${aElement.href}"`);
    window.open(aElement.href, "_blank");
    await forTime(1);
    // Note: In a browser plugin or with a manifest> chrome.tabs.create({ url: aElement.href });
  }
}

/*
interface IContact{
  name?: string; 
}
*/

function parseVcard(vcard: string): string[] {
  return Array.from(vcard.matchAll(/^(FN:(?<firstname>.*?))$/gms)).map(
    (match) => match.groups.firstname
  );
}

function forTime(miliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, miliseconds);
  });
}
