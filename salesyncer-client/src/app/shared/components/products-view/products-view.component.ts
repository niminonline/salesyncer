import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { SharedApiService } from '../../services/shared-api.service';
import { Product } from '../../interfaces/interfaces';
@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {


  constructor(private router:Router,private activatedRouter:ActivatedRoute,private sharedApi:SharedApiService) {}
  productData!:Product;
  _id!:string|null;

  ngOnInit(): void {

    this._id= this.activatedRouter.snapshot.queryParamMap.get('_id');
    this.getProductsData();
   

  }

  getProductsData() {
   this.sharedApi.getProduct(this._id).subscribe((response) => {
      if (response) {
        this.productData = response.productData;
      } else {
        console.error('Products fetching failed');
      }
    });
  }


    navEditProduct(){

      const currentroute= this.router.url;
      if(currentroute.toString().includes('admin'))
      {
        this.router.navigate(['admin/products-edit'],{ queryParams: {_id:this._id} });
      }
      else{
        this.router.navigate(['products-edit'],{ queryParams: {_id:this._id} });   
         }
    }


   


  navProducts(){
    const currentroute= this.router.url;
    if(currentroute.toString().includes('admin'))
    {
     this.router.navigate(['admin/products']);
    }
    else{
      this.router.navigate(['products']);
    }
  }

  
}



