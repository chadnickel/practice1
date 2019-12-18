import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlexModalService } from '../shared-components/flex-modal/flex-modal.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  orders: Array<any> = [];
  name = '';
  errorMessage = '';
  confirmMessage = '';

  constructor(
    private router: Router,
    private flexModal: FlexModalService,
    private http: Http
  ) {

  }

  async ngOnInit() {
    this.loadDefaultOrders();
  }

  calculateOrders() {
    const total = this.orders.reduce((inc, item, i, arr) => {
      inc += item.price * item.quantity;
      return inc;

    }, 0);

    const taxAmount = total * .1;
    const subTotal = total - taxAmount;
    console.log('from calc total:', total, subTotal, taxAmount)
    return {
      total: total,
      taxAmount: taxAmount,
      subTotal: subTotal
    }
  }

  loadDefaultOrders() {

    this.orders = [{
      "pid": "1",
      "image": "assets/sm_hotdog.jpeg",
      "description": "Hot Dog",
      "price": 5.00,
      "quantity": 2
    }, {
      "pid": "2",
      "image": "assets/sm_hamberger.jpeg",
      "description": "Hamberger",
      "price": 6.00,
      "quantity": 1
    }, {
      "pid": "3",
      "image": "assets/sm_pizza.jpeg",
      "description": "Large Pizza",
      "price": 12.00,
      "quantity": 2
    }]
  }

  delete(index: number) {
    this.orders.splice(index, 1)
  }


  addItem(item: string) {

    if (item === 'hot dog') {
      this.orders.unshift({
        "pid": "1",
        "image": "assets/sm_hotdog.jpeg",
        "description": "Hot Dog",
        "price": 5.00,
        "quantity": 0
      });

    } else if (item === 'hamberger') {
      this.orders.unshift({
        "pid": "2",
        "image": "assets/sm_hamberger.jpeg",
        "description": "Hamberger",
        "price": 6.00,
        "quantity": 0
      });

    } else if (item === 'pizza') {
      this.orders.unshift({
        "pid": "3",
        "image": "assets/sm_pizza.jpeg",
        "description": "Large Pizza",
        "price": 12.00,
        "quantity": 0
      });
    }
  }

  submit() {

    const commaIndex = this.name.indexOf(', ');

    let error = false;



    if (this.name === '') {
      console.log('Name must not be empty!!');
      this.errorMessage = 'Name must not be empty!!';
      error = true;
    } else if (commaIndex === -1) {
      console.log('Name must have a comma');
      this.errorMessage = 'Name must have a comma';
      error = true;
    }

    if (!error) {
      const firstName = this.name.slice(commaIndex + 1, this.name.length);
      const lastName = this.name.slice(0, commaIndex)
      const fullName = firstName + ' ' + lastName
      console.log(fullName);
      const calculation = this.calculateOrders();
      this.confirmMessage = `Thank you for your order ${fullName}. Your sub total is: ${calculation.subTotal}. Your tax amount is: ${calculation.taxAmount}. Your total order price is: ${calculation.total}`;
      this.flexModal.openDialog('confirm-modal');
    }
    else {
      this.flexModal.openDialog('error-modal');

    }
  }

  // addItem(item:string){
  //   switch(item){
  //     case 'hot dog':
  //       this.orders.unshift ({
  //         "pid": "1",
  //         "image":"assets/sm_hotdog.jpeg",
  //         "description": "Hot Dog",
  //         "price": 5.00,
  //         "quantity": 0
  //       });
  //       break;

  //       case 'hamberger':
  //       this.orders.unshift ({
  //         "pid": "2",
  //      "image":"assets/sm_hamberger.jpeg",
  //      "description": "Hamberger",
  //      "price": 6.00,
  //        "quantity": 0
  //       });
  //       break;

  //       case 'pizza':
  //         this.orders.unshift({
  //           "pid": "3",
  //           "image":"assets/sm_pizza.jpeg",
  //           "description": "Large Pizza",
  //           "price": 12.00,
  //           "quantity": 0
  //         });
  //       break;


  //   }
  // }



  // prepare result, splice last name, first name

  // Calculate total and perform input validation

  // display the order form with orders from orders.json

  // Clear the orders form

  // Add items 'Hot Dog', 'Hamberger' and 'Pizza' to list when corresponding button is clicked

  // delete line item (order) when delete button is click

  // read in the orders.json file and populate the list table with the initial orders (3)

}
