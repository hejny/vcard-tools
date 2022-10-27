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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var namesElement = document.getElementById("names");
var noteElement = document.getElementById("note");
var vcardElement = document.getElementById("vcard");
initialize();
function initialize() {
    restoreStateFromHistory();
    namesElement.addEventListener("keydown", /*not await*/ handleChange);
    namesElement.addEventListener("change", /*not await*/ handleChange);
    noteElement.addEventListener("keydown", /*not await*/ handleChange);
    noteElement.addEventListener("change", /*not await*/ handleChange);
    convertNamesToVcard();
}
function handleChange() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, forImmediate()];
                case 1:
                    _a.sent();
                    saveStateIntoHistory( /* TODO: Debounce */);
                    convertNamesToVcard();
                    return [2 /*return*/];
            }
        });
    });
}
function convertNamesToVcard() {
    var note = noteElement.value.trim() || null;
    vcardElement.innerHTML = namesElement.value
        .split("\n")
        .flatMap(function (name) { return [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "FN:".concat(name),
        note ? "NOTE:".concat(note) : null,
        "END:VCARD",
    ]; })
        .filter(function (row) { return row != null; })
        .join("\n");
}
function saveStateIntoHistory() {
    var note = noteElement.value.trim();
    var names = namesElement.value.split("\n");
    // TODO: Maybe propperly pushState not just replace
    window.history.replaceState({}, "", "#".concat(__spreadArray(__spreadArray([], names, true), [note], false).map(function (name) { return encodeURIComponent(name); }).join(",")));
}
function restoreStateFromHistory() {
    if (window.location.hash.length < 2) {
        // Note: There is no previous state to restore
        return;
    }
    var items = window.location.hash
        .substring(1)
        .split(",")
        .map(function (item) { return decodeURIComponent(item); });
    var note = items.pop();
    var names = items;
    noteElement.value = note;
    namesElement.value = names.join("\n");
}
function forImmediate() {
    // Note: Not using setImmediate because it is non-standard feature only in browser window
    //       @see https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate
    return new Promise(function (resolve) {
        setTimeout(function () {
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
