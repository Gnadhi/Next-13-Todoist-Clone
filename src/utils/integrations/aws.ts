// interface AwsCredentials {
//   acccessKeyId: string;
//   secretAccessKey: string;
//   region?:
//     | "eu-west"
//     | "eu-west-2"
//     | "eu-east"
//     | "eu-east-2"
//     | "na-west"
//     | "na-west-2"
//     | "na-east"
//     | "na-east-2";
//
//   checkConnection(): Promise<boolean>;
//   fetchResources(): Promise<any>;
// }

// crate a class with a constructor and methods to check connection and fetch resourdes
class AwsIntegration {
  acccessKeyId?: string;
  secretAccessKey? = "";

  region?:
    | "eu-west"
    | "eu-west-2"
    | "eu-east"
    | "eu-east-2"
    | "na-west"
    | "na-west-2"
    | "na-east"
    | "na-east-2";

  async checkConnection(): Promise<boolean> {
    // check connection
    return new Promise((res, _rej) => {
      setTimeout(() => {
        return res(true);
      }, 100);
    });
  }

  async fetchResources(): Promise<any> {
    // fetch resources
    return new Promise((res, _rej) => {
      setTimeout(() => {
        return res("stuff");
      }, 100);
    });
  }

  public static async checkStatus(): Promise<boolean> {
    return new Promise((res, _rej) => {
      setTimeout(() => {
        return res(true);
      }, 100);
    });
  }
}
