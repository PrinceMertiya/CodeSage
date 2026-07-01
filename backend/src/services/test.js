const { scanRepository } = require("./src/services/scannerService");

(async () => {

    const files = await scanRepository("./workspace/react");

    console.log(files);

})();