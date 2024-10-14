import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import url from 'node:url';

class ObservableObject {
  constructor(initialData = {}, fileName = 'observedObject.json', debounceTime = 200) {
    this.filePath = path.join(path.dirname(url.fileURLToPath(import.meta.url)), fileName);
    this.data = new Proxy(initialData, this.createHandler());
    this.hasUnsavedChanges = false;
    this.debounceTimeout = null;
    this.debounceTime = debounceTime;

    // Attach handlers to save on process exit
    this.attachExitHandlers();
  }

  createHandler() {
    return {
      set: (target, property, value) => {
        target[property] = value;
        this.hasUnsavedChanges = true;
        this.debounceSaveToFile();
        return true;
      }
    };
  }

  debounceSaveToFile() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(async () => {
      await this.saveToFile();
    }, this.debounceTime);
  }

  async saveToFile() {
    if (!this.hasUnsavedChanges) return;

    try {
      await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2), 'utf8');
      console.log(`Object saved to ${this.filePath}`);
      this.hasUnsavedChanges = false;
    } catch (error) {
      console.error('Error saving object:', error);
    }
  }

  attachExitHandlers() {
    const saveBeforeExit = async () => {
      if (this.hasUnsavedChanges) {
        console.log('Process is exiting, saving data...');
        await this.saveToFile();
      }
      process.exit();
    };

    // Handle SIGINT (Ctrl+C)
    process.once('SIGINT', saveBeforeExit);

    // Handle SIGTERM (kill command)
    process.once('SIGTERM', saveBeforeExit);

    // Handle normal process exit
    process.once('exit', saveBeforeExit);
  }

  get observedObject() {
    return this.data;
  }
}

export default ObservableObject;
