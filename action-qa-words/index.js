import core from "@actions/core";
import { context } from "@actions/github";

try {
  core.debug(context);
  core.setOutput("issueId", "1");
} catch (err) {
  core.setFailed(err.message);
}
