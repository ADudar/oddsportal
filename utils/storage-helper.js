/**
 * work with chrome storage
 */
class StorageHelper {

    /**
     * save data to storage
     * @param dataObj
     * @param callback
     */
    static setDataToStorage(dataObj, callback) {
        chrome.storage.local.set(dataObj, callback);
    }

    /**
     * get data from storage
     * @param dataArr properties name array
     * @param callback static on get
     */
    static getDataFromStorage(dataArr, callback) {
        chrome.storage.local.get(dataArr, callback);
    }

    /**
     * clear chrome local storage
     * @param callback
     */
    static clearLocalStorage(callback) {
        chrome.storage.local.clear(callback);
    }
}