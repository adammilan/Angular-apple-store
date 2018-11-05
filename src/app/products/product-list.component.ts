import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage:boolean = false;
    errorMessage:string;
    //listFilter:string = 'cart';
    filteredProducts: IProduct[];
    _listFilter:string;
    get listFilter():string{
        return this._listFilter;
    }
    set listFilter(value:string){
         this._listFilter = value;
         this.filteredProducts = this.listFilter? this.performFilter(this.listFilter):this.products;
    }

    products: IProduct[] = [];

    constructor(private productService:ProductService){
        //this.listFilter = '';
    }
    toggleImage():void{
        this.showImage = !this.showImage;
    }

    ngOnInit():void{
        this.productService.getProducts().subscribe(
        products =>{
            this.products = products;
            this.filteredProducts = this.products;
        },
        error=>this.errorMessage= <any>error
        )
    }
    onRatingClicked(message:string):void{
        this.pageTitle =  message;
    }
    performFilter(filterBy:string):IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product:IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy)!==-1);
    }
    
}