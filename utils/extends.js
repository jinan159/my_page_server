module.exports = {
    /**
     * 기본객체 상속
     */
    initializeExtends: () => {
        Object.assign(String.prototype, {
            /**
             * 해당 String이 JSON String 인지 여부를 반환한다.
             * @returns 
             */
            isJsonString: function() {
                try { 
                    JSON.parse(this); 
                } 
                catch { 
                    return false; 
                }
                return true;
            },
        });
    }
}