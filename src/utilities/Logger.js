class rzLogger {
    constructor(filename = "") {
        this.filename = filename;
        this.enablePrintFunctionEnter = true;
        this.enablePrintData = true;
        this.enablePrintResult = true;
        this.enablePrintWarning = true;

        // function to print the filename and line number which is the same as the console.log
        // this.log = console.log.bind(window.console);
    }

    /**
	function to print the filename and line number which is the same as the console.log
	 */
    // log = console.log.bind(window.console);
    // log() {
    // 		console.log.bind(window.console);
    // }
    // log = () => {
    // 	console.log.bind(window.console);
    // }

    // constructor(name = 'default') {
    // 	this.name = name;
    // 	this.log = this.log.bind(this);
    // 	this.info = this.info.bind(this);
    // 	this.warn = this.warn.bind(this);
    // 	this.error = this.error.bind(this);
    // 	this.trace = this.trace.bind(this);
    // }

    // log(level, ...args) {
    // 	if (__MOBILE__) {
    // 		console[level || 'log'](`[${this.name}]`, ...args);
    // 	}
    // 	else {
    // 		console[level || 'log'](`%c[${this.name}]`, STYLE, ...args);
    // 	}
    // }

    // info(...args) {
    // 	this.log('info', ...args);
    // }

    // warn(...args) {
    // 	this.log('warn', ...args);
    // }

    // error(...args) {
    // 	this.log('error', ...args);
    // }

    // trace(...args) {
    // 	this.log('trace', ...args);
    // }

    printFunctionEnter = (fnName, dataIn) => {
        if (this.enablePrintFunctionEnter) {
            if (dataIn === undefined) {
                console.log(this.filename, "-", `${fnName}()`);
            } else {
                console.log(this.filename, "-", `${fnName}():`, dataIn);
            }
        }
    };

    printError = (fnName, error, extra = "") => {
        if (extra !== "") console.error(`${this.filename}-${fnName}() !!!error: `, extra);
        console.error(`${this.filename}-${fnName}() !!!error: `, error);
    };

    printResult = (fnName, result) => {
        if (this.enablePrintResult) {
            console.log(`${fnName}() result:`, result);
        }
    };

    printData = (fnName, ...data) => {
        if (this.enablePrintData) {
            if (data.length === 1) {
                console.log(this.filename, "-", fnName, ":", data[0]);
            } else {
                console.log(this.filename, "-", fnName, ":", data);
            }
        }
    };

    printWarning = (fnName, ...data) => {
        if (this.enablePrintWarning) {
            if (data.length === 1) {
                console.log(this.filename, "-", fnName, ":", data[0]);
            } else {
                console.log(this.filename, "-", fnName, ":", data);
            }
        }
    };
}

export default rzLogger;
