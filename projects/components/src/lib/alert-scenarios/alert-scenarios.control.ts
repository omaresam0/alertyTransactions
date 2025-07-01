import { ControlType } from "@sassoftware/vi-api/config";


export const control = {
  category: "Fields",
  controlDescription: {
    defaultText: "alertScenarios"
  },
  directiveName: "sol-alert-scenarios",
  displayName: {
    defaultText: "alertScenarios"
  },
  name: "alertScenarios",
  controlAttributes: {
    attributes: {},
    metadata: {
      renderAs: ControlType.WebComponent,
      states: {
        readOnly: true,
        required: true
      }
    }
  }
};
