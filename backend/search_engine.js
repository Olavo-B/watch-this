import { PythonShell } from 'python-shell';

function stringToArray(inputString, delimiter) {
  // Use the split method to convert the string to an array
  const resultArray = inputString.split(delimiter);
  return resultArray;
}


export function searchEngine(arg) {
  return new Promise((resolve, reject) => {
    let options = {
      mode: 'text',
      pythonOptions: ['-u'], // get print results in real-time
      scriptPath: './model/',
      args: [arg] // Pass the single string argument to the script
    };

    // Create an empty string to store the output
    let pythonOutput = '';

    // Create a PythonShell instance
    const pyshell = new PythonShell('model.py', options);

    // Listen for the 'message' event, which is emitted when the Python script sends a message
    pyshell.on('message', (message) => {
      // Append each message to the output string
      pythonOutput += message;
    });

    // End the input stream and close the PythonShell instance
    pyshell.end((err, code, signal) => {
      if (err) {
        reject(err);
      } else {
        // Resolve the promise with the combined output
        resolve(pythonOutput);
      }
    });
  });
}

