# elliotisms
![](./logo.jpg)

Functions, classes, helpers I find myself using constantly. Probably not super helpful.

### Importing
Functions can be imported in parts in the form `elliotisms/<function>`, so for example:

```
import createBuildNumber from 'elliotisms/create-build-number'
```

## The List
### `create-build-number`

creates a build number based on the current date and time. It's useful for casual versioning. Returns: String.

### `create-test-directory-with-files`
creates a test directory with random files, and random content.

**Arguments:**
- `directoryPath` (string): The path where the test directory will be created.
- `fileCount` (number): The number of random files to create.
- `fileSize` (number): The size of each random file in bytes.

**Returns:**
- A promise that resolves when the directory and files are created.

### `createFolderIfItDoesNotExist`
This function creates a folder if it does not exist.

**Arguments:**
- `directoryPath` (string): The path of the directory to create.

**Returns:**
- A promise that resolves to the absolute path of the created directory.

### `delete-directory-and-files`
This function deletes a directory and all files in it. It's useful for cleaning up after tests. Returns: Promise.

### `deterministic-animal-id`
Given all English animal mononyms I could find, this function returns a deterministic animal ID based on a given hex string. Returns: String.


### `exec`
Just my version of process exec. Takes in a single command string.

### `exists`
FS/promises 'exists' function. Returns: Boolean.

### `fdir`
I really love fdir for its speed. This is a simple wrapper around it. Returns: Promise.

**Arguments:**
- `directoryPath` (string): The path of the directory to read.

**Returns:**
- A promise that resolves to an array of file paths.

### `fuzzy-array-includes`
This function checks if an array includes a value. It's useful for checking if an array includes a value that is close to the value you are looking for.

### `get-script-path`
This function gets the path of the script that is currently running. It's useful for getting the path of the script that is currently running.

###`kosher-string`
The much-needed "is this a real string and value" check.

### `mapdeep`: Maps over an object deeply. 

### minutes-until-420
Used in the build number function. Self-explanatory.


### `nice-date`
Returns a nice date string in my timezone.
### `nice-milliseconds`
Returns a nice milliseconds string.
### `promise-batch-all`
Batches promises. e.g, running fetch requests in batches.

### `replace-all`
Replaces all occurrences of a string in another string.

### `return-safe-filepath`
Takes in a filepath, and if it's valid, returns a filepath that won't overwrite anything. Increments the filename, if necessary. Used to output a file while making sure no overwriting is hapening.

### `slugify`
Converts a string to a slug based on my own arbitrary feelings about how formatting should be.

### `the-epoch`
Time since weird al yankovic was born.

### `truncate-filename`
Truncates a filename to a certain length.

**Arguments:**
- `filename` (string): The original filename.
- `maxLength` (number): The maximum length of the truncated filename.

**Returns:**
- A string representing the truncated filename.

### `xxhash` 
xxhash-addon's xxhash3 implementation is probably the fastest hash function I've ever seen. This is a wrapper around it. All glory to the creator.

### `yoctoid`

This ID is 10^{15} smaller than `nanoid`.

Arguments: - length (number): The length of the generated ID.

Returns: - A string representing the generated ID.
