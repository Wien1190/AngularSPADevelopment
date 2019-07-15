import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "../firebase.service";

@Component({
  selector: "app-interceptor",
  templateUrl: "./interceptor.component.html",
  styleUrls: ["./interceptor.component.scss"]
})
export class InterceptorComponent implements OnInit {
  constructor(private fbs: FirebaseService) {}

  result: any;

  ngOnInit() {}

  insertVoucher() {
    var voucher = {
      ID: 1,
      Text: "Inserted by Angular",
      Date: new Date(),
      Amount: 99,
      Paid: true,
      Expense: false,
      VATRate: 20
    };
    this.fbs.insertVoucher(voucher).subscribe(
      response => {
        this.result = response;
      },
      err => console.log(err)
    );
  }

  getVouchers() {
    this.fbs.getVouchers().subscribe(data => {
      this.result = data;
    });
  }

  deleteVouchers() {
    this.fbs.deleteVouchers().subscribe(data => {
      this.result = data;
    });
  }
}
