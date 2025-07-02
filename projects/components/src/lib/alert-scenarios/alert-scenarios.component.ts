import { Component, OnInit, Input } from '@angular/core';
import { Control, ControlMemberApi, TypeAttributes } from '@sassoftware/vi-api/control';
import { PageModel } from '@sassoftware/vi-api/page-model';
import { SviWindow } from "@sassoftware/vi-api";
import { HttpResponse } from "@sassoftware/vi-api/http";
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AlertScenario } from './interface';

export interface Alert{
  
}

@Component({
  selector: 'sol-alert-scenarios',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './alert-scenarios.component.html'
})
export class AlertScenariosComponent implements OnInit {
  @Input() childNode!: Control;
  @Input() pageModel!: PageModel;
  @Input() controlApi!: ControlMemberApi;

  public rowData: AlertScenario[] = [];
  private gridApi!: GridApi;

  // Column definitions for alert scenarios
  colDefs: ColDef[] = [
    // { field: 'scenario_id', headerName: 'Scenario ID', cellDataType: 'text', minWidth: 120 },
    { field: 'scenario_name', headerName: 'Scenario Name', cellDataType: 'text', minWidth: 300 },
    { field: 'scenario_desc', headerName: 'Scenario Description', cellDataType: 'text', minWidth: 300 },
    { field: 'param', headerName: 'Scenario Parameter', cellDataType: 'text', minWidth: 300 },
    { field: 'pval', headerName: 'Scenario Value', cellDataType: 'text', minWidth: 300 }
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    editable: false,
    filter: true,
    sortable: true,
    resizable: true
  };

  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10, 25, 50];

  constructor() {
    ModuleRegistry.registerModules([AllCommunityModule]);
  }
  
  ngOnInit(): void {
    console.log('typeeee',this.pageModel.type);
    console.log('nameeee',this.pageModel);
    console.log('pageModel.data:', this.pageModel.data);
    console.log('alert_id:', this.pageModel.data['alert_id']);
    // Component will load data when grid is ready
  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

  // Main data loading method (following your reference pattern)
  async onGridReady(params: GridReadyEvent<AlertScenario>) {
    this.gridApi = params.api;
    console.log("pageModel:", this.pageModel);
    console.log('pageModel.data:', this.pageModel.data);
    console.log('alert_id:', this.pageModel.data['alert_id']);
    const sviWindow = window as SviWindow;
    const jobPath = this.childNode.typeAttributes?.['jobPath'];
    if (!jobPath) {
      console.error("Job Execution Path is not configured in control attributes.");
      return;
    }
    console.log('1',jobPath);
    try {
      console.log('2',jobPath);
      await sviWindow.sas.vi.http.get(`/SASJobExecution/?_program=${encodeURIComponent(jobPath)}&aid=${this.pageModel.data['alert_id']}`
      )
        .then((response: HttpResponse<string>) => {
          console.log("Alert scenarios response:", response);
          
          const respString = JSON.stringify(response.body);
          const respJson = JSON.parse(respString).results;
          
          console.log("Response JSON:", respJson);

          // Process date fields
          for (let k = 0; k < respJson.length; k++) {
            if (respJson[k].last_triggered) {
              respJson[k].last_triggered = new Date(respJson[k].last_triggered);
            }
            if (respJson[k].created_date) {
              respJson[k].created_date = new Date(respJson[k].created_date);
            }
          }

          if (response && response.body) {
            this.rowData = respJson;
          } else {
            console.error("Error fetching alert scenarios:", response);
            throw new Error("Invalid response format");
          }
        });

    } catch (error) {
      console.error("Error loading alert scenarios:", error);
    } finally {
      this.gridApi.setGridOption("loading", false);
    }
  }

  // onSave() {
  //   // TODO: Implement your save logic here
  //   console.log('Save button clicked!');
  //   //this.controlApi.save();
  //   // You can access this.rowData or gridApi as needed
  // } 
  
}
