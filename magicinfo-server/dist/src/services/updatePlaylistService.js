"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlaylistService = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
function updatePlaylistService({ accessToken, playlistId }) {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv.config();
        const baseUrl = process.env.API_ADDRESS;
        const playlistDetails = yield axios_1.default.get(baseUrl + `/cms/playlists/${playlistId}`, {
            headers: {
                'api_key': accessToken,
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            const res = response.data;
            return res;
        }).catch(error => {
            console.error(error);
        });
        const editedPlaylistDetails = (playlistDetails) => {
            const { items } = playlistDetails;
            const { contents, contentCount } = playlistDetails.items;
            const newContents = contents.pop();
            const newContentOrder = 1;
            const finalContents = [Object.assign(Object.assign({}, newContents), { contentOrder: newContentOrder })];
            const newContentCount = contentCount - 1;
            const newPlaylistDetails = Object.assign(Object.assign({}, items), { shuffleFlag: false, contents: finalContents, contentCount: newContentCount });
            return newPlaylistDetails;
        };
        const playListData = editedPlaylistDetails(playlistDetails);
        if (playListData) {
            yield axios_1.default.put(baseUrl + `/cms/playlists/${playlistId}`, playListData, {
                headers: {
                    'api_key': accessToken,
                    'Accept': 'application/json; charset=utf-8',
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                const res = response.data;
                return res;
            }).catch(error => {
                console.error(error);
            });
        }
    });
}
exports.updatePlaylistService = updatePlaylistService;
//# sourceMappingURL=updatePlaylistService.js.map