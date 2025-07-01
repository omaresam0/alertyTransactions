import { APP_INITIALIZER, Injector, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AlertScenariosComponent } from "./alert-scenarios.component";
import { createCustomElement } from "@angular/elements";
import { control } from './alert-scenarios.control';
import { SviWindow } from "@sassoftware/vi-api";
import { AgGridModule } from "ag-grid-angular";

@NgModule({
  imports: [AgGridModule, CommonModule, FormsModule, AlertScenariosComponent],
  exports: [AlertScenariosComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (injector: Injector) => {
        return () => {
          customElements.define(
            control.directiveName,
            createCustomElement(AlertScenariosComponent, { injector: injector })
          );
          
          const sviWindow = window as SviWindow;
          sviWindow.sas.vi?.config.registerSolutionExtension(control);
        };
      },
      deps: [Injector],
    },
  ],
})
export class AlertScenariosModule {}
