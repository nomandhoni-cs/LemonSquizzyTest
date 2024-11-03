import { licenseApi } from "../utils/licenseApi";

// Activate a license
const result = await licenseApi.activate("your-license-key", "instance-name");

// Validate a license
const validationResult = await licenseApi.validate(
  "your-license-key",
  "instance-id"
);

// Deactivate a license
const deactivationResult = await licenseApi.deactivate(
  "your-license-key",
  "instance-id"
);
