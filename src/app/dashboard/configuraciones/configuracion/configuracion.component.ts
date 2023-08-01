import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { finalize } from 'rxjs/operators';
import { ConfiguracionService } from 'src/app/core/service/configuracion.service';
import { MonedaService } from 'src/app/core/service/moneda.service';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  @Input() Id: string;
  form: FormGroup;
  imagen:any;
  url2:any;
  url= environment.imgUrl;
  configuracion: any;
  submitted=false;
  isLoading=false;
  loadingScroll: boolean;
  
  constructor(
    private configuracionService: ConfiguracionService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.showConfig();

    this.configuracionService.getAll().subscribe(data => {
      // console.log(data);
      this.form.patchValue({
        nombre_empresa: data.nombre_empresa,
        departamento: data.departamento,
        direccion: data.direccion,
        contacto: data.nombre_empresa,
        cambio_moneda: data.cambio_moneda,
        cod_p_digitos:data.cod_p_digitos,
        cod_p_prefijo:data.cod_p_prefijo,
        text_footer:data.text_footer,
      });
    });
  }

  createForm(){
    this.form=this.formBuilder.group({
      nombre_empresa: [''],
      departamento: [''],
      direccion:[''], 
      contacto:[''], 
      cambio_moneda:[''], 
      cod_p_digitos:[''],
      cod_p_prefijo:[''],
      text_footer:[''],
      logo_url:[''],
    })    
  }

  showConfig() {
    this.configuracionService.getAll().subscribe(data =>{
      this.configuracion = data;
      console.log('conf',this.configuracion);
    })
  }

  register(form:any){
    const formData=new FormData();
    formData.append("file",this.imagen);
    formData.append("nombre_empresa",this.form.value.nombre_empresa);
    formData.append("departamento",this.form.value.departamento);
    formData.append("direccion",this.form.value.direccion);
    formData.append("contacto",this.form.value.contacto);
    formData.append("cambio_moneda",this.form.value.cambio_moneda);
    formData.append("cod_p_digitos",this.form.value.cod_p_digitos);
    formData.append("cod_p_prefijo",this.form.value.cod_p_prefijo);
    formData.append("text_footer",this.form.value.text_footer);
    this.configuracionService.create(formData)
    .pipe(
      finalize(() => {
    
        this.form.markAsPristine();
        this.isLoading=false;
      })
      
    )
    .subscribe(
      data => {
        this.toastr.success(data.success, 'Éxito');
        this.showConfig();
      },
      (error: any) => {
        this.toastr.error(error.error, 'Error');
      }
    );
    console.log("form: ",form);
    console.log("conf2:",this.configuracion);
  }

  disablesandenbled(controlname:any){
    this.form.get(controlname).enable();
  }

  onSelectFile(event) {
    
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      this.imagen = event.target.files[0]
      reader.onload = (event) => {
        this.url2 = event.target.result;
      }
    }
  }
}
