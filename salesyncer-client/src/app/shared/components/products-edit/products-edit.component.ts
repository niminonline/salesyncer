import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedApiService } from '../../services/shared-api.service';
@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss'],
})
export class ProductsEditComponent implements OnInit {
  submitted: boolean = false;
  inputGroup!: FormGroup;
  showSpinner: boolean = false;
  productCategoryData: any;
  productData!: any;
  _id!: string | null;
  name!:string|null;
  productCategory!:string|null;
  status!:string|null;
  mrp!:number|null;
  lsp!:number|null;


  constructor(
    private sharedAPI: SharedApiService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this._id = this.activatedRouter.snapshot.queryParamMap.get('_id');
    // console.log('ID=', this._id);

    this.inputGroup = this.fb.group({
      name: ['', [Validators.required]],
      productCategory: ['', [Validators.required]],
      status: ['', [Validators.required]],
      mrp: ['', [Validators.pattern(/^\d+(\.\d+)?$/)]],
      lsp: ['', [Validators.pattern(/^\d+(\.\d+)?$/)]],
    });
  }

  ngOnInit() {
    this.getProductCategory();
    this.getProductData();
  }

  getProductCategory() {
    try {
      this.sharedAPI.getProductCategory().subscribe((response: any) => {
        if (response.status == 'OK') {
          this.productCategoryData = response.productCategoryData;
        } else {
          console.log(response.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  getProductData() {
    this.sharedAPI.getProduct(this._id).subscribe((response)=>{
      this.productData=response.productData;
      this.name=this.productData.name;
       this.productCategory=this.productData.category;
       this.status=this.productData.status;
       this.mrp=this.productData.mrp;
       this.lsp=this.productData.lsp;

       this.initFormgroup()
    })

  }
  initFormgroup() {
    this.inputGroup = this.fb.group({
      name: [this.name, [Validators.required]],
      productCategory: [this.productCategory, [Validators.required]],
      status: [this.status, [Validators.required]],
      mrp: [this.mrp, [Validators.pattern(/^\d+(\.\d+)?$/)]],
      lsp: [this.lsp, [Validators.pattern(/^\d+(\.\d+)?$/)]],
    });
  }

  submitForm(data: any): void {
    this.submitted = true;
    // console.log(data.value);
    if (!data.invalid) {


      if( parseFloat(data.value.mrp)<= parseFloat(data.value.lsp)){
        Swal.fire('Error', "LSP must be less than or equal to MRP", 'error');
        return;
      }
      
      this.showSpinner = true;

      const { name, productCategory, status, mrp, lsp } = data.value;

      const body = {
        _id:this._id,
        name,
        category: productCategory,
        status,
        mrp,
        lsp,
      };
      // console.log('Data', body);

      this.sharedAPI.editProduct(body).subscribe((response) => {
        // console.log(response);

        if (response && response.status !== 'OK') {
          this.showSpinner = false;
          Swal.fire('Error', response.message, 'error');
        } else {
          this.showSpinner = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Product updated successfully',
            showConfirmButton: false,
            timer: 1500,
          });

          const currentroute = this.router.url;
          if (currentroute.toString().includes('admin')) {
            this.router.navigate(['admin/products']);
          } else {
            this.router.navigate(['products']);
          }
        }
      });
    } else {
      Swal.fire('Error', 'Please fill the fields without errors', 'error');
    }
  }

  navProducts(event: Event) {
    event.preventDefault();

    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/products']);
    } else {
      this.router.navigate(['products']);
    }
  }
}
{
}
