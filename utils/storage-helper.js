/**
 * work with chrome storage
 */
class StorageHelper {

    /**
     * save data to storage
     * @param dataObj
     */
    static setDataToStorage(dataObj) {
        chrome.storage.local.set(dataObj);
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
     */
    static clearLocalStorage() {
        chrome.storage.local.clear();
    }
}