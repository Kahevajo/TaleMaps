async function parseLog(luaFile) {
    var logs = {
        logData: [],
        versions: [],
    }

    try {
        var text = await readFile(luaFile)
    } catch (error) {
        console.log(error)
        return null
    }

    var variables = text.body
    var logEntries = []
    var versionEntries = []
    for(var v of variables) {
        if (v.variables[0].name === "Tale_LogData") {
            for(var logEntry of v.init[0].fields) {
                logEntries.push(logEntry.value.value)
            }
        }
        if (v.variables[0].name === "Tale_VersionData") {
            for(var versionEntry of v.init[0].fields) {
                versionEntries.push(versionEntry.value.value)
            }
        }
    }

    for(let entry of logEntries) {
        logs.logData.push(entry.split(",").map(s => s.trim()))
    }
    for (let version of versionEntries) {
        logs.versions.push(version.split(",").map(s => s.trim()))
    }

    if(logs.versions.length === 0) {
        for(var i of logs.logData) {
            i.unshift("1.0.1")
        }
    } else {
        let nextStart = null
        let currentLog = 0
        for(let i = 0; i < logs.versions.length; i++) {
            if(!logs.versions[i+1]) {
                nextStart = logs.logData.length
            } else {
                nextStart = logs.versions[i+1][1]-1
            }
            while(currentLog < nextStart) {
                logs.logData[currentLog].unshift(logs.versions[i][0])
                currentLog++
            }
        }
    }

    if(logs.logData.length === 0) {
        return null
    } else {
        return logs
    }
}

function readFile(file) {
    var reader = new FileReader()

    return new Promise((resolve, reject) => {
        reader.onload = function (e) {
            var parser = require('luaparse');
            var ast = parser.parse(e.target.result);
            resolve(ast)
        };
        reader.onerror = function (e) {
            reject(e)
        };
        reader.readAsText(file)
    })
}

export default parseLog