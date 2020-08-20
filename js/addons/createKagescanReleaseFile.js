/* Kagescan release file generator. Part of the Retaining's Memories Fangame.
 * Copyright (c) Kagescan (Aka. Logan "ShinProg" Tann)
 * Usage : step 1. npm run createKagescanReleaseFile
 *         step 2. Edit manually the file if needed.
 *         step 3. Deploy in the API
 * edit parts where there is a /!\
*/


// /!\ shoud be updated to .gitignore
const ignore = [
  // OF COURSE NOT :
  /.git/g,
  /node_modules/g,
  // dev files
  /Monogatari\//g,
  /engine\/core\/old/g,
  /build/g,
  // Unused ressources for the release
  /engine\/debug/g,
  /engine\/electron/g,
  /engine\/error/g,
  /engine\/nginx/g,
  /scripts-oldVersion/g,

  // Unused files for the release
  /\.htaccess/g,
  /\.zip/g,
  /\.xcf/g,
  /\.pmm/g,
  /KagescanReleaseFile\.json/g,
  /ignore/g
];
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prettyDisplayPath(dir, file = "") {
  const joinedPath = path.join(dir, file);
  const normalizedPath = path.normalize(joinedPath);
  const noBackslashesPath = normalizedPath.replace(/\\/g, '/');
  return noBackslashesPath;
}

function checksumFile(path) {
  /* Given the file [path], this will return an array that contains the file
   * path (pretty displayed) and the hash (sha1) of this file.
   */
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha1');
    const stream = fs.createReadStream(path);
    stream.on('error', err => reject(err));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => {
      const file_path = prettyDisplayPath(path);
      const file_hash = hash.digest('hex');
      resolve( [file_path, file_hash] );
    });
  });
}

async function walkFiles(dir) {
  /* Returns the hash of every file in this folder, recursively (as long as they
   * aren't ignored). Muliple dimentions in this arrays
  */
  const promise_list = [];
  const files = fs.readdirSync(dir);
  files.forEach(async function(file) {
    for (const regex of ignore) {
      const prettyPath = prettyDisplayPath(dir, file);
      if (prettyPath.match(regex)) {
        console.log(' [',prettyPath,"] have been ignored by the rule", regex);
        return false;
      }
    }
    // once file don't match with ignore patterns :
    const joined_path = path.join(dir, file);
    if (fs.statSync(joined_path).isDirectory()) {
      promise_list.push( walkFiles(joined_path) );
    } else {
      promise_list.push( checksumFile(joined_path) );
    }
  });
  return Promise.all(promise_list);
};


async function normalizeWalkFiles(dir = "./") {
  /* Calls walkFiles(dir), flats the array to be like this pattern :
   * [[location, Hash], [location, Hash], [location, Hash], ... ]
  */

  /* Internal simple synchronous & recursive function*/
  function normalizeBranch(main_array, retval) {
    for (const child_array of main_array) {
      if (! Array.isArray(child_array)) {
        console.log("OW SHIIIT NOOO WHYY THIS DON'T WORK");
        continue;
      }
      if (Array.isArray(child_array[0])) {
        const normalizedBranch = normalizeBranch(child_array, retval);
        retval.concat(normalizedBranch);
      } else { // this is a string
        retval.push(child_array);
      }
    }
    return retval;
  }
  // stuff
  const walkFilesResult = await walkFiles(dir);
  const finalArray = normalizeBranch(walkFilesResult, []);
  finalArray.sort();
  return finalArray;
}

function getDate() {
  const objToday = new Date();
  const dayOfMonth = ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate();
  const months = new Array('Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.');
  return `${dayOfMonth} ${months[objToday.getMonth()]} ${objToday.getFullYear()}`;
}

function main() {
  const outputObject = {
    "version":require(`${process.cwd()}/package.json`).version,
    "releaseDate": getDate(),
    "downloadZipLink": "https://github.com/LoganTann/kagepro2/archive/releases.zip"
  };
  console.log(outputObject, "\n");
  rl.question(
    "To generate the release file that kagescan will handle, make sure you updated\n"
    + "the version in package.json. [press y to continue, anything to quit] > ",
    async function(answer) {
      if (/y/gi.test(answer)) {
        outputObject["__comment"] = "(c) 2017-2020 Kagescan. This file is compatible with updater version 0.1.x";
        outputObject["hashList"] = await normalizeWalkFiles();

        const jsonContent = JSON.stringify(outputObject, null, 1);
        const outfile = path.join(process.cwd(),"KagescanReleaseFile.json");
        try {
          fs.writeFileSync(outfile, jsonContent);
          console.log("✅ Job done ! Saved at :", outfile);
        } catch (e) {
          console.error("❌ Got an error : ", e);
        }
      } else {
        // IDK why, but adding this will end the script once it's finished.
        // Without it, it wouldn't top exiting the process.
        const nothing = await Promise.resolve();
        console.log("Aborted");
      }

      rl.close();
  });

  rl.on("close", function() {
      //
  });
}


main();
