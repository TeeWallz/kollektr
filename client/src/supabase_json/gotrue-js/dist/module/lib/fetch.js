var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NETWORK_FAILURE } from './constants';
const _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const handleError = (error, reject) => {
    if (!(error === null || error === void 0 ? void 0 : error.status)) {
        return reject({ message: NETWORK_FAILURE.ERROR_MESSAGE });
    }
    if (typeof error.json !== 'function') {
        return reject(error);
    }
    error.json().then((err) => {
        return reject({
            message: _getErrorMessage(err),
            status: (error === null || error === void 0 ? void 0 : error.status) || 500,
        });
    });
};
const _getRequestParams = (method, options, body) => {
    const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
    if (method === 'GET') {
        return params;
    }
    params.headers = Object.assign({ 'Content-Type': 'application/json;charset=UTF-8' }, options === null || options === void 0 ? void 0 : options.headers);
    params.body = JSON.stringify(body);
    return params;
};
function _handleRequest(fetcher, method, url, options, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fetcher(url, _getRequestParams(method, options, body))
                .then((result) => {
                if (!result.ok)
                    throw result;
                if (options === null || options === void 0 ? void 0 : options.noResolveJson)
                    return resolve;
                return result.json();
            })
                .then((data) => resolve(data))
                .catch((error) => handleError(error, reject));
        });
    });
}
export function get(fetcher, url, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest(fetcher, 'GET', url, options);
    });
}
export function post(fetcher, url, body, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest(fetcher, 'POST', url, options, body);
    });
}
export function put(fetcher, url, body, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest(fetcher, 'PUT', url, options, body);
    });
}
export function remove(fetcher, url, body, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest(fetcher, 'DELETE', url, options, body);
    });
}
//# sourceMappingURL=fetch.js.map