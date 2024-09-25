/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
function debugLog(key: any, value: any) {
    /*
     * Pretty much this should never be on production
     * Could add this to a real logger instead but console.log will solve most of the need
     */
    if (isLowerEnvironment()) {
        console.log(key, value);
    }
}

function isLowerEnvironment() {
    if (process.env.NODE_ENV === "development") {
        return true;
    }
    return false;
}

export { debugLog, isLowerEnvironment };
