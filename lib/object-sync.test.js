import  ObservableObject from './object-sync.js';

async function main() {
  const obj = new ObservableObject({ key1: 'value1' });
  const observed = obj.observedObject;

  // Simulate changes
  observed.key2 = 'value2';
  observed.key3 = 'value3';
  observed.key1 = 'new value';

  // Wait for changes to simulate a long-running process
  setTimeout(() => {
    observed.key4 = 'another value';
  }, 5000);
}

main();