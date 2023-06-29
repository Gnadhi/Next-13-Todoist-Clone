export async function fakeConnection(timeout: number, fails: boolean = false) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    "initiliazing connection. Awaiting resonse..."
  );
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(
        fails
          ? "\x1b[32mConnection established\x1b[0m"
          : "\x1b[31mConnection failed\x1b[0m"
      );
      resolve(fails);
    }, timeout);
  });
}
