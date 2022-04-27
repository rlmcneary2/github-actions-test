import core from "@actions/core";
import { context } from "@actions/github";

try {
  core.debug(JSON.stringify(context, null, 2));
  core.setOutput("issueId", "1");
} catch (err) {
  core.setFailed(err.message);
}
