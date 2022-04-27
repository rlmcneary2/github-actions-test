const core = require("@actions/core");
const github = require("@actions/github");

try {
  core.debug(github.context);
  core.setOutput("issueId", "1");
} catch (err) {
  core.setFailed(err.message);
}
