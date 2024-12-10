import {
  Component,
  OnInit
} from '@angular/core';

import {
  ProductlistService
} from 'src/app/services/productlist.service';

import {
  CARTAPI
} from '../../constant';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ShowPriceService } from 'src/app/services/show-price.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-compareproduct',
  templateUrl: './compareproduct.component.html',
  styleUrls: ['./compareproduct.component.css']
})
export class CompareproductComponent implements OnInit {

  productData = [];
  categoryData = [];
  compareProductList = [];
  isNotAllowedCompare = false;
  perPageItemCount = 20;
  currentIndex = 1;
  nextPageUrl = '';
  brandId = 0;
  cssclass = '';
  isPriceVisible = true;
  selectedImageSrc: string|null = null;
  uniqueCriteria: string[] = [];
  uniqueCriteriaNotes:string[]=[];

  private cartAPI = CARTAPI;
  isLow: boolean;
  constructor(
    private Productlist: ProductlistService,
    private $apiSer: ApiService,
    private location: Location,
    private toastr: ToastrService,
    private showPrice: ShowPriceService,
    private modal: NgbModal
  ) {
    this.isLow = true;
  }

  ngOnInit() {
    this.getAllProduct();
    this.showPrice.setPriceChangeDisabled(false);
    this.uniqueCriteria = this.getUniqueValues('criteria');
    this.uniqueCriteriaNotes = this.getUniqueValues('criteria_name');

    this.showPrice.isPriceVisible.subscribe(res => {
      this.isPriceVisible = res;
    });
  }

  getUniqueValues(type: 'criteria' | 'criteria_name') {
    const criteriaSet = new Set<string>();

    this.compareProductList.forEach(product => {
      if (type === 'criteria') {
        product.attributes.forEach(attr => {
          criteriaSet.add(attr.criteria);
        });
      } else if (type === 'criteria_name') {
        product.criteria.forEach(name => {
          criteriaSet.add(name.criteria_name);
        });
      }
    });

    return Array.from(criteriaSet);
  }

  getAllProduct() {
    this.productData = this.Productlist.getCart();
    
    this.compareProductList = JSON.parse(this.Productlist.getCompareList());
    console.log(this.compareProductList)
  }

  addToCart(objProduct) {
    const { id: product_id, quantity: qty, addToCart: isInTheCart } = objProduct;

    if (!isInTheCart) {
      this.$apiSer.post(`${this.cartAPI}/add/product`, {
        product_id,
        qty
      }).subscribe(res => {
        if (res.success) {
          this.Productlist.getCartItems();
          objProduct.addToCart = 1;
          this.Productlist.updateProductList(this.productData);
          this.toastr.success(`you have added ${objProduct.product_nr}`);
        } else {

        }
      }, error => console.log(error), () => {});
    }
  }

  onQuantityChange(objProduct) {
    if (objProduct.quantity > 100) {
      objProduct.quantity = 100;
    } else if (objProduct.quantity < 1) {
      objProduct.quantity = 1;
      objProduct.addToCart = 0;
    }
    var indexProduct = this.productData.findIndex((r: { id: string; }) => parseInt(r.id) === objProduct.id);
    this.productData[indexProduct].quantity = objProduct.quantity;
    this.productData[indexProduct].addToCart = objProduct.addToCart;
    this.Productlist.updateProductList(this.productData);
  }

  quantityIncrement(objProduct) {
    const { id: product_id, quantity: qty, addToCart: isInTheCart } = objProduct;

    if (isInTheCart) {

      this.$apiSer.post(`${this.cartAPI}/add/product`, {
        product_id,
        qty: qty + 1
      }).subscribe(res => {
        if (res.success) {
          objProduct.quantity += 1;
          this.Productlist.updateProductList(this.productData);
          this.toastr.success(`you have increased quantity, which is ${qty + 1} for ${objProduct.product_nr}`);
        } else {
          this.toastr.warning(res.message);
        }
      }, error => console.log(error), () => {
        this.Productlist.getCartItems();
      });

    } else {
      objProduct.quantity += 1;
    }
  }

  quantityDecrement(objProduct) {
    const { id: product_id, quantity: qty, addToCart: isInTheCart } = objProduct;

    if (isInTheCart && qty > 1) {

      this.$apiSer.post(`${this.cartAPI}/add/product`, {
        product_id,
        qty: qty - 1
      }).subscribe(res => {
        if (res.success) {
          objProduct.quantity = qty - 1;
          this.Productlist.updateProductList(this.productData);
          this.toastr.success(`you have decreased quantity, which is ${qty - 1} for ${objProduct.product_nr}`);
        }
      }, error => console.log(error), () => {
        this.Productlist.getCartItems();
      });

    } else {
      objProduct.quantity !== 1 ? objProduct.quantity = objProduct.quantity - 1 : objProduct.quantity = 1;
    }
  }

  back() {
    this.location.back();
  }

  showPreview() {
    this.isLow = false;
  }

  hidePreview() {
    this.isLow = true;
  }

  open(ImageSrc,content,size) { 
    this.selectedImageSrc = ImageSrc; 
    setTimeout(() => {
      const modalWindow: HTMLElement | null = document.querySelector('ngb-modal-window');
      if (modalWindow) {
        modalWindow.style.marginTop = '100px';
      }
    }, 0);   
    this.modal.open(content, {ariaLabelledBy: 'modal-basic-title', size:size});  
  }
}
