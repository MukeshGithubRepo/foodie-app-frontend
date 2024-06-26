import { Component, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { Restaurant } from '../../Shared/models/Restaurant';
import { RestaurantService } from '../service/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-listing',
  templateUrl: './restaurant-listing.component.html',
  styleUrls: ['./restaurant-listing.component.css']
})
export class RestaurantListingComponent implements OnInit, AfterViewInit {

  public restaurantList: Restaurant[]=[];
  public images: string[] = [];

  constructor(private router: Router, private restaurantService: RestaurantService, private cdref: ChangeDetectorRef) { }

  ngOnInit() {
    this.getAllRestaurants();
  }

  ngAfterViewInit() {
    this.restaurantList.forEach(() => {
      this.images.push(this.getRandomImage());
    });
    this.cdref.detectChanges();
  }

  getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(
      data => {
        this.restaurantList = data;
        // Initialize images array after getting restaurants
        this.images = this.restaurantList.map(() => this.getRandomImage());
        this.cdref.detectChanges();
      }
    )
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomImage(): string {
    const imageCount = 8; // Adjust this number based on the number of images in your asset folder
    const randomIndex = this.getRandomNumber(1, imageCount);
    return `src/assets/restaurant-pics/${randomIndex}.jpg`; // Replace with your image filename pattern
  }

  onButtonClick(id: number) {
    this.router.navigate(['/food-catalogue', id]);
  }
}
