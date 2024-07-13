# elliotisms
![](./logo.jpg)

Functions, classes, helpers I find myself using constantly.

## The list
- `create-build-number`: This function creates a build number based on the current date and time. It's useful for casual versioning.
- `create-test-directory-with-files`: This function creates a test directory with ransom files, and random content.
- `createFolderIfItDoesNotExist`: This function creates a folder if it does not exist.
- `delete-directory-and-files`: This function deletes a directory and all files in it. It's useful for cleaning up after tests.
- `exec`: This function executes a command in the terminal. Smaller than execa, but less features.
- `exists`: This function checks if a file or directory exists. It's useful for checking if a file or directory exists before reading or writing to it.
- `fdir`: This function reads a directory and returns a list of files in it. Uses `fdir` package with promises.
- `fuzzy-array-includes`: This function checks if an array includes a value. It's useful for checking if an array includes a value that is close to the value you are looking for.
- `get-script-path`: This function gets the path of the script that is currently running. It's useful for getting the path of the script that is currently running.
- `kosher-string`: The much-needed "is this a real string and value" check.
- `mapdeep`: Maps over an object deeply. 
- `minutes-until-420`: Used in build number function. Self-explanatory.
- `nice-date`: Returns a nice date string in my timezone.
- `nice-milliseconds`: Returns a nice milliseconds string.
- `promise-batch-all`: Batches promises. e.g, running fetch requests in batches.
- `replace-all`: Replaces all occurrences of a string in another string.
- `return-safe-filepath`: Takes in a filepath, and if it's valid, returns a filepath that won't overwrite anything. Increments the filename, if necessary.
- `slugify`: Converts a string to a slug based on my own feelings.
- `the-epoch`: Time since weird al yankovic was born.
- `truncate-filename`: Truncates a filename to a certain length.
- `xxhash`: xxhash-addon's xxhash3 implementation is probably the fastest hash function I've ever seen. This is a wrapper around it. All glory to the creator.
