import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ApiService} from "../../services/api.service";
import {CoinDetailsPage} from "../coin-details/coin-details";

@IonicPage()
@Component({
  selector: 'page-coin-list',
  templateUrl: 'coin-list.html',
})
export class CoinListPage {
  search: boolean = false;
  coins: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public apiService: ApiService) {
    this.apiService.coinList.subscribe(coinList => this.coins = coinList);
  }

  ionViewDidLoad() {
    this.apiService.getCoinList();
  }

  get coinListLength(): string {
    return this.coins ? this.coins.length.toString() : '0';
  }

  get isLoading(): boolean {
    return this.apiService.isLoading;
  }

  selectedCoin(coin): void {
    this.navCtrl.push(CoinDetailsPage, coin);
  }

  trackByCoin(index, item): number {
    return index; // or item.id
  }

  detectChange(priceChange): boolean {
    return priceChange < 0;
  }

  doRefresh(refresher) {
    this.apiService.refreshCoinList(refresher);
  }
}
