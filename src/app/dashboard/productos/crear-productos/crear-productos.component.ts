import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { ProductoService } from 'src/app/core/service/producto.service';
import { CategoriaService } from 'src/app/core/service/categoria.service';
import { MarcaService } from 'src/app/core/service/marca.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MyUploadAdapter } from "../../../core/class/ckeditorAdapter";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { ProveedorService } from 'src/app/core/service/proveedor.service';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.scss']
})
export class CrearProductosComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  isLoading = false;
  @Input() productoId: string;
  @Input() titulo: string;
  @Input() estado: boolean;
  url: any;
  imagen: any;
  categorias:any[];
  marcas:any[];
  series:any[];
  codigo:any;
  ckconfig;
  proveedores:any
  public editor: ClassicEditor;
  unidades: any;
  extension:boolean;


  constructor(
    private basicService: ProductoService,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    public route: ActivatedRoute,
    private router: Router,
    private proveedorService: ProveedorService,
  ) {
    this.editor = DecoupledEditor;
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((paramMap: any) => {
        this.productoId = paramMap.get('id');
      }
    );
    this.createForm();
    this.listaProveedores();
    this.listaCategorias();
    this.ckconfig = {
      // include any other configuration you want
      toolbar: {
        items: [
            'heading', '|',
            'fontfamily', 'fontsize', '|',
            'alignment', '|',
            'fontColor', 'fontBackgroundColor', '|',
            'bold', 'italic', 'strikethrough', 'underline', '|',
            'link', '|',
            'outdent', 'indent', '|',
            'bulletedList', 'numberedList',  '|',
              '|',
            'insertTable', '|',
            'uploadImage', 'blockQuote', '|',
            'undo', 'redo'
        ],
        image: {
          styles: ['full', 'side', 'alignLeft', 'alignRight'],
          toolbar: [ 'imageStyle:full', 'imageStyle:side', 'imageStyle:alignRight', 'imageStyle:alignLeft', '|', 'imageTextAlternative' ]
        },
        shouldNotGroupWhenFull: true
    }
    };

    if (this.productoId) {
      this.basicService.getById(this.productoId).subscribe(data => {
        this.onProveedor(data);
        this.form.patchValue({
          categoria_id: data.categoria_id,
          nombre: data.nombre,
          p_menor: data.p_menor,
          proveedor_id: data.proveedor_id,
          marca_id: data.marca_id,
          stock_minimo: data.stock_minimo,
          codigo_nro: data.codigo_nro,
          descripcion: data.descripcion,
          concentracion: data.concentracion
        });
      });

    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      p_menor:['', Validators.required],
      img_url: [''],
      categoria_id:['',[Validators.required]],
      marca_id:['',Validators.required],
      stock_minimo:['',[Validators.required]],
      proveedor_id:['',[Validators.required]],
      codigo_nro:[''],
      descripcion:['',[Validators.required]],
      concentracion:['',[Validators.required]],
    });
  }

  registerProducto(form: any) {
    this.isLoading = true;
    const formData = new FormData();
    formData.append("nombre",this.form.value.nombre);
    formData.append("p_menor",this.form.value.p_menor);
    formData.append("file",this.imagen);
    formData.append('categoria_id', form.categoria_id);
    formData.append('marca_id', form.marca_id);
    formData.append('stock_minimo', form.stock_minimo);
    formData.append('proveedor_id', form.proveedor_id);
    formData.append('codigo_nro', form.codigo_nro);
    formData.append('descripcion', form.descripcion);
    formData.append('concentracion', form.concentracion);
    if (this.productoId) {

      formData.append("_method", "PUT");
      this.basicService
      .createWithFile(this.productoId, formData)
        .pipe(
          finalize(() => {
            this.form.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          data3 => {
            this.toastr.success(data3.succes, 'Éxito');
            this.router.navigate(['/dashboard/productos/lista-productos']);
          },
          (error: any) => {
            this.toastr.error(error.error, 'Error');
          }
        );
    } else {
      this.basicService
        .create(formData)
        .pipe(
          finalize(() => {
            this.form.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          data => {
            this.toastr.success(data.succes, 'Éxito');
            this.router.navigate(['/dashboard/productos/lista-productos']);
          },
          (error: any) => {
            this.toastr.error(error.error, 'Error');
            console.log(error);
          }
        );
    }

  }
  listaCategorias(){
    this.categoriaService.getEnabledList().subscribe(
      data =>{
        this.categorias = data;
      },
      error => {
        console.log('Error' + error.error);
      }
    )
  }

  listaProveedores(){
    this.proveedorService.getEnabledList().subscribe(
      data=>{
        this.proveedores=data;
      }
    )
  }

  getCodigoProducto(){
    this.basicService.getProductosCodigo().subscribe(
      data =>{
        this.codigo = data;
        this.form.patchValue({
          codigo_texto: this.codigo.codigo_texto,
          // detalle: data.detalle,
        });
      },
      error => {
        console.log('Error' + error.error);
      }
    )
  }

  onProveedor(item){
      this.marcaService.getMarcaPorProveedor(item.proveedor_id).subscribe(
        data=>{
          this.marcas = data;
          console.log('marcas',this.marcas);
          console.log('proveedor',item);

        }
      )
  }

  onSelectFile(event) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      this.imagen = event.target.files[0]
      reader.onload = (event) => {
        this.url = event.target.result;
      }
    }
  }

  public onReady(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }


}
