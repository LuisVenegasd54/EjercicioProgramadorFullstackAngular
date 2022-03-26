import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ClientHttpServiceService } from 'src/app/Services/clientHttpService/client-http-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  public _listNoMutations:any=[];
  public _listMutations:any=[];
  public _dnaModel:FormGroup
  public _date:any;
  constructor(private http:ClientHttpServiceService, private fb: FormBuilder, private router:Router ) {
    this._dnaModel = this.fb.group({
      dna: ['', [Validators.required]],
    })
   }

  async ngOnInit() {
    this.get()
  }

  private get(){
    this.getMutations();
    this._date=new Date().toLocaleDateString();
    this.getListMutations();
    this.getListNoMutations();
  }

  private async getMutations(){
    const _response=await this.http.httpClientGet("stats");
    this.setstats(_response);
  }

  private async getListMutations(){
    const _response=await this.http.httpClientGet("list/mutations");
    this._listMutations=_response.data._responseMutation;
    console.log(this._listMutations)
  }

  private async getListNoMutations(){
    const _response=await this.http.httpClientGet("list/notmutation");
    this._listNoMutations=_response.data._responseMutation;
    console.log(this._listNoMutations)
  }

  public async save(){
    if(this._dnaModel.valid){
      const _model=this._dnaModel.value.dna.split(",");
      const x={dna:_model}
      const _response=await this.http.httpClientPost("mutation",x);
      console.log(_response)
      if(_response.statuscode==200 && _response.haserrors==false){
        if(_response.data.mutations>0){
          Swal.fire({
            title: "Aviso",
            html:"La cadena "+_model+" contiene "+ _response.data.mutations,
            icon: "info",
            confirmButtonText: "OK",
          }).then(async (result) => {
            if (result.value) {   
               this.router.navigate(["/stats"])         
            }
        });
        }
        if(_response.data.mutations==0){
          Swal.fire({
            title: "Aviso",
            html:"La cadena "+_model+" no contiene ninguna mutación.",
            icon: "info",
            confirmButtonText: "OK",
          }).then(async (result) => {
            if (result.value) {   
               this.router.navigate(["/stats"])         
            }
        });
        }
      }
      this._dnaModel.reset();
      this.get();
    }else{
      Swal.fire({
        title: "Aviso",
        text:"El campo DNA es requerido.",
        icon: "info",
        confirmButtonText: "OK",
      })
    }
  }

  setstats(data:any){
    const myChart = new Chart("myChart", {
      type: 'bar',
      data: {
          labels: ['No MUTACIONES', 'MUTACIONES', 'RATIO'],
          datasets: [{
              label: '# MUTACIONES',
              data: [data.data.count_no_mutation,data.data.count_mutations, data.data.ratio],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }
  get Control_dna(){ return this._dnaModel.controls}
}
