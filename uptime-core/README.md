# uptime-core

Includes:

- [TypeScript](https://www.typescriptlang.org/), for writing good code
- [Ava](https://www.npmjs.com/package/ava), for writing good tests

Prerequisites:

- `node` and `npm`
- `npm install`
- Ensure the `AWS_REGION` and `AWS_PROFILE` environment variables are set, or that you have the appropriate AWS region and credentials configured elsewhere in your environment.

## Usage

### **dev**

`npm run dev`

Runs the application entrypoint.

### **clean**

`npm run clean`

Removes any built code and any built executables.

### **build**

`npm run build`

Cleans, then builds the TypeScript code.

Your built code will be in the `./dist/` directory.

### **test**

`npm run test`

Cleans, then builds, and tests the built code.
