import { TASK_TEST } from "hardhat/builtin-tasks/task-names";
// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";

import { useEnvironment } from "./helpers";

describe("Truffle plugin", function() {
  useEnvironment(__dirname + "/hardhat-truffle-project");

  it("default", async function() {
    await this.env.run(TASK_TEST, { testFiles: [] });
  });
});
