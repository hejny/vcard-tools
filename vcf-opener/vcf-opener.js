var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var vcardElement = document.getElementById("vcard");
var socialElement = document.getElementById("social");
var openAllElement = document.getElementById("open-all");
var sumElement = document.getElementById("sum");
vcardElement.addEventListener("drop", function (event) { return __awaiter(_this, void 0, void 0, function () {
    var item, file, content;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                item = event.dataTransfer.items[0];
                file = item.getAsFile();
                return [4 /*yield*/, file.text()];
            case 1:
                content = _a.sent();
                vcardElement.value = content;
                convert();
                return [2 /*return*/];
        }
    });
}); });
openAllElement.addEventListener("click", function () {
    openAll();
});
vcardElement.addEventListener("keydown", convert);
vcardElement.addEventListener("change", convert);
for (var _i = 0, _a = Array.from(document.querySelectorAll("input.search")); _i < _a.length; _i++) {
    var searchElement = _a[_i];
    searchElement.addEventListener("click", convert);
    searchElement.addEventListener("change", convert);
}
convert();
function convert() {
    var source = vcardElement.value;
    var searchNetworks = Array.from(document.querySelectorAll("input.search"))
        .filter(function (element) { return element.checked; })
        .map(function (element) { return ({
        title: element.getAttribute("data-search-title"),
        template: element.getAttribute("data-search-template")
    }); });
    socialElement.innerHTML = "";
    var profilesCount = 0;
    var linksCount = 0;
    for (var _i = 0, _a = parseVcard(source); _i < _a.length; _i++) {
        var name_1 = _a[_i];
        profilesCount++;
        for (var _b = 0, searchNetworks_1 = searchNetworks; _b < searchNetworks_1.length; _b++) {
            var _c = searchNetworks_1[_b], title = _c.title, template = _c.template;
            linksCount++;
            var aElement = document.createElement("a");
            aElement.innerText = "".concat(name_1, " on ").concat(title);
            var url = (aElement.href = template
                .split("{{FULLNAME}}")
                .join(encodeURIComponent(name_1)));
            aElement.href = url;
            aElement.target = "_blank";
            aElement.addEventListener("click", function (event) {
                // Note: this is bacause annoying FB CORS rules on search page
                //event.preventDefault();
                //window.open(url);
            });
            socialElement.appendChild(aElement);
        }
    }
    sumElement.innerHTML = "&nbsp;".concat(profilesCount, "&nbsp;profiles&nbsp;(in ").concat(linksCount, " tabs)&nbsp;");
}
function openAll() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, aElement;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, _a = Array.from(socialElement.querySelectorAll("a"));
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    aElement = _a[_i];
                    console.log("Opening \"".concat(aElement.href, "\""));
                    window.open(aElement.href, "_blank");
                    return [4 /*yield*/, forTime(1)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/*
interface IContact{
  name?: string;
}
*/
function parseVcard(vcard) {
    return Array.from(vcard.matchAll(/^(FN:(?<firstname>.*?))$/gms)).map(function (match) { return match.groups.firstname; });
}
function forTime(miliseconds) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, miliseconds);
    });
}
